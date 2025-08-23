
import { AppLayout } from "@/components/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserPlus } from "lucide-react";
import Link from "next/link";

const patients = [
  { id: "pat_1", name: "Liam Johnson", age: 34, lastVisit: "2024-07-29", status: "Active", profileId: "liam-johnson-1" },
  { id: "pat_2", name: "Olivia Smith", age: 28, lastVisit: "2024-07-29", status: "Active", profileId: "olivia-smith-2" },
  { id: "pat_3", name: "Noah Williams", age: 45, lastVisit: "2024-07-20", status: "Active", profileId: "noah-williams-3" },
  { id: "pat_4", name: "Emma Brown", age: 31, lastVisit: "2024-06-15", status: "Follow-up", profileId: "emma-brown-4" },
  { id: "pat_5", name: "James Wilson", age: 52, lastVisit: "2024-05-01", status: "Stable", profileId: "james-wilson-5" },
  { id: "pat_6", name: "Ava Taylor", age: 22, lastVisit: "2023-12-10", status: "Inactive", profileId: "ava-taylor-6" },
];

export default function PatientsPage() {
  return (
    <AppLayout userType="doctor">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
                <CardTitle>My Patients</CardTitle>
                <CardDescription>View and manage your patient records here.</CardDescription>
            </div>
            <Button>
                <UserPlus className="mr-2"/> Add New Patient
            </Button>
          </div>
           <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search patients by name..." className="pl-10" />
            </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Last Visit</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                 <TableBody>
                    {patients.map(patient => (
                        <TableRow key={patient.id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-9 h-9">
                                        <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint="patient portrait"/>
                                        <AvatarFallback>{patient.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                    </Avatar>
                                    <span>{patient.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>{patient.age}</TableCell>
                            <TableCell>{patient.lastVisit}</TableCell>
                            <TableCell>
                                <Badge variant={patient.status === 'Active' ? 'default' : patient.status === 'Follow-up' ? 'secondary' : 'outline'}>
                                    {patient.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/patient/profile/${patient.profileId}`}>View Profile</Link>
                                </Button>
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
