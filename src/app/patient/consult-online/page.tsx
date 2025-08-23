
"use client";

import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Star, Video, Loader2 } from "lucide-react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const doctors = [
    { id: "doc_1", name: "Dr. Emily Carter", specialization: "Cardiology", rating: 4.9, status: "Online", experience: "15 years", isCurrent: true, avatarHint: "caucasian female doctor" },
    { id: "doc_2", name: "Dr. Ben Hanson", specialization: "Dermatology", rating: 4.8, status: "Online", experience: "10 years", isCurrent: false, avatarHint: "black male doctor" },
    { id: "doc_3", name: "Dr. Sarah Lee", specialization: "Pediatrics", rating: 5.0, status: "Offline", experience: "12 years", isCurrent: false, avatarHint: "east asian female doctor" },
    { id: "doc_4", name: "Dr. Michael Chen", specialization: "Neurology", rating: 4.7, status: "Online", experience: "20 years", isCurrent: false, avatarHint: "white male doctor" },
];

// Sort doctors to show the current one first, then by online status
const sortedDoctors = doctors.sort((a, b) => {
    if (a.isCurrent && !b.isCurrent) return -1;
    if (!a.isCurrent && b.isCurrent) return 1;
    if (a.status === 'Online' && b.status !== 'Online') return -1;
    if (a.status !== 'Online' && b.status === 'Online') return 1;
    return 0;
});

export default function ConsultOnlinePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [loadingDoctor, setLoadingDoctor] = useState<string | null>(null);

  const handleConsult = async (doctor: typeof sortedDoctors[0]) => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Not Logged In",
            description: "You must be logged in to start a consultation.",
        });
        return;
    }

    setLoadingDoctor(doctor.name);
    
    try {
        const consultationRef = await addDoc(collection(db, "consultations"), {
            patientId: user.uid,
            doctorId: doctor.id,
            doctorName: doctor.name,
            patientName: user.displayName || "Patient",
            status: "initiated",
            createdAt: serverTimestamp(),
            meetCode: `healthvision-${Date.now()}`
        });
        
        toast({
            title: "Consultation Booked!",
            description: `Your video call with ${doctor.name} is starting.`,
        });
        
        const meetUrl = `https://meet.google.com/lookup/${consultationRef.id}`;
        // In a real app, you might want to open this in a new tab or embedded view
        window.location.href = meetUrl;

    } catch (error) {
        console.error("Error booking consultation:", error);
        toast({
            variant: "destructive",
            title: "Booking Failed",
            description: "Could not initiate the consultation. Please try again.",
        });
    } finally {
        setLoadingDoctor(null);
    }
  };
  
  return (
    <AppLayout userType="patient">
      <div className="flex flex-col gap-4">
        <Card>
            <CardHeader className="border-b">
            <CardTitle>Consult a Doctor Online</CardTitle>
            <CardDescription>Start an instant video consultation with available doctors.</CardDescription>
            </CardHeader>
        </Card>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedDoctors.map(doctor => (
                <Card key={doctor.name} className={doctor.isCurrent ? "border-primary border-2" : ""}>
                    <CardHeader className="items-center text-center relative">
                        {doctor.isCurrent && <Badge className="absolute top-2 right-2">Your Doctor</Badge>}
                        <Avatar className="w-24 h-24 mb-4 border">
                            <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint={doctor.avatarHint}/>
                            <AvatarFallback>{doctor.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <CardTitle>{doctor.name}</CardTitle>
                        <CardDescription>{doctor.specialization}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <span>Experience</span>
                            <span className="font-semibold text-foreground">{doctor.experience}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <span>Rating</span>
                            <div className="flex items-center gap-1 font-semibold text-foreground">
                                <Star className="w-4 h-4 fill-primary text-primary" /> {doctor.rating}
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <span>Status</span>
                            <Badge variant={doctor.status === "Online" ? "default" : "outline"} className={doctor.status === "Online" ? "bg-green-500 hover:bg-green-600" : ""}>
                                <span className={`mr-2 h-2 w-2 rounded-full ${doctor.status === "Online" ? 'bg-white' : 'bg-gray-400'}`}></span>
                                {doctor.status}
                            </Badge>
                        </div>
                        <Button 
                          className="w-full" 
                          disabled={doctor.status !== 'Online' || !!loadingDoctor}
                          onClick={() => handleConsult(doctor)}
                        >
                            {loadingDoctor === doctor.name ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            ) : (
                              <Video className="mr-2 h-4 w-4"/>
                            )}
                            {loadingDoctor === doctor.name ? "Starting..." : "Consult Now"}
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </AppLayout>
  );
}
