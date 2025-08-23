
'use client';

import { AppLayout } from "@/components/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BrainCircuit, Briefcase, Calendar, FileText, HeartPulse, Lightbulb, Sparkles, TriangleAlert, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data fetching, in a real app this would come from an API
const getAppointmentDetails = (appointmentId: string) => {
    // Mock patient data
    const patient = {
        name: "Liam Johnson",
        age: 34,
        email: "liam.j@example.com",
        phone: "+1 (555) 234-5678",
        bloodType: "A+",
        allergies: ["Penicillin"],
        conditions: ["Type 1 Diabetes"],
    };

    // Mock appointment data
    const appointment = {
        id: appointmentId,
        patientName: patient.name,
        time: "9:00 AM - 9:30 AM",
        date: "2024-07-29",
        type: "Video",
        reason: "Routine check-up and prescription renewal for diabetes management."
    };

    // Mock AI Analysis data
    const aiAnalysis = {
        report: "The patient's described symptoms of fatigue and frequent urination, combined with wearable data showing elevated blood glucose levels, are consistent with their existing diagnosis of Type 1 Diabetes. The provided lab report confirms a recent HbA1c of 7.8%, which is higher than the target range, suggesting a need for adjustment in their insulin regimen. No new acute issues are immediately apparent from the provided data, but a consultation to discuss lifestyle factors and medication adherence is recommended.",
        keyIndicators: {
            bloodSugar: "180 mg/dL (avg)",
            heartRate: "72 bpm (avg)",
        },
        urgency: "routine",
        explanation: "Symptoms are consistent with a known chronic condition that needs ongoing management. No signs of acute distress are present.",
    };
    
    return { patient, appointment, aiAnalysis };
}


const UrgencyMap = {
  self_care: {
    label: "Self-Care",
    icon: <Lightbulb className="h-5 w-5 text-green-700" />,
    description: "Manageable at home. Monitor symptoms."
  },
  routine: {
    label: "Routine",
    icon: <Sparkles className="h-5 w-5 text-yellow-700" />,
    description: "A routine check-up is recommended."
  },
  urgent: {
    label: "Urgent",
    icon: <TriangleAlert className="h-5 w-5 text-red-700" />,
    description: "Requires prompt medical attention."
  },
};


export default function AppointmentDetailsPage({ params }: { params: { appointmentId: string } }) {
  const { patient, appointment, aiAnalysis } = getAppointmentDetails(params.appointmentId);
  const routerParams = useParams();
  const appointmentId = typeof routerParams.appointmentId === 'string' ? routerParams.appointmentId : '';


  return (
    <AppLayout userType="doctor">
       <div className="flex flex-col gap-4">
            <div>
                <Button variant="outline" asChild>
                    <Link href="/doctor/appointments" className="flex items-center gap-2">
                        <ArrowLeft/> Back to Appointments
                    </Link>
                </Button>
            </div>
            
            <Card>
                <CardHeader className="p-4 border-b">
                    <CardTitle>{appointment.patientName}</CardTitle>
                    <CardDescription>{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {appointment.time}</CardDescription>
                    <p className="pt-2 text-sm text-muted-foreground"><strong>Reason:</strong> {appointment.reason}</p>
                </CardHeader>
            </Card>

            <div className="grid md:grid-cols-3 gap-4 items-start">
                <div className="md:col-span-1 space-y-4">
                    <Card>
                        <CardHeader className="items-center p-4">
                             <Avatar className="w-20 h-20 border-4 border-primary">
                                <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint="man portrait"/>
                                <AvatarFallback>{patient.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                            </Avatar>
                        </CardHeader>
                        <CardContent className="text-center p-4 pt-0">
                            <h3 className="text-lg font-bold">{patient.name}</h3>
                            <p className="text-muted-foreground text-sm">Age: {patient.age}</p>
                            <Button variant="outline" size="sm" className="mt-3" asChild>
                                <Link href={`/patient/profile/${appointmentId}`}>View Full Profile</Link>
                            </Button>
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
                <div className="md:col-span-2 space-y-4">
                    <Card className="bg-accent/50 border-accent">
                        <CardHeader className="p-4 border-b">
                            <CardTitle className="flex items-center gap-2">
                                <BrainCircuit /> AI Pre-Analysis
                            </CardTitle>
                            <CardDescription>An AI-generated summary based on the patient's latest health data.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="space-y-4">
                                <Card className="bg-background">
                                    <CardHeader className="p-4">
                                        <CardTitle className="flex items-center gap-2 text-base">
                                            {UrgencyMap[aiAnalysis.urgency as keyof typeof UrgencyMap].icon}
                                            <span>Urgency: {UrgencyMap[aiAnalysis.urgency as keyof typeof UrgencyMap].label}</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <p className="font-semibold">{UrgencyMap[aiAnalysis.urgency as keyof typeof UrgencyMap].description}</p>
                                        <p className="text-xs text-muted-foreground mt-1"><strong className="text-foreground">Reasoning:</strong> {aiAnalysis.explanation}</p>
                                    </CardContent>
                                </Card>
                                 <Card className="bg-background">
                                    <CardHeader className="p-4 border-b">
                                        <CardTitle className="text-base">Key Health Indicators</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-2 gap-4 p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-primary/10 rounded-full"><FileText className="w-5 h-5 text-primary"/></div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Blood Sugar</p>
                                                <p className="font-bold text-sm">{aiAnalysis.keyIndicators.bloodSugar}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-primary/10 rounded-full"><HeartPulse className="w-5 h-5 text-primary"/></div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Heart Rate</p>
                                                <p className="font-bold text-sm">{aiAnalysis.keyIndicators.heartRate}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <div>
                                    <h4 className="font-semibold mb-2 text-base">Detailed Report</h4>
                                    <p className="text-sm whitespace-pre-wrap text-muted-foreground">{aiAnalysis.report}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
       </div>
    </AppLayout>
  );
}
