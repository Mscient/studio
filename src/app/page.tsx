
"use client";

import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, User } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-3">
            <AppLogo className="h-12 w-12 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary">
              HealthVision
            </h1>
        </div>
        <p className="max-w-xl text-lg text-muted-foreground">
            A next-generation healthcare super-app. Choose your role to explore the features.
        </p>
      </div>

      <div className="mt-12 grid w-full max-w-2xl gap-4 md:grid-cols-2">
        <Link href="/patient/dashboard">
          <Card className="hover:border-primary hover:shadow-lg transition-all">
            <CardHeader className="items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <User className="h-10 w-10 text-primary"/>
              </div>
              <CardTitle className="text-2xl mt-2">Patient</CardTitle>
              <CardDescription>
                Manage your health, book appointments, and consult with doctors online.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/doctor/dashboard">
          <Card className="hover:border-primary hover:shadow-lg transition-all">
            <CardHeader className="items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <Stethoscope className="h-10 w-10 text-primary"/>
              </div>
              <CardTitle className="text-2xl mt-2">Doctor</CardTitle>
              <CardDescription>
                Manage patients, write prescriptions, and collaborate with the medical community.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </main>
  );
}
