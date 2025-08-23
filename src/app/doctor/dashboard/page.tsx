
'use client';

import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FilePlus, MessageSquare, QrCode, Users, Siren, Lightbulb, Sparkles, TriangleAlert, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";


interface Appointment {
  id: string;
  patientName: string;
  time: string;
  status: string;
  type: string;
  urgency: "self_care" | "routine" | "urgent";
}

const UrgencyMap = {
  self_care: {
    label: "Self-Care",
    icon: <Lightbulb className="h-4 w-4 text-green-700" />,
    badgeClass: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100"
  },
  routine: {
    label: "Routine",
    icon: <Sparkles className="h-4 w-4 text-amber-700" />,
    badgeClass: "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100"
  },
  urgent: {
    label: "Urgent",
    icon: <TriangleAlert className="h-4 w-4 text-red-700" />,
    badgeClass: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100"
  },
};

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
        setLoading(true);
        
        const today = new Date().toISOString().split('T')[0];
        const q = query(collection(db, "appointments"), where("date", "==", today));
        
        const appointmentSnapshot = await getDocs(q);
        
        const appointmentsList = await Promise.all(appointmentSnapshot.docs.map(async (appointmentDoc) => {
            const appointmentData = appointmentDoc.data();
            
            let patientName = "Unknown Patient";
            if (appointmentData.patientId) {
                const patientDocRef = doc(db, 'users', appointmentData.patientId);
                const patientDocSnap = await getDoc(patientDocRef);
                if (patientDocSnap.exists()) {
                    patientName = patientDocSnap.data().name;
                }
            }

            return {
                id: appointmentDoc.id,
                patientName: patientName,
                time: appointmentData.time,
                status: appointmentData.status,
                type: appointmentData.type,
                urgency: appointmentData.urgency,
            };
        }));
        
        setAppointments(appointmentsList.slice(0, 4)); // Limiting to 4 for the dashboard view
        setLoading(false);
    };

    fetchAppointments();
  }, []);

  return (
    <AppLayout userType="doctor">
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Upcoming Appointments</CardDescription>
              <CardTitle className="text-4xl">12</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +2 since last week
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="pb-2">
              <CardDescription>Patients this month</CardDescription>
              <CardTitle className="text-4xl">128</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +15 from last month
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="pb-2">
              <CardDescription>Emergency Requests</CardDescription>
              <CardTitle className="text-4xl">5</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <Link href="/doctor/emergency" className="hover:underline">View critical needs</Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>
                Here are the appointments scheduled for today, with AI-assessed urgency levels.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>AI Urgency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            <div className="flex justify-center items-center p-4">
                                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                            </div>
                        </TableCell>
                    </TableRow>
                  ) : (
                    appointments.map(apt => (
                      <TableRow key={apt.id}>
                        <TableCell>
                          <div className="font-medium">{apt.patientName}</div>
                          <div className="text-sm text-muted-foreground">{apt.type}</div>
                        </TableCell>
                        <TableCell>{apt.time}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`flex items-center gap-2 ${UrgencyMap[apt.urgency].badgeClass}`}>
                              {UrgencyMap[apt.urgency].icon}
                              {UrgencyMap[apt.urgency].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                           <Badge variant={apt.status === "Confirmed" ? "outline" : "destructive"}>{apt.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" asChild>
                            <Link href={`/doctor/appointments/${apt.id}`}>View</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <Link href="/doctor/patients" className="flex flex-col items-center justify-center space-y-1 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <Users className="w-7 h-7 text-primary" />
                <span className="text-center text-xs font-medium">My Patients</span>
              </Link>
              <Link href="/doctor/write-prescription" className="flex flex-col items-center justify-center space-y-1 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <FilePlus className="w-7 h-7 text-primary" />
                <span className="text-center text-xs font-medium">Write Prescription</span>
              </Link>
              <Link href="/doctor/scan-qr" className="flex flex-col items-center justify-center space-y-1 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <QrCode className="w-7 h-7 text-primary" />
                <span className="text-center text-xs font-medium">Scan Patient QR</span>
              </Link>
              <Link href="/doctor/community" className="flex flex-col items-center justify-center space-y-1 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <MessageSquare className="w-7 h-7 text-primary" />
                <span className="text-center text-xs font-medium">Community</span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
