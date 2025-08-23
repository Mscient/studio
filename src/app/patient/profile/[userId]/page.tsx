
'use client';

import { useEffect, useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Briefcase, User } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

interface PatientData {
    name: string;
    age: number;
    email: string;
    phone: string;
    bloodType: string;
    allergies: string[];
    conditions: string[];
    avatarHint: string;
}

export default function PatientProfilePage({ params }: { params: { userId: string } }) {
  const [patient, setPatient] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!params.userId) return;
      try {
        const docRef = doc(db, "users", params.userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // In a real app, you would have more robust type checking
          const data = docSnap.data();
          setPatient({
              name: data.name || "N/A",
              email: data.email || "N/A",
              // Mocking data that isn't in the user record yet
              age: data.age || 34,
              phone: data.phone || "+1 (555) 123-4567",
              bloodType: data.bloodType || "O+",
              allergies: data.allergies || ["Peanuts", "Pollen"],
              conditions: data.conditions || ["Hypertension", "Asthma"],
              avatarHint: data.avatarHint || "person",
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [params.userId]);

  if (loading) {
    return (
        <AppLayout userType="patient">
            <div className="w-full max-w-4xl mx-auto">
                <Card className="shadow-lg">
                    <CardHeader className="bg-card border-b">
                        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                            <Skeleton className="w-20 h-20 rounded-full border-4 border-primary"/>
                            <div>
                                <Skeleton className="h-8 w-48 mb-2" />
                                <Skeleton className="h-6 w-32" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 grid gap-4">
                        <Skeleton className="h-48 w-full" />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
  }

  if (!patient) {
      return <AppLayout userType="patient"><p>Patient not found.</p></AppLayout>
  }


  return (
    <AppLayout userType="patient">
       <div className="w-full max-w-4xl mx-auto">
        <Card className="shadow-lg">
            <CardHeader className="bg-card border-b">
                 <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <Avatar className="w-20 h-20 border-4 border-primary">
                        <AvatarImage src={`https://i.ibb.co/2802S44/caucasian-man.png`} data-ai-hint={patient.avatarHint}/>
                        <AvatarFallback>{patient.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-2xl">{patient.name}</CardTitle>
                        <CardDescription className="text-base">Patient Health Profile</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-4 grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader className="p-4 border-b">
                            <CardTitle className="flex items-center gap-2 text-lg"><User /> Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 p-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Age</span>
                                <span className="font-medium">{patient.age}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Email</span>
                                <span className="font-medium">{patient.email}</span>
                            </div>
                             <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Phone</span>
                                <span className="font-medium">{patient.phone}</span>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="p-4 border-b">
                            <CardTitle className="flex items-center gap-2 text-lg"><Briefcase /> Medical Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm p-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Blood Type</span>
                                <span className="font-medium">{patient.bloodType}</span>
                            </div>
                            <Separator />
                            <div>
                                <span className="text-muted-foreground">Allergies</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {patient.allergies.map(allergy => <Badge key={allergy} variant="secondary">{allergy}</Badge>)}
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <span className="text-muted-foreground">Existing Conditions</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                     {patient.conditions.map(condition => <Badge key={condition} variant="outline">{condition}</Badge>)}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                 <p className="text-xs text-center text-muted-foreground pt-2">
                    This information is shared for medical consultation purposes only.
                </p>
            </CardContent>
        </Card>
       </div>
    </AppLayout>
  );
}
