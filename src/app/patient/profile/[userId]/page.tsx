
'use client';

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { AppLayout } from "@/components/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Briefcase, User, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface PatientData {
    name: string;
    age: number;
    email: string;
    phone: string;
    gender: string;
    bloodType: string;
    allergies: string[];
    conditions: string[];
    avatarHint: string;
}

export default function PatientProfilePage({ params }: { params: { userId: string } }) {
  const [patient, setPatient] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, authLoading] = useAuthState(auth);

  useEffect(() => {
    const fetchPatientData = async (uid: string) => {
        setLoading(true);
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) {
            const data = docSnap.data();
            setPatient({
                name: data.name || "N/A",
                age: data.age || "N/A",
                email: data.email || "N/A",
                phone: data.phone || "N/A",
                gender: data.gender || "N/A",
                bloodType: data.bloodType || "N/A",
                allergies: data.allergies || [],
                conditions: data.conditions || [],
                avatarHint: "happy man",
            });
        } else {
            console.log("No such document!");
        }
        setLoading(false);
    };
    
    // This allows doctors to view patient profiles, or patients to view their own
    const profileIdToLoad = params.userId || user?.uid;

    if (profileIdToLoad) {
        fetchPatientData(profileIdToLoad);
    } else if (!authLoading) {
      setLoading(false); // Finished auth check, no user, stop loading
    }

  }, [params.userId, user, authLoading]);

  if (loading || authLoading) {
    return (
        <AppLayout>
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
                         <div className="grid md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader className="p-4 border-b">
                                    <Skeleton className="h-6 w-40" />
                                </CardHeader>
                                <CardContent className="space-y-6 p-4">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="p-4 border-b">
                                    <Skeleton className="h-6 w-40" />
                                </CardHeader>
                                <CardContent className="space-y-4 p-4">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
  }

  if (!patient) {
      return (
        <AppLayout>
            <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
                <p>Patient profile not found or you do not have permission to view it.</p>
            </div>
        </AppLayout>
      )
  }


  return (
    <AppLayout>
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
                                <span className="font-medium">{patient.age || 'N/A'}</span>
                            </div>
                            <Separator />
                             <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Gender</span>
                                <span className="font-medium capitalize">{patient.gender || 'N/A'}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Email</span>
                                <span className="font-medium">{patient.email}</span>
                            </div>
                             <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Phone</span>
                                <span className="font-medium">{patient.phone || 'N/A'}</span>
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
                                <span className="font-medium">{patient.bloodType || 'N/A'}</span>
                            </div>
                            <Separator />
                            <div>
                                <span className="text-muted-foreground">Allergies</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {patient.allergies.length > 0 ? 
                                      patient.allergies.map(allergy => <Badge key={allergy} variant="secondary">{allergy}</Badge>) :
                                      <p className="text-sm font-medium">None reported</p>}
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <span className="text-muted-foreground">Existing Conditions</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                     {patient.conditions.length > 0 ?
                                       patient.conditions.map(condition => <Badge key={condition} variant="outline">{condition}</Badge>) :
                                       <p className="text-sm font-medium">None reported</p>}
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
