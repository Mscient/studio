
"use client";

import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Calendar, FileText, HeartPulse, Stethoscope, Video, QrCode, BrainCircuit, Pill } from "lucide-react";
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
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Welcome back, Alex!</CardTitle>
                <CardDescription>
                  Here's your health summary. Ready to take control of your well-being?
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/patient/book-appointment" className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <HeartPulse className="w-8 h-8 text-primary" />
                <span className="text-center text-sm font-medium">Book Doctor</span>
              </Link>
              <Link href="/patient/prescriptions" className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <FileText className="w-8 h-8 text-primary" />
                <span className="text-center text-sm font-medium">View Reports</span>
              </Link>
              <Link href="#" className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <Video className="w-8 h-8 text-primary" />
                <span className="text-center text-sm font-medium">Consult Online</span>
              </Link>
              <Link href="/patient/detailed-analysis" className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <BrainCircuit className="w-8 h-8 text-primary" />
                <span className="text-center text-sm font-medium">AI Detailed Analysis</span>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Health Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <Image src="https://placehold.co/100x100.png" alt="Healthy Food" width={80} height={80} className="rounded-lg" data-ai-hint="healthy food"/>
                <div>
                  <h3 className="font-semibold">Eat a Balanced Diet</h3>
                  <p className="text-sm text-muted-foreground">Incorporate a variety of fruits, vegetables, and whole grains into your meals for better health.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                 <Image src="https://placehold.co/100x100.png" alt="Exercise" width={80} height={80} className="rounded-lg" data-ai-hint="person jogging"/>
                 <div>
                  <h3 className="font-semibold">Stay Active</h3>
                  <p className="text-sm text-muted-foreground">Aim for at least 30 minutes of moderate exercise most days of the week.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode />
                Share Profile
              </CardTitle>
              <CardDescription>
                Show this QR code to your doctor to share your health profile instantly.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              {profileUrl ? (
                <div className="p-4 bg-white rounded-lg">
                  <QRCode value={profileUrl} size={160} />
                </div>
              ) : (
                <div className="w-40 h-40 bg-muted rounded-lg animate-pulse" />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Appointments</CardTitle>
              <Link href="/patient/appointments">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-background">
                <div className="p-3 bg-secondary rounded-full">
                  <Calendar className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Dr. Emily Carter</p>
                  <p className="text-sm text-muted-foreground">Cardiology</p>
                  <p className="text-sm text-muted-foreground">Tomorrow at 10:00 AM</p>
                </div>
                <Badge variant="default" className="ml-auto">Confirmed</Badge>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-background">
                <div className="p-3 bg-secondary rounded-full">
                  <Calendar className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Dr. Ben Hanson</p>
                  <p className="text-sm text-muted-foreground">Dermatology</p>
                  <p className="text-sm text-muted-foreground">July 25, 2024 at 2:30 PM</p>
                </div>
                <Badge variant="default" className="ml-auto">Confirmed</Badge>
              </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill />
                Current Medications
              </CardTitle>
               <CardDescription>
                A quick look at your current prescriptions.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                    <p className="font-semibold">Metformin</p>
                    <p className="text-sm text-muted-foreground">500mg, twice a day</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                    <Link href="/patient/health-records">View</Link>
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                    <p className="font-semibold">Lisinopril</p>
                    <p className="text-sm text-muted-foreground">20mg, once a day</p>
                </div>
                 <Button variant="outline" size="sm" asChild>
                    <Link href="/patient/health-records">View</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Doctors</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4">
                <Image src="https://placehold.co/40x40.png" alt="Dr. Carter" width={40} height={40} className="rounded-full" data-ai-hint="doctor portrait"/>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Dr. Emily Carter
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Cardiologist
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/patient/book-appointment">Book Again</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Image src="https://placehold.co/40x40.png" alt="Dr. Hanson" width={40} height={40} className="rounded-full" data-ai-hint="doctor portrait"/>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Dr. Ben Hanson
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Dermatologist
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/patient/book-appointment">Book Again</Link>
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
