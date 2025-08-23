
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stethoscope, User, Mail, Lock, Building, Phone, Calendar, ChevronsRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppLogo } from '@/components/app-logo';

export default function Home() {
  const router = useRouter();
  const [role, setRole] = useState('patient');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, you'd handle authentication here.
    // For this demo, we'll just redirect based on the selected role.
    if (role === 'patient') {
      router.push('/patient/dashboard');
    } else {
      router.push('/doctor/dashboard');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <div className="flex items-center gap-2 mb-2">
            <AppLogo className="h-10 w-10 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            HealthVision
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">Your Health, Reimagined.</p>
      </div>

      <Card className="w-full max-w-md shadow-2xl">
        <Tabs defaultValue="login" className="w-full">
          <CardHeader>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
          </CardHeader>
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">I am a</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger id="role" className="w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" /> Patient
                        </div>
                      </SelectItem>
                      <SelectItem value="doctor">
                         <div className="flex items-center gap-2">
                          <Stethoscope className="h-4 w-4" /> Doctor
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email-login" type="email" placeholder="email@example.com" className="pl-10" required />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password-login" type="password" placeholder="Password" className="pl-10" required />
                </div>
                <Button type="submit" className="w-full">
                  Login <ChevronsRight className="ml-2 h-4 w-4" />
                </Button>
                 <p className="text-center text-sm text-muted-foreground">Or continue with</p>
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline">Google</Button>
                    <Button variant="outline">Phone</Button>
                </div>
              </CardContent>
            </form>
          </TabsContent>
          <TabsContent value="register">
             <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role-register">I am a</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger id="role-register" className="w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                       <SelectItem value="patient">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" /> Patient
                        </div>
                      </SelectItem>
                      <SelectItem value="doctor">
                         <div className="flex items-center gap-2">
                          <Stethoscope className="h-4 w-4" /> Doctor
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative">
                   <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="name-register" type="text" placeholder="Full Name" className="pl-10" required />
                </div>
                 <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email-register" type="email" placeholder="email@example.com" className="pl-10" required />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password-register" type="password" placeholder="Password" className="pl-10" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="age" type="number" placeholder="Age" className="pl-10" />
                    </div>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                <div className="relative">
                   <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="contact" type="tel" placeholder="Contact Number" className="pl-10" />
                </div>
                <div className="relative">
                   <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="govt-id" type="text" placeholder="Government ID" className="pl-10" />
                </div>

                <Button type="submit" className="w-full">
                  Register <ChevronsRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
       <p className="mt-8 text-center text-xs text-muted-foreground">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </main>
  );
}
