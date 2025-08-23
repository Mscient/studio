
'use client';

import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Appointment {
    id: string;
    patientName: string;
    time: string;
    date: string;
    status: string;
    type: string;
    patientId: string;
}

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            const appointmentsCollection = collection(db, 'appointments');
            const appointmentSnapshot = await getDocs(appointmentsCollection);
            
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
                    date: appointmentData.date,
                    status: appointmentData.status,
                    type: appointmentData.type,
                    patientId: appointmentData.patientId,
                };
            }));

            setAppointments(appointmentsList);
            setLoading(false);
        };

        fetchAppointments();
    }, []);

    return (
        <AppLayout userType="doctor">
        <Card>
            <CardHeader>
            <CardTitle>My Appointments</CardTitle>
            <CardDescription>Manage all your patient appointments here.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                     <div className="flex justify-center items-center p-4">
                                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                        <span className="ml-2">Loading appointments...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            appointments.map(apt => (
                            <TableRow key={apt.id}>
                                <TableCell className="font-medium">{apt.patientName}</TableCell>
                                <TableCell>{new Date(apt.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                                <TableCell>{apt.time}</TableCell>
                                <TableCell><Badge variant={apt.type === "Video" ? "default" : "secondary"}>{apt.type}</Badge></TableCell>
                                <TableCell>
                                    <Badge variant={apt.status === "Confirmed" ? "outline" : apt.status === "Pending" ? "destructive" : "secondary"}>
                                        {apt.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem asChild>
                                                <Link href={`/doctor/appointments/${apt.id}`}>View Details</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        </AppLayout>
    );
}
