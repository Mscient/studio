
"use client";

import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from "lucide-react";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ShareProfilePage() {
  const [user] = useAuthState(auth);
  const [profileUrl, setProfileUrl] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (user) {
      setProfileUrl(`${window.location.origin}/patient/profile/${user.uid}`);
      const fetchUserData = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserName(docSnap.data().name);
        }
      };
      fetchUserData();
    }
  }, [user]);

  return (
    <AppLayout userType="patient">
      <div className="flex justify-center items-start pt-8">
        <Card className="w-full max-w-md text-center">
            <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    <QrCode className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="mt-4 text-2xl">Share Your Profile</CardTitle>
                <CardDescription>
                    Let your doctor scan this QR code to instantly and securely share your health profile.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6 gap-6">
              {profileUrl ? (
                <div className="p-4 bg-white rounded-lg border shadow-sm">
                  <QRCode value={profileUrl} size={256} />
                </div>
              ) : (
                <div className="w-64 h-64 bg-muted rounded-lg animate-pulse" />
              )}
               {userName && <p className="font-semibold text-lg">{userName}</p>}
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
