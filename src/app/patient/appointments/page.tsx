
'use client';

import { AppLayout } from "@/components/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Calendar, CheckCircle, Clock, Video, XCircle, Bell, Star, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatarHint: string;
  doctorRating: number;
  date: string;
  time: string;
  type: string;
  status: "Confirmed" | "Completed" | "Cancelled";
}

const sampleAppointments: Appointment[] = [
    { id: '1', doctorId: '1', doctorName: 'Dr. Emily Carter', doctorSpecialty: 'Cardiologist', doctorAvatarHint: 'doctor professional woman', doctorRating: 4.9, date: '2024-08-05', time: '10:00 AM', type: 'Video', status: 'Confirmed' },
    { id: '2', doctorId: '2', doctorName: 'Dr. Ben Hanson', doctorSpecialty: 'Dermatologist', doctorAvatarHint: 'doctor professional man', doctorRating: 4.8, date: '2024-08-10', time: '02:30 PM', type: 'In-Person', status: 'Confirmed' },
    { id: '3', doctorId: '3', doctorName: 'Dr. Sarah Lee', doctorSpecialty: 'Pediatrician', doctorAvatarHint: 'doctor friendly woman', doctorRating: 4.9, date: '2024-07-20', time: '11:00 AM', type: 'Video', status: 'Completed' },
    { id: '4', doctorId: '1', doctorName: 'Dr. Emily Carter', doctorSpecialty: 'Cardiologist', doctorAvatarHint: 'doctor professional woman', doctorRating: 4.9, date: '2024-07-15', time: '09:00 AM', type: 'Video', status: 'Cancelled' },
];

export default function AppointmentsPage() {
  const { toast } = useToast();
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate fetching and sorting data
    setTimeout(() => {
        const now = new Date();
        const upcoming = sampleAppointments.filter(apt => new Date(apt.date) > now).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const past = sampleAppointments.filter(apt => new Date(apt.date) <= now).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setUpcomingAppointments(upcoming);
        setPastAppointments(past);
        setLoading(false);
    }, 500);
  }, []);

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

  const AppointmentCard = ({ appointment, isUpcoming }: { appointment: Appointment, isUpcoming: boolean }) => (
    <Card className={!isUpcoming ? "opacity-70" : ""}>
        <CardHeader>
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border">
                        <AvatarImage src={`https://placehold.co/64x64.png`} data-ai-hint={appointment.doctorAvatarHint} />
                        <AvatarFallback>{appointment.doctorName.split(" ").map((n:string)=>n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold text-lg">{appointment.doctorName}</p>
                        <p className="text-sm text-muted-foreground">{appointment.doctorSpecialty}</p>
                         <div className="flex items-center gap-1 text-sm mt-1">
                            <Star className="w-4 h-4 fill-primary text-primary" /> {appointment.doctorRating}
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
                        <Button variant="outline" onClick={() => handleSetReminder(appointment.doctorName, `${appointment.date} at ${appointment.time}`)}>
                            <Bell className="mr-2"/> Set Reminder
                        </Button>
                        <Button variant="outline" onClick={() => handleAction('Reschedule request sent.')}>Reschedule</Button>
                         <Button variant="destructive" onClick={() => handleAction('Appointment cancelled.')}>Cancel</Button>
                    </>
                ) : (
                    <>
                        <Button variant="secondary" onClick={() => handleAction('Opening consultation notes...')}>View Consultation Notes</Button>
                        <Button variant="outline" onClick={() => handleAction(`Redirecting to book with ${appointment.doctorName}...`)}>Book Again</Button>
                    </>
                )}
            </div>
        </CardContent>
    </Card>
  );

  const renderContent = (appointments: Appointment[], isUpcoming: boolean) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }
    if (appointments.length === 0) {
        return <p className="text-center text-muted-foreground pt-8">No {isUpcoming ? 'upcoming' : 'past'} appointments found.</p>
    }
    return (
        <div className="space-y-4 pt-4">
            {appointments.map(apt => (
                <AppointmentCard key={apt.id} appointment={apt} isUpcoming={isUpcoming} />
            ))}
        </div>
    );
  }

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
                {renderContent(upcomingAppointments, true)}
            </TabsContent>
            <TabsContent value="past">
                {renderContent(pastAppointments, false)}
            </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
