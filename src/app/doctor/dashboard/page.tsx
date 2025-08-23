
import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FilePlus, MessageSquare, QrCode, Users, Siren, Lightbulb, Sparkles, TriangleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const appointments = [
  {
    id: "apt_1",
    patient: "Liam Johnson",
    time: "9:00 AM - 9:30 AM",
    status: "Confirmed",
    type: "Video",
    urgency: "routine"
  },
  {
    id: "apt_2",
    patient: "Olivia Smith",
    time: "10:00 AM - 10:30 AM",
    status: "Confirmed",
    type: "In-Person",
    urgency: "self_care"
  },
  {
    id: "apt_3",
    patient: "Noah Williams",
    time: "11:00 AM - 11:30 AM",
    status: "Pending",
    type: "Video",
    urgency: "urgent"
  },
    {
    id: "apt_4",
    patient: "Emma Brown",
    time: "1:00 PM - 1:30 PM",
    status: "Confirmed",
    type: "Video",
    urgency: "routine"
  },
]

const UrgencyMap = {
  self_care: {
    label: "Self-Care",
    icon: <Lightbulb className="h-4 w-4 text-green-700" />,
    badgeClass: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100"
  },
  routine: {
    label: "Routine",
    icon: <Sparkles className="h-4 w-4 text-amber-700" />,
    badgeClass: "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100"
  },
  urgent: {
    label: "Urgent",
    icon: <TriangleAlert className="h-4 w-4 text-red-700" />,
    badgeClass: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100"
  },
};

export default function DoctorDashboard() {
  return (
    <AppLayout userType="doctor">
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
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
              <CardDescription>Emergency Requests</CardDescription>
              <CardTitle className="text-4xl">5</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <Link href="/doctor/emergency" className="hover:underline">View critical needs</Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>
                Here are the appointments scheduled for today, with AI-assessed urgency levels.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>AI Urgency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map(apt => (
                    <TableRow key={apt.patient}>
                      <TableCell>
                        <div className="font-medium">{apt.patient}</div>
                        <div className="text-sm text-muted-foreground">{apt.type}</div>
                      </TableCell>
                      <TableCell>{apt.time}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`flex items-center gap-2 ${UrgencyMap[apt.urgency as keyof typeof UrgencyMap].badgeClass}`}>
                            {UrgencyMap[apt.urgency as keyof typeof UrgencyMap].icon}
                            {UrgencyMap[apt.urgency as keyof typeof UrgencyMap].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                         <Badge variant={apt.status === "Confirmed" ? "outline" : "destructive"}>{apt.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" asChild>
                          <Link href={`/doctor/appointments/${apt.id}`}>View</Link>
                        </Button>
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
            <CardContent className="grid grid-cols-2 gap-2">
              <Link href="/doctor/patients" className="flex flex-col items-center justify-center space-y-1 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <Users className="w-7 h-7 text-primary" />
                <span className="text-center text-xs font-medium">My Patients</span>
              </Link>
              <Link href="/doctor/write-prescription" className="flex flex-col items-center justify-center space-y-1 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <FilePlus className="w-7 h-7 text-primary" />
                <span className="text-center text-xs font-medium">Write Prescription</span>
              </Link>
              <Link href="/doctor/scan-qr" className="flex flex-col items-center justify-center space-y-1 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <QrCode className="w-7 h-7 text-primary" />
                <span className="text-center text-xs font-medium">Scan Patient QR</span>
              </Link>
              <Link href="/doctor/community" className="flex flex-col items-center justify-center space-y-1 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <MessageSquare className="w-7 h-7 text-primary" />
                <span className="text-center text-xs font-medium">Community</span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
