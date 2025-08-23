
'use client';

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FilePlus, History, Pill, FileText as FileTextIcon, Loader2 } from "lucide-react";

interface HealthRecord {
    id: string;
    name: string;
    facility?: string;
    prescribedBy?: string;
    date: string;
    type: 'prescription' | 'lab_report' | 'treatment_history';
}

const sampleRecords: HealthRecord[] = [
    { id: '1', name: 'Metformin 500mg', prescribedBy: 'Dr. Ben Hanson', date: '2024-07-10', type: 'prescription' },
    { id: '2', name: 'Lisinopril 20mg', prescribedBy: 'Dr. Emily Carter', date: '2024-06-22', type: 'prescription' },
    { id: '3', name: 'Annual Blood Panel', facility: 'General Hospital', date: '2024-05-15', type: 'lab_report' },
    { id: '4', name: 'Cholesterol Check', facility: 'City Clinic', date: '2024-05-15', type: 'lab_report' },
    { id: '5', name: 'Appendectomy', facility: 'St. Jude\'s Medical Center', date: '2015-03-20', type: 'treatment_history' },
];

export default function HealthRecordsPage() {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    // Simulate fetching data
    setTimeout(() => {
      setRecords(sampleRecords.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      setLoading(false);
    }, 500);
  }, []);

  const handleAddRecord = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const type = formData.get('type') as HealthRecord['type'];
    const name = formData.get('name') as string;
    const facility = formData.get('facility') as string;
    const date = new Date().toISOString().split('T')[0];

    const newRecord: HealthRecord = {
      id: (records.length + 1).toString(),
      name,
      date,
      type,
      ...(type === 'prescription' ? { prescribedBy: facility } : { facility }),
    };

    setRecords(prev => [newRecord, ...prev].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

    toast({
      title: "Record Added",
      description: `Your new ${type.replace('_', ' ')} has been saved.`,
    });
    setIsDialogOpen(false);
  };

  const renderList = (type: HealthRecord['type']) => {
      const filteredRecords = records.filter(r => r.type === type);
      return (
        <div className="space-y-4">
            {filteredRecords.length > 0 ? (
                filteredRecords.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.type === 'prescription' ? `Prescribed by ${item.prescribedBy}`: `At ${item.facility}`}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
                ))
            ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No records found.</p>
            )}
        </div>
      );
  }

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

        {loading ? (
             <div className="flex justify-center items-center h-48">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        ) : (
            <div className="grid md:grid-cols-3 gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2"><Pill /> Prescriptions</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(true)}><FilePlus className="w-5 h-5 text-muted-foreground" /></Button>
                </CardHeader>
                <CardContent>{renderList('prescription')}</CardContent>
                </Card>

                <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2"><FileTextIcon /> Lab Reports</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(true)}><FilePlus className="w-5 h-5 text-muted-foreground" /></Button>
                </CardHeader>
                <CardContent>{renderList('lab_report')}</CardContent>
                </Card>

                <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2"><History /> Treatment History</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(true)}><FilePlus className="w-5 h-5 text-muted-foreground" /></Button>
                </CardHeader>
                <CardContent>{renderList('treatment_history')}</CardContent>
                </Card>
            </div>
        )}
      </div>
    </AppLayout>
  );
}
