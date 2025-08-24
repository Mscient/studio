
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('patient');
  const router = useRouter();
  const { toast } = useToast();

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>, isRegister: boolean) => {
      event.preventDefault();
      setLoading(true);
      const formData = new FormData(event.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      try {
          if (isRegister) {
              const name = formData.get('name') as string;
              const age = formData.get('age') as string;

              // Create user with email and password
              const userCredential = await createUserWithEmailAndPassword(auth, email, password);
              const user = userCredential.user;
              
              // Add user data to Firestore
              await setDoc(doc(db, 'users', user.uid), {
                  uid: user.uid,
                  name,
                  email,
                  age: parseInt(age),
                  role,
                  createdAt: new Date(),
              });

              toast({ title: 'Registration Successful' });
              router.push(role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
          } else {
              // Sign in user
              const userCredential = await signInWithEmailAndPassword(auth, email, password);
              const user = userCredential.user;

              const userDocRef = doc(db, 'users', user.uid);
              const userDocSnap = await getDoc(userDocRef);

              if (userDocSnap.exists()) {
                  const userRole = userDocSnap.data().role;
                  toast({ title: 'Login Successful' });
                  router.push(userRole === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
              } else {
                  throw new Error("No user data found. Please register first.");
              }
          }
      } catch (error: any) {
          toast({
              variant: 'destructive',
              title: 'Authentication Failed',
              description: error.message,
          });
      } finally {
          setLoading(false);
      }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="flex flex-col items-center gap-4 text-center mb-8">
        <div className="flex items-center gap-3">
            <AppLogo className="h-12 w-12 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary">
              HealthVision
            </h1>
        </div>
        <p className="max-w-xl text-lg text-muted-foreground">
            A next-generation healthcare super-app.
        </p>
      </div>

       <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <form onSubmit={(e) => handleAuth(e, false)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </CardContent>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Create an Account</CardTitle>
              <CardDescription>Choose your role and fill in your details to get started.</CardDescription>
            </CardHeader>
             <form onSubmit={(e) => handleAuth(e, true)}>
              <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">I am a...</Label>
                    <Select value={role} onValueChange={setRole} name="role">
                        <SelectTrigger id="role">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="patient">Patient</SelectItem>
                            <SelectItem value="doctor">Doctor</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" required />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" name="age" type="number" placeholder="e.g. 35" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-register">Email</Label>
                    <Input id="email-register" name="email" type="email" placeholder="m@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-register">Password</Label>
                    <Input id="password-register" name="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                     {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Register
                  </Button>
              </CardContent>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
