
'use client';

import { useEffect, useState } from 'react';
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
import { FileText, Bell, Download, Printer, Loader2 } from "lucide-react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

interface Medicine {
  name: string;
  brand?: string;
  dosage: string;
  frequency: string;
  duration: string;
  purpose: string;
}

interface Prescription {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatarHint: string;
  clinic: string;
  patientName: string;
  patientAge: number;
  diagnosis: string;
  date: string;
  medicines: Medicine[];
}

export default function PrescriptionsPage() {
  const { toast } = useToast();
  const [user] = useAuthState(auth);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      if (!user) return;
      setLoading(true);

      const q = query(collection(db, 'prescriptions'), where('patientId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const prescriptionsData = await Promise.all(
        querySnapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          let doctorData = { name: "Dr. Unknown", specialty: "N/A", avatarHint: "doctor", clinic: "N/A" };
          
          if(data.doctorId) {
            const doctorRef = doc(db, 'users', data.doctorId);
            const doctorSnap = await getDoc(doctorRef);
            if (doctorSnap.exists()) {
              const d = doctorSnap.data();
              doctorData = { name: d.name, specialty: d.specialty || 'General Physician', avatarHint: d.avatarHint, clinic: d.clinic || 'General Clinic' };
            }
          }

          return {
            id: docSnap.id,
            ...data,
            doctorName: doctorData.name,
            doctorSpecialty: doctorData.specialty,
            doctorAvatarHint: doctorData.avatarHint,
            clinic: doctorData.clinic,
          } as Prescription;
        })
      );

      setPrescriptions(prescriptionsData);
      setLoading(false);
    };

    fetchPrescriptions();
  }, [user]);

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
        
        {prescriptions.length === 0 && !loading && (
          <p className="text-center text-muted-foreground pt-8">No prescriptions found.</p>
        )}

        <div className="space-y-8">
          {prescriptions.map((prescription) => (
            <Card key={prescription.id} className="shadow-lg">
              <CardHeader className="bg-muted/30">
                 <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-center gap-4">
                     <Avatar className="w-16 h-16 border-2 border-primary">
                        <AvatarImage src={`https://placehold.co/64x64.png`} data-ai-hint={prescription.doctorAvatarHint}/>
                        <AvatarFallback>{prescription.doctorName.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xl font-bold text-primary">{prescription.doctorName}</p>
                      <p className="text-sm text-muted-foreground">{prescription.doctorSpecialty}</p>
                       <p className="text-sm font-semibold text-foreground">{prescription.clinic}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground text-left sm:text-right">
                    <p><strong>Date:</strong> {new Date(prescription.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                    <p><strong>Prescription ID:</strong> #{prescription.id.substring(0,6)}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-4 border-b pb-4">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Patient</p>
                        <p className="font-semibold">{prescription.patientName} (Age: {prescription.patientAge})</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Diagnosis</p>
                        <p className="font-semibold">{prescription.diagnosis}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">Medications (Rx)</h3>
                    <div className="space-y-4">
                      {prescription.medicines.map((med, index) => (
                        <div key={index} className="p-4 rounded-lg border bg-background/50 space-y-3 relative group">
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
