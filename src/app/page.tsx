
'use client';

import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, User } from 'lucide-react';
import Link from 'next/link';

export default function RoleSelectionPage() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center gap-2 text-primary">
            <AppLogo className="h-8 w-8" />
            <h1 className="text-3xl font-bold">HealthVision</h1>
        </div>

        <Card className="w-[450px]">
          <CardHeader className="text-center">
            <CardTitle>Explore the Application</CardTitle>
            <CardDescription>Choose a role to experience the dedicated dashboard and features.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 p-6">
              <Link href="/doctor/dashboard" className="w-full">
                <div className="flex flex-col items-center justify-center space-y-3 p-6 rounded-lg bg-accent hover:bg-accent/80 transition-colors h-full border">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <Stethoscope className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-center text-lg font-semibold">Doctor</span>
                </div>
              </Link>
              <Link href="/patient/dashboard" className="w-full">
                <div className="flex flex-col items-center justify-center space-y-3 p-6 rounded-lg bg-accent hover:bg-accent/80 transition-colors h-full border">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <User className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-center text-lg font-semibold">Patient</span>
                </div>
              </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
