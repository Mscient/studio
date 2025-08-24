
"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Star, Video, Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  status: "Online" | "Offline";
  experience: string;
  avatarHint: string;
  isCurrent?: boolean;
}

const sampleDoctors: Doctor[] = [
    { id: '1', name: 'Dr. Emily Carter', specialization: 'Cardiologist', rating: 4.9, status: 'Online', experience: '12 years', avatarHint: 'doctor professional woman' },
    { id: '2', name: 'Dr. Ben Hanson', specialization: 'Dermatologist', rating: 4.8, status: 'Online', experience: '8 years', avatarHint: 'doctor professional man' },
    { id: '3', name: 'Dr. Sarah Lee', specialization: 'Pediatrician', rating: 4.9, status: 'Offline', experience: '15 years', avatarHint: 'doctor friendly woman' },
    { id: '4', name: 'Dr. Michael Chen', specialization: 'Neurologist', rating: 4.7, status: 'Offline', experience: '10 years', avatarHint: 'doctor serious man' },
];

export default function ConsultOnlinePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDoctor, setLoadingDoctor] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // Simulate fetching and sorting data
    setTimeout(() => {
        const sortedDoctors = [...sampleDoctors].sort((a, b) => {
            if (a.status === 'Online' && b.status !== 'Online') return -1;
            if (a.status !== 'Online' && b.status === 'Online') return 1;
            return 0;
        });
        setDoctors(sortedDoctors);
        setLoading(false);
    }, 500);
  }, []);

  const handleConsult = async (doctor: Doctor) => {
    setLoadingDoctor(doctor.id);
    
    // Simulate API call
    setTimeout(() => {
        toast({
            title: "Consultation Booked!",
            description: `Your video call with ${doctor.name} is starting.`,
        });
        
        const meetUrl = `https://meet.google.com/lookup/healthvision-${doctor.id}-${Date.now()}`;
        window.open(meetUrl, '_blank');
        setLoadingDoctor(null);
    }, 1000);
  };
  
  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-4">
        <Card>
            <CardHeader className="border-b">
            <CardTitle>Consult a Doctor Online</CardTitle>
            <CardDescription>Start an instant video consultation with available doctors.</CardDescription>
            </CardHeader>
        </Card>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {doctors.map(doctor => (
                <Card key={doctor.id} className={doctor.isCurrent ? "border-primary border-2" : ""}>
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
                            {loadingDoctor === doctor.id ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            ) : (
                              <Video className="mr-2 h-4 w-4"/>
                            )}
                            {loadingDoctor === doctor.id ? "Starting..." : "Consult Now"}
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </AppLayout>
  );
}
