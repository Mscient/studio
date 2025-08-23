
"use client";

import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Calendar, FileText, HeartPulse, Stethoscope, Video, QrCode, BrainCircuit, Pill, Building } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";


export default function PatientDashboard() {
  const [profileUrl, setProfileUrl] = useState('');

  useEffect(() => {
    // In a real app, you would fetch the user's unique ID
    const userId = "alex-murray-123"; 
    setProfileUrl(`${window.location.origin}/patient/profile/${userId}`);
  }, []);

  return (
    <AppLayout userType="patient">
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center border-b">
              <div className="grid gap-2">
                <CardTitle>Welcome back, Alex!</CardTitle>
                <CardDescription>
                  Here's your health summary. Ready to take control of your well-being?
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4">
              <Link href="/patient/book-appointment" className="flex flex-col items-center justify-center space-y-1 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <HeartPulse className="w-7 h-7 text-primary" />
                <span className="text-center text-xs font-medium">Book Doctor</span>
              </Link>
              <Link href="/patient/health-records" className="flex flex-col items-center justify-center space-y-1 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <FileText className="w-7 h-7 text-primary" />
                <span className="text-center text-xs font-medium">View Reports</span>
              </Link>
              <Link href="/patient/consult-online" className="flex flex-col items-center justify-center space-y-1 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <Video className="w-7 h-7 text-primary" />
                <span className="text-center text-xs font-medium">Consult Online</span>
              </Link>
              <Link href="/patient/detailed-analysis" className="flex flex-col items-center justify-center space-y-1 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <BrainCircuit className="w-7 h-7 text-primary" />
                <span className="text-center text-xs font-medium">AI Analysis</span>
              </Link>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2 text-xl"><FileText/> Recent Lab Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                  <div>
                      <p className="font-semibold">Annual Blood Panel</p>
                      <p className="text-sm text-muted-foreground">General Hospital</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                      <Link href="/patient/health-records">View</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                      <p className="font-semibold">Cholesterol Check</p>
                      <p className="text-sm text-muted-foreground">City Clinic</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                      <Link href="/patient/health-records">View</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2 text-xl"><Pill/> Current Medications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                  <div>
                      <p className="font-semibold">Metformin</p>
                      <p className="text-sm text-muted-foreground">500mg, for Diabetes</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                      <Link href="/patient/prescriptions">Details</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                      <p className="font-semibold">Lisinopril</p>
                      <p className="text-sm text-muted-foreground">20mg, for Hypertension</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                      <Link href="/patient/prescriptions">Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <QrCode />
                Share Profile
              </CardTitle>
              <CardDescription>
                Show this QR code to your doctor to share your health profile instantly.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-4">
              {profileUrl ? (
                <div className="p-3 bg-white rounded-lg">
                  <QRCode value={profileUrl} size={140} />
                </div>
              ) : (
                <div className="w-36 h-36 bg-muted rounded-lg animate-pulse" />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b">
              <CardTitle>Upcoming Appointments</CardTitle>
              <Link href="/patient/appointments">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-background">
                <div className="p-2 bg-secondary rounded-md">
                  <Calendar className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Dr. Emily Carter</p>
                  <p className="text-sm text-muted-foreground">Tomorrow at 10:00 AM</p>
                </div>
                <Badge variant="default" className="ml-auto">Confirmed</Badge>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-background">
                <div className="p-2 bg-secondary rounded-md">
                  <Calendar className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Dr. Ben Hanson</p>
                  <p className="text-sm text-muted-foreground">July 25, at 2:30 PM</p>
                </div>
                <Badge variant="default" className="ml-auto">Confirmed</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Recent Doctors</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 p-4">
              <div className="flex items-center gap-4">
                <Image src="https://placehold.co/40x40.png" alt="Dr. Carter" width={40} height={40} className="rounded-full" data-ai-hint="woman doctor"/>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Dr. Emily Carter
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Cardiologist
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/patient/book-appointment">Book</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Image src="https://placehold.co/40x40.png" alt="Dr. Hanson" width={40} height={40} className="rounded-full" data-ai-hint="man doctor"/>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Dr. Ben Hanson
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Dermatologist
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/patient/book-appointment">Book</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
