
'use client';

import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center gap-2 text-primary">
                <AppLogo className="h-8 w-8" />
                <h1 className="text-3xl font-bold">HealthVision</h1>
            </div>
            <Card className="w-[450px]">
                <CardHeader className="text-center">
                    <CardTitle>Welcome to HealthVision</CardTitle>
                    <CardDescription>
                        Explore the application from the perspective of a patient or a doctor.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <Button asChild size="lg">
                        <Link href="/patient/dashboard">
                            Continue as a Patient
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                         <Link href="/doctor/dashboard">
                            Continue as a Doctor
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
