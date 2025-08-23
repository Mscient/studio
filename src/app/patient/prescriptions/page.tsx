
import { AppLayout } from "@/components/app-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FileText, Stethoscope, User, Calendar, Pill, Clock, ShieldCheck, Info } from "lucide-react";

const prescriptions = [
  {
    id: 1,
    doctor: "Dr. Ananya Mehta",
    doctorSpecialty: "MBBS, MD – General Physician",
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
        frequency: "Every 6 hours (Max 4 doses/day)",
        duration: "3 days",
        purpose: "Reduces fever, relieves headache and body ache",
      },
      {
        name: "Cetirizine 10 mg",
        brand: "Cetzine",
        dosage: "1 tablet",
        frequency: "Once at night (after dinner)",
        duration: "5 days",
        purpose: "Relieves sneezing, runny nose, watery eyes (anti-allergic)",
      },
      {
        name: "Vitamin C 500 mg",
        brand: "Limcee Chewable Tablet",
        dosage: "1 tablet",
        frequency: "Once daily (morning after breakfast)",
        duration: "7 days",
        purpose: "Boosts immunity",
      },
    ],
  },
  {
    id: 2,
    doctor: "Dr. Rakesh Iyer",
    doctorSpecialty: "MD – Internal Medicine, Endocrinology",
    patient: "Smt. Kavita Joshi",
    patientAge: 52,
    diagnosis: "Type 2 Diabetes Mellitus + Hypertension",
    date: "2024-07-25",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "male doctor",
    medicines: [
      {
        name: "Metformin 500 mg",
        brand: "Glycomet SR 500",
        dosage: "1 tablet",
        frequency: "Twice daily (morning & evening, after meals)",
        duration: "Continuous (long-term)",
        purpose: "Controls blood sugar levels",
      },
      {
        name: "Glimepiride 2 mg",
        brand: "Amaryl",
        dosage: "1 tablet",
        frequency: "Once daily (before breakfast)",
        duration: "Continuous",
        purpose: "Stimulates insulin release to lower blood glucose",
      },
      {
        name: "Telmisartan 40 mg",
        brand: "Telma-40",
        dosage: "1 tablet",
        frequency: "Once daily (morning)",
        duration: "Continuous (long-term)",
        purpose: "Controls high blood pressure, protects kidneys",
      },
      {
        name: "Atorvastatin 10 mg",
        brand: "Atorva-10",
        dosage: "1 tablet",
        frequency: "Once at night (after dinner)",
        duration: "Continuous (long-term)",
        purpose: "Lowers cholesterol, prevents heart complications",
      },
    ],
  },
];

export default function PrescriptionsPage() {
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
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-center gap-3">
                     <Avatar className="w-12 h-12">
                        <AvatarImage src={prescription.avatarUrl} data-ai-hint={prescription.avatarHint}/>
                        <AvatarFallback>{prescription.doctor.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{prescription.doctor}</p>
                      <p className="text-sm text-muted-foreground">({prescription.doctorSpecialty})</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm self-start sm:self-center">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(prescription.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
                 <div className="flex items-center gap-2 pt-4 text-muted-foreground text-sm">
                    <User className="w-4 h-4" />
                    <p>
                      Patient: <span className="font-semibold text-foreground">{prescription.patient}</span> (Age: {prescription.patientAge})
                    </p>
                  </div>
                 <CardTitle className="pt-4 !text-xl">Diagnosis: {prescription.diagnosis}</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`item-${prescription.id}`}>
                    <AccordionTrigger className="font-semibold text-base">
                      View Prescribed Medicines ({prescription.medicines.length})
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        {prescription.medicines.map((med) => (
                          <div key={med.name} className="p-4 rounded-lg border bg-background/50 space-y-3">
                             <p className="font-bold text-lg text-primary">{med.name} <span className="text-sm font-normal text-muted-foreground">({med.brand})</span></p>
                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <Pill className="w-4 h-4 text-primary" />
                                  <div>
                                    <p className="text-muted-foreground">Dosage</p>
                                    <p className="font-semibold">{med.dosage}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-primary" />
                                  <div>
                                    <p className="text-muted-foreground">Frequency</p>
                                    <p className="font-semibold">{med.frequency}</p>
                                  </div>
                                </div>
                                 <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-primary" />
                                  <div>
                                    <p className="text-muted-foreground">Duration</p>
                                    <p className="font-semibold">{med.duration}</p>
                                  </div>
                                </div>
                                 <div className="flex items-center gap-2">
                                  <ShieldCheck className="w-4 h-4 text-primary" />
                                  <div>
                                    <p className="text-muted-foreground">Purpose</p>
                                    <p className="font-semibold">{med.purpose}</p>
                                  </div>
                                </div>
                             </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
