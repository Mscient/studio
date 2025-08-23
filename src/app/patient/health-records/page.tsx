
'use client';

import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FilePlus, History, Pill } from "lucide-react";

// Mock data
const initialPrescriptions = [
    { name: "Metformin 500mg", prescribedBy: "Dr. Carter", date: "01/15/2024" },
    { name: "Lisinopril 20mg", prescribedBy: "Dr. Carter", date: "01/15/2024" },
];

const initialLabReports = [
    { name: "Annual Blood Panel", facility: "General Hospital", date: "03/20/2024" },
    { name: "Cholesterol Check", facility: "City Clinic", date: "11/05/2023" },
];

const initialTreatmentHistory = [
    { name: "Appendectomy", facility: "St. Jude's Hospital", date: "07/10/2015" },
];

export default function HealthRecordsPage() {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [labReports, setLabReports] = useState(initialLabReports);
  const [treatmentHistory, setTreatmentHistory] = useState(initialTreatmentHistory);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddRecord = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const type = formData.get('type') as string;
    const name = formData.get('name') as string;
    const facility = formData.get('facility') as string;
    const date = new Date().toLocaleDateString('en-US'); // Using today's date for simplicity

    const newRecord = { name, facility, prescribedBy: facility, date };

    if (type === 'prescription') {
        setPrescriptions(prev => [newRecord, ...prev]);
    } else if (type === 'lab_report') {
        setLabReports(prev => [newRecord, ...prev]);
    } else if (type === 'treatment_history') {
        setTreatmentHistory(prev => [newRecord, ...prev]);
    }

    toast({
      title: "Record Added",
      description: `Your new ${type.replace('_', ' ')} has been saved.`,
    });
    setIsDialogOpen(false);
  };

  return (
    <AppLayout userType="patient">
      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>My Health Records</CardTitle>
            <CardDescription>
              View and manage your prescriptions, lab reports, and treatment history.
              Keeping this information up-to-date will improve the accuracy of the AI Detailed Analysis.
            </CardDescription>
          </CardHeader>
           <CardContent>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <FilePlus className="mr-2" /> Add New Record
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a New Health Record</DialogTitle>
                  <DialogDescription>
                    Select the type of record and fill in the details below.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddRecord} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Record Type</Label>
                    <Select name="type" required defaultValue="lab_report">
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select record type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prescription">Prescription</SelectItem>
                        <SelectItem value="lab_report">Lab Report</SelectItem>
                        <SelectItem value="treatment_history">Treatment History</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Record Name / Title</Label>
                    <Input id="name" name="name" placeholder="e.g., Annual Blood Panel, Metformin" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facility">Facility / Prescribed By</Label>
                    <Input id="facility" name="facility" placeholder="e.g., General Hospital, Dr. Carter" required />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="details">Additional Details (Optional)</Label>
                    <Textarea id="details" name="details" placeholder="Add any relevant notes or details here." />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save Record</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
           <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2"><Pill /> Prescriptions</CardTitle>
                 <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(true)}><FilePlus className="w-5 h-5 text-muted-foreground" /></Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptions.map((item, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Prescribed by {item.prescribedBy}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2"><FileText /> Lab Reports</CardTitle>
                 <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(true)}><FilePlus className="w-5 h-5 text-muted-foreground" /></Button>
              </CardHeader>
              <CardContent>
                 <div className="space-y-4">
                  {labReports.map((item, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.facility}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

             <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2"><History /> Treatment History</CardTitle>
                 <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(true)}><FilePlus className="w-5 h-5 text-muted-foreground" /></Button>
              </CardHeader>
              <CardContent>
                 <div className="space-y-4">
                  {treatmentHistory.map((item, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.facility}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </AppLayout>
  );
}
