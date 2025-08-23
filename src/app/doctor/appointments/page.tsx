
import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

const appointments = [
  { id: "apt_1", patient: "Liam Johnson", time: "9:00 AM", date: "2024-07-29", status: "Confirmed", type: "Video" },
  { id: "apt_2", patient: "Olivia Smith", time: "10:00 AM", date: "2024-07-29", status: "Confirmed", type: "In-Person" },
  { id: "apt_3", patient: "Noah Williams", time: "11:00 AM", date: "2024-07-29", status: "Pending", type: "Video" },
  { id: "apt_4", patient: "Emma Brown", time: "1:00 PM", date: "2024-07-29", status: "Confirmed", type: "Video" },
  { id: "apt_5", patient: "James Wilson", time: "2:00 PM", date: "2024-07-30", status: "Confirmed", type: "Video" },
  { id: "apt_6", patient: "Ava Taylor", time: "3:00 PM", date: "2024-07-30", status: "Cancelled", type: "In-Person" },
];


export default function AppointmentsPage() {
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
                    {appointments.map(apt => (
                        <TableRow key={apt.id}>
                            <TableCell className="font-medium">{apt.patient}</TableCell>
                            <TableCell>{apt.date}</TableCell>
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
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
