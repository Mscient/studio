
'use client';

import { AppLayout } from "@/components/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserPlus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string; // This will remain mock data for now
  status: string; // This will remain mock data for now
  avatarHint: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      const q = query(collection(db, "users"), where("role", "==", "patient"));
      const querySnapshot = await getDocs(q);
      const patientsData: Patient[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name || "N/A",
            age: data.age || 0,
            lastVisit: "2024-07-29", // Mock data
            status: "Active", // Mock data
            avatarHint: data.avatarHint || 'person'
        }
      });
      setPatients(patientsData);
      setLoading(false);
    };

    fetchPatients();
  }, []);

  return (
    <AppLayout userType="doctor">
      <Card>
        <CardHeader className="border-b">
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
        <CardContent className="p-0">
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
                    {loading ? (
                         <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                <div className="flex justify-center items-center p-4">
                                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                    <span className="ml-2">Loading patients...</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        patients.map(patient => (
                            <TableRow key={patient.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-9 h-9">
                                            <AvatarImage src={`https://i.ibb.co/yPVRrG0/happy-man.png`} data-ai-hint={patient.avatarHint}/>
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
                                        <Link href={`/patient/profile/${patient.id}`}>View Profile</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
