
'use client';

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { AppLayout } from "@/components/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Briefcase, User, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.coerce.number().positive().optional(),
  phone: z.string().optional(),
  gender: z.string().optional(),
  bloodType: z.string().optional(),
  allergies: z.string().optional(),
  conditions: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface PatientData {
    name: string;
    age?: number;
    email: string;
    phone?: string;
    gender?: string;
    bloodType?: string;
    allergies?: string[];
    conditions?: string[];
    avatarHint?: string;
}

export default function PatientProfilePage() {
  const [patient, setPatient] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, authLoading] = useAuthState(auth);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      age: undefined,
      phone: '',
      gender: '',
      bloodType: '',
      allergies: '',
      conditions: '',
    },
  });

  const fetchPatientData = async (uid: string) => {
    setLoading(true);
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
        const data = docSnap.data();
        const patientData = {
            name: data.name || "N/A",
            email: data.email || "N/A",
            age: data.age,
            phone: data.phone,
            gender: data.gender,
            bloodType: data.bloodType,
            allergies: data.allergies || [],
            conditions: data.conditions || [],
            avatarHint: "happy man",
        };
        setPatient(patientData);
        form.reset({
          name: patientData.name,
          age: patientData.age,
          phone: patientData.phone,
          gender: patientData.gender,
          bloodType: patientData.bloodType,
          allergies: patientData.allergies?.join(', '),
          conditions: patientData.conditions?.join(', '),
        });
    } else {
        console.log("No such document!");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
        fetchPatientData(user.uid);
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const handleUpdateProfile = async (data: ProfileFormValues) => {
    if (!user) return;

    const profileData = {
      ...data,
      allergies: data.allergies?.split(',').map(s => s.trim()).filter(Boolean) || [],
      conditions: data.conditions?.split(',').map(s => s.trim()).filter(Boolean) || [],
    };

    try {
      await setDoc(doc(db, 'users', user.uid), profileData, { merge: true });
      toast({
        title: "Profile Updated",
        description: "Your information has been saved successfully.",
      });
      fetchPatientData(user.uid); // Refresh data
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was an error saving your profile.",
      });
    }
  };


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
      return <AppLayout><p>Patient not found.</p></AppLayout>
  }


  return (
    <AppLayout>
       <div className="w-full max-w-4xl mx-auto">
        <Card className="shadow-lg">
            <CardHeader className="bg-card border-b flex flex-row items-center justify-between">
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
                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={form.handleSubmit(handleUpdateProfile)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" {...form.register('name')} />
                                    {form.formState.errors.name && <p className="text-destructive text-xs">{form.formState.errors.name.message}</p>}
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="age">Age</Label>
                                    <Input id="age" type="number" {...form.register('age')} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" {...form.register('phone')} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Input id="gender" {...form.register('gender')} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bloodType">Blood Type</Label>
                                    <Input id="bloodType" {...form.register('bloodType')} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="allergies">Allergies (comma-separated)</Label>
                                <Input id="allergies" {...form.register('allergies')} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="conditions">Existing Conditions (comma-separated)</Label>
                                <Input id="conditions" {...form.register('conditions')} />
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="ghost">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
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
                                    {(patient.allergies && patient.allergies.length > 0) ? 
                                      patient.allergies.map(allergy => <Badge key={allergy} variant="secondary">{allergy}</Badge>) :
                                      <p className="text-sm font-medium">None reported</p>}
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <span className="text-muted-foreground">Existing Conditions</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                     {(patient.conditions && patient.conditions.length > 0) ?
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
