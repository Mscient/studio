
'use client';

import { AppLayout } from "@/components/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BrainCircuit, Briefcase, FileText, HeartPulse, Lightbulb, Sparkles, TriangleAlert, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";

interface Patient {
    name: string;
    age: number;
    email: string;
    phone: string;
    bloodType: string;
    allergies: string[];
    conditions: string[];
    avatarHint: string;
}

interface Appointment {
    id: string;
    patientId: string;
    patientName: string;
    time: string;
    date: string;
    type: string;
    reason: string;
}

interface AiAnalysis {
    report: string;
    keyIndicators: {
        bloodSugar: string;
        heartRate: string;
    };
    urgency: string;
    explanation: string;
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
  const [patient, setPatient] = useState<Patient | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AiAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const routerParams = useParams();
  const appointmentId = typeof routerParams.appointmentId === 'string' ? routerParams.appointmentId : '';

  useEffect(() => {
    const fetchAppointmentDetails = async (id: string) => {
        if (!id) return;
        setLoading(true);

        // Fetch appointment data
        const appointmentRef = doc(db, 'appointments', id);
        const appointmentSnap = await getDoc(appointmentRef);

        if (!appointmentSnap.exists()) {
            console.error("No such appointment!");
            setLoading(false);
            return;
        }

        const appointmentData = appointmentSnap.data();
        const patientId = appointmentData.patientId;
        
        // Fetch patient data
        const patientRef = doc(db, 'users', patientId);
        const patientSnap = await getDoc(patientRef);
        
        if (!patientSnap.exists()) {
             console.error("No such patient!");
             setLoading(false);
             return;
        }
        
        const patientData = patientSnap.data();
        const fetchedPatient = {
            name: patientData.name,
            age: patientData.age,
            email: patientData.email,
            phone: patientData.phone,
            bloodType: patientData.bloodType || "A+", // Mock
            allergies: patientData.allergies || ["Penicillin"], // Mock
            conditions: patientData.conditions || ["Type 1 Diabetes"], // Mock
            avatarHint: patientData.avatarHint || 'person'
        };
        setPatient(fetchedPatient);

        const fetchedAppointment = {
            id: appointmentSnap.id,
            patientId: patientId,
            patientName: fetchedPatient.name,
            time: appointmentData.time,
            date: appointmentData.date,
            type: appointmentData.type,
            reason: appointmentData.reason
        };
        setAppointment(fetchedAppointment);
        
        // Mock AI Analysis data
        setAiAnalysis({
            report: "The patient's described symptoms of fatigue and frequent urination, combined with wearable data showing elevated blood glucose levels, are consistent with their existing diagnosis of Type 1 Diabetes. The provided lab report confirms a recent HbA1c of 7.8%, which is higher than the target range, suggesting a need for adjustment in their insulin regimen. No new acute issues are immediately apparent from the provided data, but a consultation to discuss lifestyle factors and medication adherence is recommended.",
            keyIndicators: {
                bloodSugar: "180 mg/dL (avg)",
                heartRate: "72 bpm (avg)",
            },
            urgency: appointmentData.urgency || "routine",
            explanation: "Symptoms are consistent with a known chronic condition that needs ongoing management. No signs of acute distress are present.",
        });

        setLoading(false);
    }
    
    fetchAppointmentDetails(appointmentId);

  }, [appointmentId]);
  
  if (loading || !appointment || !patient || !aiAnalysis) {
    return (
        <AppLayout userType="doctor">
            <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        </AppLayout>
    )
  }

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
                                <AvatarImage src={`https://i.ibb.co/yPVRrG0/happy-man.png`} data-ai-hint={patient.avatarHint}/>
                                <AvatarFallback>{patient.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                            </Avatar>
                        </CardHeader>
                        <CardContent className="text-center p-4 pt-0">
                            <h3 className="text-lg font-bold">{patient.name}</h3>
                            <p className="text-muted-foreground text-sm">Age: {patient.age}</p>
                            <Button variant="outline" size="sm" className="mt-3" asChild>
                                <Link href={`/patient/profile/${appointment.patientId}`}>View Full Profile</Link>
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
