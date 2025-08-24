
"use client";

import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpRight, Calendar, FileText, HeartPulse, Stethoscope, Video, QrCode, BrainCircuit, Pill, Building, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import QRCode from "qrcode.react";


export default function PatientDashboard() {
  const [user] = useAuthState(auth);
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('Welcome back!');
  const [profileUrl, setProfileUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const generateProfileUrl = () => {
    if (user) {
      const timestamp = new Date().getTime();
      const url = `${window.location.origin}/patient/profile/${user.uid}?ts=${timestamp}`;
      setProfileUrl(url);
    }
  }

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        setLoading(true);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserName(userData.name);
            setGreeting(`Welcome back, ${userData.name.split(' ')[0]}!`);
        }
        setLoading(false);
      };
      fetchUserData();
    } else if (!user && !loading) {
        setLoading(false);
    }
  }, [user, loading]);

  if(loading) {
    return (
        <AppLayout>
            <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center border-b">
              <div className="grid gap-2">
                <CardTitle>{greeting}</CardTitle>
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
                <Stethoscope className="w-7 h-7 text-primary" />
                <span className="text-center text-xs font-medium">Book Doctor</span>
              </Link>
               <Link href="/patient/consult-online" className="flex flex-col items-center justify-center space-y-1 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <Video className="w-7 h-7 text-primary" />
                <span className="text-center text-xs font-medium">Consult Online</span>
              </Link>
              <Link href="/patient/health-records" className="flex flex-col items-center justify-center space-y-1 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <FileText className="w-7 h-7 text-primary" />
                <span className="text-center text-xs font-medium">View Records</span>
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
          <Card className="text-center">
            <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <QrCode className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="mt-2">Share Your Profile</CardTitle>
                <CardDescription>Generate a secure, time-sensitive QR code to share with your doctor.</CardDescription>
            </CardHeader>
            <CardContent>
                <Dialog onOpenChange={(open) => { if (open) { generateProfileUrl() } else { setProfileUrl('') }}}>
                  <DialogTrigger asChild>
                     <Button size="lg">Show My QR Code</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xs">
                    <DialogHeader>
                      <DialogTitle className="text-center">{userName}</DialogTitle>
                      <DialogDescription className="text-center">
                         This code is valid for 2 minutes. Show it to your doctor to share your profile.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center gap-4 py-4">
                        {profileUrl ? (
                            <div className="p-4 bg-white rounded-lg border shadow-sm">
                                <QRCode value={profileUrl} size={220} />
                            </div>
                        ) : (
                            <div className="w-56 h-56 bg-muted rounded-lg animate-pulse" />
                        )}
                    </div>
                  </DialogContent>
                </Dialog>
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
        </div>
      </div>
    </AppLayout>
  );
}
