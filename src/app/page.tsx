
'use client';

import { useState } from 'react';
import { useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlert, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AuthPage() {
  const [tab, setTab] = useState('login');
  const [role, setRole] = useState<'patient' | 'doctor' | ''>('');
  
  const [signInWithEmailAndPassword, , loadingLogin, errorLogin] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, , loadingRegister, errorRegister] = useCreateUserWithEmailAndPassword(auth);
  
  const router = useRouter();
  const { toast } = useToast();

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (tab === 'login') {
      const result = await signInWithEmailAndPassword(email, password);
       if (result) {
        toast({ title: 'Login Successful', description: 'Welcome back!' });
        router.push('/doctor/dashboard'); // Or logic to redirect based on role
      }
    } else { // Register
      const name = formData.get('name') as string;
      const age = formData.get('age') as string;
      
      if (!role) {
          toast({ variant: 'destructive', title: 'Registration Failed', description: 'Please select a role (Patient or Doctor).' });
          return;
      }
      
      const newUser = await createUserWithEmailAndPassword(email, password);
      if (newUser) {
        await setDoc(doc(db, 'users', newUser.user.uid), {
          uid: newUser.user.uid,
          name,
          email,
          role,
          age: parseInt(age),
          createdAt: new Date(),
        });
        toast({ title: 'Registration Successful', description: 'Your account has been created.' });
        router.push(role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard');
      }
    }
  };

  const currentError = tab === 'login' ? errorLogin : errorRegister;
  const isLoading = loadingLogin || loadingRegister;

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center gap-2 text-primary">
            <AppLogo className="h-8 w-8" />
            <h1 className="text-3xl font-bold">HealthVision</h1>
        </div>

        <Tabs defaultValue="login" className="w-[400px]" onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <form onSubmit={handleAuth}>
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>Enter your credentials to access your account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" name="email" type="email" placeholder="m@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" name="password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                    Sign In
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Create an Account</CardTitle>
                  <CardDescription>Fill in the details below to get started.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input id="register-name" name="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input id="register-email" name="email" type="email" placeholder="m@example.com" required />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input id="register-password" name="password" type="password" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="register-age">Age</Label>
                        <Input id="register-age" name="age" type="number" required />
                    </div>
                     <div className="space-y-2">
                        <Label>I am a...</Label>
                        <Select onValueChange={(value) => setRole(value as 'patient' | 'doctor')} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="patient">Patient</SelectItem>
                                <SelectItem value="doctor">Doctor</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                   <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                    Create Account
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
             {currentError && (
              <Alert variant="destructive" className="mt-4">
                <TriangleAlert className="h-4 w-4" />
                <AlertTitle>Authentication Failed</AlertTitle>
                <AlertDescription>
                  {currentError.message}
                </AlertDescription>
              </Alert>
            )}
          </form>
        </Tabs>

      </div>
    </div>
  );
}
