import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlus, FileText, History, Pill } from "lucide-react";

export default function HealthRecordsPage() {
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
            <Button>
              <FilePlus className="mr-2" /> Add New Record
            </Button>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
           <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2"><Pill /> Prescriptions</CardTitle>
                 <Button variant="ghost" size="icon"><FilePlus className="w-5 h-5 text-muted-foreground" /></Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">Metformin 500mg</p>
                      <p className="text-sm text-muted-foreground">Prescribed by Dr. Carter</p>
                    </div>
                    <p className="text-sm text-muted-foreground">01/15/2024</p>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">Lisinopril 20mg</p>
                      <p className="text-sm text-muted-foreground">Prescribed by Dr. Carter</p>
                    </div>
                     <p className="text-sm text-muted-foreground">01/15/2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2"><FileText /> Lab Reports</CardTitle>
                 <Button variant="ghost" size="icon"><FilePlus className="w-5 h-5 text-muted-foreground" /></Button>
              </CardHeader>
              <CardContent>
                 <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">Annual Blood Panel</p>
                      <p className="text-sm text-muted-foreground">General Hospital</p>
                    </div>
                    <p className="text-sm text-muted-foreground">03/20/2024</p>
                  </div>
                   <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">Cholesterol Check</p>
                      <p className="text-sm text-muted-foreground">City Clinic</p>
                    </div>
                    <p className="text-sm text-muted-foreground">11/05/2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>

             <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2"><History /> Treatment History</CardTitle>
                 <Button variant="ghost" size="icon"><FilePlus className="w-5 h-5 text-muted-foreground" /></Button>
              </CardHeader>
              <CardContent>
                 <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">Appendectomy</p>
                      <p className="text-sm text-muted-foreground">St. Jude's Hospital</p>
                    </div>
                    <p className="text-sm text-muted-foreground">07/10/2015</p>
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </AppLayout>
  );
}
