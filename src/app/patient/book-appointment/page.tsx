import { AppLayout } from "@/components/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const doctors = [
    { name: "Dr. Emily Carter", specialization: "Cardiology", rating: 4.9, experience: "15 years", fee: "$150" },
    { name: "Dr. Ben Hanson", specialization: "Dermatology", rating: 4.8, experience: "10 years", fee: "$120" },
    { name: "Dr. Sarah Lee", specialization: "Pediatrics", rating: 5.0, experience: "12 years", fee: "$100" },
    { name: "Dr. Michael Chen", specialization: "Neurology", rating: 4.7, experience: "20 years", fee: "$200" },
];

export default function BookAppointmentPage() {
  return (
    <AppLayout userType="patient">
      <div className="flex flex-col gap-4">
        <Card>
            <CardHeader>
            <CardTitle>Book an Appointment</CardTitle>
            <CardDescription>Find and book appointments with our top-rated doctors.</CardDescription>
            </CardHeader>
        </Card>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {doctors.map(doctor => (
                <Card key={doctor.name}>
                    <CardHeader className="items-center text-center">
                        <Avatar className="w-24 h-24 mb-4">
                            <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint="doctor portrait"/>
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
                        <Button className="w-full">Book Now</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </AppLayout>
  );
}
