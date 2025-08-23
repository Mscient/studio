
'use client';

import { AppLayout } from "@/components/app-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FileText, Stethoscope, User, Calendar, Pill, Clock, ShieldCheck, Info, Bell, Download, Printer } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const prescriptions = [
  {
    id: 1,
    doctor: "Dr. Ananya Mehta",
    doctorSpecialty: "MBBS, MD – General Physician",
    clinic: "Apollo Clinic",
    patient: "Rahul Sharma",
    patientAge: 28,
    diagnosis: "Viral Upper Respiratory Infection (Common Cold + Mild Fever)",
    date: "2024-07-28",
    avatarUrl: "https://i.ibb.co/9TRmR6C/female-doctor-smiling.jpg",
    avatarHint: "female doctor smiling",
    medicines: [
      {
        name: "Paracetamol 500 mg",
        brand: "Crocin Advance",
        dosage: "1 tablet",
        frequency: "Every 6 hours",
        duration: "3 days",
        purpose: "Reduces fever, relieves headache and body ache",
      },
      {
        name: "Cetirizine 10 mg",
        brand: "Cetzine",
        dosage: "1 tablet",
        frequency: "Once at night",
        duration: "5 days",
        purpose: "Relieves sneezing, runny nose",
      },
      {
        name: "Vitamin C 500 mg",
        brand: "Limcee Chewable Tablet",
        dosage: "1 tablet",
        frequency: "Once daily",
        duration: "7 days",
        purpose: "Boosts immunity",
      },
    ],
  },
  {
    id: 2,
    doctor: "Dr. Rakesh Iyer",
    doctorSpecialty: "MD – Internal Medicine, Endocrinology",
    clinic: "Fortis Hospital",
    patient: "Smt. Kavita Joshi",
    patientAge: 52,
    diagnosis: "Type 2 Diabetes Mellitus + Hypertension",
    date: "2024-07-25",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "indian male doctor",
    medicines: [
      {
        name: "Metformin 500 mg",
        brand: "Glycomet SR 500",
        dosage: "1 tablet",
        frequency: "Twice daily",
        duration: "Continuous",
        purpose: "Controls blood sugar",
      },
      {
        name: "Telmisartan 40 mg",
        brand: "Telma-40",
        dosage: "1 tablet",
        frequency: "Once daily",
        duration: "Continuous",
        purpose: "Controls blood pressure",
      },
      {
        name: "Atorvastatin 10 mg",
        brand: "Atorva-10",
        dosage: "1 tablet",
        frequency: "Once at night",
        duration: "Continuous",
        purpose: "Lowers cholesterol",
      },
    ],
  },
];

export default function PrescriptionsPage() {
  const { toast } = useToast();

  const handleSetReminder = (medicineName: string) => {
    if (!("Notification" in window)) {
      toast({
        variant: "destructive",
        title: "Notifications not supported",
        description: "This browser does not support desktop notifications.",
      });
      return;
    }

    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        toast({
          title: "Reminder Set",
          description: `You will be reminded to take ${medicineName}.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Notifications Blocked",
          description: "Please enable notifications in your browser settings.",
        });
      }
    });
  };

  const handleAction = (action: "Download" | "Print") => {
    toast({
      title: `${action} Initiated`,
      description: `Your prescription is being prepared for ${action.toLowerCase()}.`,
    })
  }

  return (
    <AppLayout userType="patient">
      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6" /> My Prescriptions
            </CardTitle>
            <CardDescription>
              Here you can find all your medical prescriptions. Keep track of
              your medications, dosages, and treatment durations.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="space-y-8">
          {prescriptions.map((prescription) => (
            <Card key={prescription.id} className="shadow-lg">
              <CardHeader className="bg-muted/30">
                 <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-center gap-4">
                     <Avatar className="w-16 h-16 border-2 border-primary">
                        <AvatarImage src={prescription.avatarUrl} data-ai-hint={prescription.avatarHint}/>
                        <AvatarFallback>{prescription.doctor.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xl font-bold text-primary">{prescription.doctor}</p>
                      <p className="text-sm text-muted-foreground">{prescription.doctorSpecialty}</p>
                       <p className="text-sm font-semibold text-foreground">{prescription.clinic}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground text-left sm:text-right">
                    <p><strong>Date:</strong> {new Date(prescription.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                    <p><strong>Prescription ID:</strong> #{prescription.id.toString().padStart(5, '0')}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-4 border-b pb-4">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Patient</p>
                        <p className="font-semibold">{prescription.patient} (Age: {prescription.patientAge})</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Diagnosis</p>
                        <p className="font-semibold">{prescription.diagnosis}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Pill className="text-primary"/> Medications (Rx)</h3>
                    <div className="space-y-4">
                      {prescription.medicines.map((med) => (
                        <div key={med.name} className="p-4 rounded-lg border bg-background/50 space-y-3 relative group">
                          <div className="flex justify-between items-start">
                              <p className="font-bold text-md text-foreground pr-16">{med.name} <span className="text-sm font-normal text-muted-foreground">({med.brand})</span></p>
                              <Button variant="ghost" size="sm" className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleSetReminder(med.name)}>
                                  <Bell className="h-4 w-4"/> <span>Set Reminder</span>
                              </Button>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                  <p className="text-muted-foreground text-xs">Dosage</p>
                                  <p className="font-semibold">{med.dosage}</p>
                              </div>
                              <div>
                                  <p className="text-muted-foreground text-xs">Frequency</p>
                                  <p className="font-semibold">{med.frequency}</p>
                              </div>
                              <div>
                                  <p className="text-muted-foreground text-xs">Duration</p>
                                  <p className="font-semibold">{med.duration}</p>
                              </div>
                          </div>
                           <div>
                                <p className="text-muted-foreground text-xs">Purpose</p>
                                <p className="font-semibold text-sm">{med.purpose}</p>
                            </div>
                        </div>
                      ))}
                    </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 p-4 flex justify-end gap-2">
                 <Button variant="outline" onClick={() => handleAction('Download')}>
                    <Download className="mr-2"/> Download
                 </Button>
                 <Button onClick={() => handleAction('Print')}>
                    <Printer className="mr-2"/> Print
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
