
import { AppLayout } from "@/components/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Video } from "lucide-react";

const doctors = [
    { name: "Dr. Emily Carter", specialization: "Cardiology", rating: 4.9, status: "Online", isCurrent: true },
    { name: "Dr. Ben Hanson", specialization: "Dermatology", rating: 4.8, status: "Online", isCurrent: false },
    { name: "Dr. Sarah Lee", specialization: "Pediatrics", rating: 5.0, status: "Offline", isCurrent: false },
    { name: "Dr. Michael Chen", specialization: "Neurology", rating: 4.7, status: "Online", isCurrent: false },
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
  return (
    <AppLayout userType="patient">
      <div className="flex flex-col gap-4">
        <Card>
            <CardHeader>
            <CardTitle>Consult a Doctor Online</CardTitle>
            <CardDescription>Start an instant video consultation with available doctors.</CardDescription>
            </CardHeader>
        </Card>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedDoctors.map(doctor => (
                <Card key={doctor.name} className={doctor.isCurrent ? "border-primary border-2" : ""}>
                    <CardHeader className="items-center text-center relative">
                        {doctor.isCurrent && <Badge className="absolute top-2 right-2">Your Doctor</Badge>}
                        <Avatar className="w-24 h-24 mb-4">
                            <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint="doctor portrait"/>
                            <AvatarFallback>{doctor.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <CardTitle>{doctor.name}</CardTitle>
                        <CardDescription>{doctor.specialization}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                        <Button className="w-full" disabled={doctor.status !== 'Online'}>
                            <Video className="mr-2 h-4 w-4"/>
                            Consult Now
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </AppLayout>
  );
}

