
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

interface Appointment {
    id: string;
    patientName: string;
    time: string;
    date: string;
    status: string;
    type: string;
    patientId: string;
}

const sampleAppointments: Appointment[] = [
    { id: '1', patientName: 'John Doe', time: '10:00 AM', date: '2024-07-29', status: 'Confirmed', type: 'Video', patientId: '1' },
    { id: '2', patientName: 'Jane Smith', time: '11:30 AM', date: '2024-07-29', status: 'Confirmed', type: 'In-Person', patientId: '2' },
    { id: '3', patientName: 'Peter Jones', time: '01:00 PM', date: '2024-07-29', status: 'Confirmed', type: 'Video', patientId: '3' },
    { id: '4', patientName: 'Mary Williams', time: '02:30 PM', date: '2024-07-30', status: 'Pending', type: 'Video', patientId: '4' },
    { id: '5', patientName: 'David Brown', time: '09:00 AM', date: '2024-07-30', status: 'Confirmed', type: 'In-Person', patientId: '5' },
];

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Simulate fetching data
        setTimeout(() => {
            setAppointments(sampleAppointments);
            setLoading(false);
        }, 500);
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
