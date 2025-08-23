
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Calendar, Mail, Phone, User } from "lucide-react";

// This is a placeholder for real data fetching.
const getPatientData = (userId: string) => {
    // In a real application, you would fetch this data from your backend
    // based on the userId. For now, we'll return mock data.
    return {
        name: "Alex Murray",
        age: 34,
        email: "alex.murray@example.com",
        phone: "+1 (555) 123-4567",
        bloodType: "O+",
        allergies: ["Peanuts", "Pollen"],
        conditions: ["Hypertension", "Asthma"],
    }
}


export default function PatientProfilePage({ params }: { params: { userId: string } }) {
  const patient = getPatientData(params.userId);

  return (
    <main className="flex min-h-screen flex-col items-center bg-muted/40 p-4 sm:p-8">
       <div className="w-full max-w-4xl mx-auto">
        <Card className="shadow-lg">
            <CardHeader className="bg-card">
                 <div className="flex flex-col sm:flex-row items-center gap-6">
                    <Avatar className="w-24 h-24 border-4 border-primary">
                        <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint="patient portrait"/>
                        <AvatarFallback>{patient.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="text-center sm:text-left">
                        <CardTitle className="text-3xl">{patient.name}</CardTitle>
                        <CardDescription className="text-lg">Patient Health Profile</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6 grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl"><User /> Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Age</span>
                                <span className="font-medium">{patient.age}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Email</span>
                                <span className="font-medium">{patient.email}</span>
                            </div>
                             <Separator />
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Phone</span>
                                <span className="font-medium">{patient.phone}</span>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl"><Briefcase /> Medical Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Blood Type</span>
                                <span className="font-medium">{patient.bloodType}</span>
                            </div>
                            <Separator />
                            <div>
                                <span className="text-muted-foreground">Allergies</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {patient.allergies.map(allergy => <Badge key={allergy} variant="secondary">{allergy}</Badge>)}
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <span className="text-muted-foreground">Existing Conditions</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                     {patient.conditions.map(condition => <Badge key={condition} variant="outline">{condition}</Badge>)}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                 <p className="text-xs text-center text-muted-foreground pt-4">
                    This information is shared for medical consultation purposes only.
                </p>
            </CardContent>
        </Card>
       </div>
    </main>
  );
}
