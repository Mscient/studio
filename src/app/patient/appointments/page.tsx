
'use client';

import { AppLayout } from "@/components/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Calendar, CheckCircle, Clock, Video, XCircle, Bell, Star } from "lucide-react";

const upcomingAppointments = [
  { id: "apt_1", doctor: "Dr. Emily Carter", specialty: "Cardiology", date: "2024-08-15", time: "10:00 AM", type: "Video", status: "Confirmed", avatarHint: "caucasian female doctor", rating: 4.9 },
  { id: "apt_2", doctor: "Dr. Ben Hanson", specialty: "Dermatology", date: "2024-08-22", time: "02:30 PM", type: "In-Person", status: "Confirmed", avatarHint: "black male doctor", rating: 4.8 },
];

const pastAppointments = [
  { id: "apt_3", doctor: "Dr. Sarah Lee", specialty: "Pediatrics", date: "2024-07-10", time: "11:00 AM", type: "Video", status: "Completed", avatarHint: "east asian female doctor", rating: 5.0 },
  { id: "apt_4", doctor: "Dr. Michael Chen", specialty: "Neurology", date: "2024-06-05", time: "09:00 AM", type: "In-Person", status: "Cancelled", avatarHint: "white male doctor", rating: 4.7 },
];


export default function AppointmentsPage() {
  const { toast } = useToast();

  const handleAction = (message: string) => {
    toast({
      description: message,
    });
  };

  const handleSetReminder = (doctorName: string, dateTime: string) => {
    if (!("Notification" in window)) {
      toast({
        variant: "destructive",
        title: "Notifications not supported",
        description: "This browser does not support desktop notification.",
      });
      return;
    }

    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        toast({
          title: "Reminder Set!",
          description: `You'll be reminded for your appointment with ${doctorName} on ${dateTime}.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Notifications Blocked",
          description: "Please enable notifications in your browser settings to set reminders.",
        });
      }
    });
  }

  const AppointmentCard = ({ appointment, isUpcoming }: { appointment: any, isUpcoming: boolean }) => (
    <Card className={!isUpcoming ? "opacity-70" : ""}>
        <CardHeader>
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border">
                        <AvatarImage src={`https://placehold.co/64x64.png`} data-ai-hint={appointment.avatarHint} />
                        <AvatarFallback>{appointment.doctor.split(" ").map((n:string)=>n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold text-lg">{appointment.doctor}</p>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                         <div className="flex items-center gap-1 text-sm mt-1">
                            <Star className="w-4 h-4 fill-primary text-primary" /> {appointment.rating}
                        </div>
                    </div>
                </div>
                 <Badge variant={isUpcoming ? "default" : (appointment.status === "Completed" ? "outline" : "secondary")} className="flex items-center gap-2">
                    {appointment.status === "Completed" ? <CheckCircle className="w-4 h-4"/> : (appointment.status === "Cancelled" ? <XCircle className="w-4 h-4"/> : null)}
                    {appointment.status}
                </Badge>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm border-t pt-4">
               <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4"/> {new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
               </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4"/> {appointment.time}
               </div>
                <div className="flex items-center gap-2">
                    <Video className="w-4 h-4"/> {appointment.type}
               </div>
            </div>
            <div className="flex gap-2">
                {isUpcoming ? (
                    <>
                        <Button onClick={() => handleAction('Joining video call...')}>Join Video Call</Button>
                        <Button variant="outline" onClick={() => handleAction('Viewing profile...')}>View Profile</Button>
                        <Button variant="outline" onClick={() => handleSetReminder(appointment.doctor, `${appointment.date} at ${appointment.time}`)}>
                            <Bell className="mr-2"/> Set Reminder
                        </Button>
                        <Button variant="outline" onClick={() => handleAction('Reschedule request sent.')}>Reschedule</Button>
                         <Button variant="destructive" onClick={() => handleAction('Appointment cancelled.')}>Cancel</Button>
                    </>
                ) : (
                    <>
                        <Button variant="secondary" onClick={() => handleAction('Opening consultation notes...')}>View Consultation Notes</Button>
                        <Button variant="outline" onClick={() => handleAction(`Redirecting to book with ${appointment.doctor}...`)}>Book Again</Button>
                    </>
                )}
            </div>
        </CardContent>
    </Card>
  );

  return (
    <AppLayout userType="patient">
      <div className="flex flex-col gap-4">
        <Card>
            <CardHeader>
                <CardTitle>My Appointments</CardTitle>
                <CardDescription>Here you can see your upcoming and past appointments.</CardDescription>
            </CardHeader>
        </Card>

        <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
                <div className="space-y-4 pt-4">
                    {upcomingAppointments.map(apt => (
                        <AppointmentCard key={apt.id} appointment={apt} isUpcoming={true} />
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="past">
                 <div className="space-y-4 pt-4">
                    {pastAppointments.map(apt => (
                        <AppointmentCard key={apt.id} appointment={apt} isUpcoming={false} />
                    ))}
                </div>
            </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
