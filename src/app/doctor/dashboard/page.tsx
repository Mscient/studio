import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FilePlus, QrCode, Settings, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const appointments = [
  {
    patient: "Liam Johnson",
    time: "9:00 AM - 9:30 AM",
    status: "Confirmed",
    type: "Video"
  },
  {
    patient: "Olivia Smith",
    time: "10:00 AM - 10:30 AM",
    status: "Confirmed",
    type: "In-Person"
  },
  {
    patient: "Noah Williams",
    time: "11:00 AM - 11:30 AM",
    status: "Pending",
    type: "Video"
  },
    {
    patient: "Emma Brown",
    time: "1:00 PM - 1:30 PM",
    status: "Confirmed",
    type: "Video"
  },
]

export default function DoctorDashboard() {
  return (
    <AppLayout userType="doctor">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Upcoming Appointments</CardDescription>
              <CardTitle className="text-4xl">12</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +2 since last week
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="pb-2">
              <CardDescription>Patients this month</CardDescription>
              <CardTitle className="text-4xl">128</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +15 from last month
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending Requests</CardDescription>
              <CardTitle className="text-4xl">3</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Respond to them now
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="pb-2">
              <CardDescription>Earnings this month</CardDescription>
              <CardTitle className="text-4xl">$5,329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +10.1% from last month
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>
                Here are the appointments scheduled for today.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map(apt => (
                    <TableRow key={apt.patient}>
                      <TableCell>
                        <div className="font-medium">{apt.patient}</div>
                      </TableCell>
                      <TableCell>{apt.time}</TableCell>
                      <TableCell>
                        <Badge variant={apt.type === "Video" ? "default" : "secondary"}>{apt.type}</Badge>
                      </TableCell>
                      <TableCell>
                         <Badge variant={apt.status === "Confirmed" ? "outline" : "destructive"}>{apt.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/doctor/patients" className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <Users className="w-8 h-8 text-primary" />
                <span className="text-center text-sm font-medium">My Patients</span>
              </Link>
              <Link href="#" className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <FilePlus className="w-8 h-8 text-primary" />
                <span className="text-center text-sm font-medium">Write Prescription</span>
              </Link>
              <Link href="/doctor/scan-qr" className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <QrCode className="w-8 h-8 text-primary" />
                <span className="text-center text-sm font-medium">Scan Patient QR</span>
              </Link>
              <Link href="#" className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <Settings className="w-8 h-8 text-primary" />
                <span className="text-center text-sm font-medium">Set Availability</span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
