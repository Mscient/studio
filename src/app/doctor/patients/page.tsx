
'use client';

import { AppLayout } from "@/components/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserPlus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Patient {
  id: string;
  name: string;
  age: number;
  avatarHint: string;
}

const samplePatients: Patient[] = [
    { id: '1', name: 'John Doe', age: 45, avatarHint: 'man glasses' },
    { id: '2', name: 'Jane Smith', age: 34, avatarHint: 'woman professional' },
    { id: '3', name: 'Peter Jones', age: 28, avatarHint: 'young man' },
    { id: '4', name: 'Mary Williams', age: 52, avatarHint: 'older woman smiling' },
    { id: '5', name: 'David Brown', age: 67, avatarHint: 'senior man' },
];

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
        const filteredPatients = samplePatients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setPatients(filteredPatients);
        setLoading(false);
    }, 300);
  }, [searchTerm]);

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
                <Input 
                    placeholder="Search patients by name..." 
                    className="pl-10" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </CardHeader>
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                 <TableBody>
                    {loading ? (
                         <TableRow>
                            <TableCell colSpan={3} className="text-center">
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
