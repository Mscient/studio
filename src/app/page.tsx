
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { AppLogo } from '@/components/app-logo';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the doctor dashboard since auth is removed
    router.replace('/doctor/dashboard');
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
            <AppLogo className="h-12 w-12 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary">
              HealthVision
            </h1>
        </div>
        <div className='flex items-center gap-2 text-muted-foreground'>
            <Loader2 className="h-5 w-5 animate-spin" />
            <p>Redirecting to the dashboard...</p>
        </div>
      </div>
    </main>
  );
}
