
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
import { useToast } from '@/hooks/use-toast';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();
  const [role, setRole] = useState('patient');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (event: React.FormEvent, isRegister: boolean) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      if (isRegister) {
        // Registration
        const name = formData.get('name') as string;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user document in Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            email: user.email,
            role: role,
            createdAt: new Date(),
        });
        
        toast({ title: "Registration Successful", description: "You can now log in." });
        router.push(role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');

      } else {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Login Successful" });
        router.push(role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: "Authentication Failed",
        description: error.message,
      });
    } finally {
        setLoading(false);
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

      <Card className="w-full max-w-md shadow-2xl overflow-hidden">
        <Tabs defaultValue="login" className="w-full">
          <CardHeader>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
          </CardHeader>
          <TabsContent value="login">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10" 
              style={{ backgroundImage: 'url(https://i.ibb.co/3s6DkC2/abstract-medical.png)' }} 
              data-ai-hint="abstract medical"
            ></div>
            <form onSubmit={(e) => handleAuth(e, false)}>
              <CardContent className="space-y-4 relative z-10">
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
                  <Input name="email" id="email-login" type="email" placeholder="email@example.com" className="pl-10" required />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input name="password" id="password-login" type="password" placeholder="Password" className="pl-10" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'} <ChevronsRight className="ml-2 h-4 w-4" />
                </Button>
                 <p className="text-center text-sm text-muted-foreground">Or continue with</p>
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" type="button">Google</Button>
                    <Button variant="outline" type="button">Phone</Button>
                </div>
              </CardContent>
            </form>
          </TabsContent>
          <TabsContent value="register">
             <div 
              className="absolute inset-0 bg-cover bg-center opacity-10" 
              style={{ backgroundImage: 'url(https://i.ibb.co/L5YxKCn/digital-health.png)' }}
              data-ai-hint="digital health"
            ></div>
             <form onSubmit={(e) => handleAuth(e, true)}>
              <CardContent className="space-y-4 relative z-10">
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
                  <Input name="name" id="name-register" type="text" placeholder="Full Name" className="pl-10" required />
                </div>
                 <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input name="email" id="email-register" type="email" placeholder="email@example.com" className="pl-10" required />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input name="password" id="password-register" type="password" placeholder="Password" className="pl-10" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input name="age" id="age" type="number" placeholder="Age" className="pl-10" />
                    </div>
                    <Select name="gender">
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
                  <Input name="contact" id="contact" type="tel" placeholder="Contact Number" className="pl-10" />
                </div>
                <div className="relative">
                   <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input name="govtId" id="govt-id" type="text" placeholder="Government ID" className="pl-10" />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'} <ChevronsRight className="ml-2 h-4 w-4" />
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
