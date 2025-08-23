
'use client';

import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Calendar, CheckCircle, Clock, Video, XCircle } from "lucide-react";

const upcomingAppointments = [
  { id: "apt_1", doctor: "Dr. Emily Carter", specialty: "Cardiology", date: "2024-08-15", time: "10:00 AM", type: "Video", status: "Confirmed" },
  { id: "apt_2", doctor: "Dr. Ben Hanson", specialty: "Dermatology", date: "2024-08-22", time: "02:30 PM", type: "In-Person", status: "Confirmed" },
];

const pastAppointments = [
  { id: "apt_3", doctor: "Dr. Sarah Lee", specialty: "Pediatrics", date: "2024-07-10", time: "11:00 AM", type: "Video", status: "Completed" },
  { id: "apt_4", doctor: "Dr. Michael Chen", specialty: "Neurology", date: "2024-06-05", time: "09:00 AM", type: "In-Person", status: "Cancelled" },
];


export default function AppointmentsPage() {
  const { toast } = useToast();

  const handleAction = (message: string) => {
    toast({
      description: message,
    });
  };

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
                        <Card key={apt.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-lg">{apt.doctor}</p>
                                        <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                                    </div>
                                     <Badge variant="default">{apt.status}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between text-sm border-t pt-4">
                                   <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4"/> {new Date(apt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                   </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4"/> {apt.time}
                                   </div>
                                    <div className="flex items-center gap-2">
                                        <Video className="w-4 h-4"/> {apt.type}
                                   </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={() => handleAction('Joining video call...')}>Join Video Call</Button>
                                    <Button variant="outline" onClick={() => handleAction('Reschedule request sent.')}>Reschedule</Button>
                                     <Button variant="destructive" onClick={() => handleAction('Appointment cancelled.')}>Cancel</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="past">
                 <div className="space-y-4 pt-4">
                    {pastAppointments.map(apt => (
                        <Card key={apt.id} className="opacity-70">
                             <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-lg">{apt.doctor}</p>
                                        <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                                    </div>
                                     <Badge variant={apt.status === "Completed" ? "outline" : "secondary"} className="flex items-center gap-2">
                                        {apt.status === "Completed" ? <CheckCircle className="w-4 h-4"/> : <XCircle className="w-4 h-4"/>}
                                        {apt.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                           <CardContent className="space-y-4">
                                <div className="flex items-center justify-between text-sm border-t pt-4">
                                   <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4"/> {new Date(apt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                   </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4"/> {apt.time}
                                   </div>
                                    <div className="flex items-center gap-2">
                                        <Video className="w-4 h-4"/> {apt.type}
                                   </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="secondary" onClick={() => handleAction('Opening consultation notes...')}>View Consultation Notes</Button>
                                    <Button variant="outline" onClick={() => handleAction(`Redirecting to book with ${apt.doctor}...`)}>Book Again</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
