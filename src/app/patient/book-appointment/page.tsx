
'use client';

import { AppLayout } from "@/components/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Star, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  experience: string;
  fee: string;
  avatarHint: string;
}

export default function BookAppointmentPage() {
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      const q = query(collection(db, "users"), where("role", "==", "doctor"));
      const querySnapshot = await getDocs(q);
      const doctorsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          specialization: data.specialization || 'General Physician',
          rating: data.rating || 4.5,
          experience: data.experience || '5 years',
          fee: data.fee || '$100',
          avatarHint: data.avatarHint || 'doctor professional',
        }
      });
      setDoctors(doctorsData);
      setLoading(false);
    }
    fetchDoctors();
  }, []);

  const handleBooking = (doctorName: string) => {
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${doctorName} has been confirmed.`,
    });
  };
  
  if (loading) {
    return (
        <AppLayout userType="patient">
            <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        </AppLayout>
    )
  }

  return (
    <AppLayout userType="patient">
      <div className="flex flex-col gap-4">
        <Card>
            <CardHeader className="border-b">
            <CardTitle>Book an Appointment</CardTitle>
            <CardDescription>Find and book appointments with our top-rated doctors.</CardDescription>
            </CardHeader>
        </Card>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {doctors.map(doctor => (
                <Card key={doctor.id}>
                    <CardHeader className="items-center text-center">
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
                            <span>Consultation Fee</span>
                            <span className="font-semibold text-foreground">{doctor.fee}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <span>Rating</span>
                            <div className="flex items-center gap-1 font-semibold text-foreground">
                                <Star className="w-4 h-4 fill-primary text-primary" /> {doctor.rating}
                            </div>
                        </div>
                        <Button className="w-full" onClick={() => handleBooking(doctor.name)}>Book Now</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </AppLayout>
  );
}
