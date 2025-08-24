
'use client';

import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { useState, useTransition, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function AuthenticationPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const [role, setRole] = useState('patient');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    const handleAuth = async (e: React.FormEvent, isRegister: boolean) => {
        e.preventDefault();
        startTransition(async () => {
            try {
                if (isRegister) {
                    // Register User
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;
                    
                    // Save user role and name in Firestore
                    await setDoc(doc(db, "users", user.uid), {
                        name: name,
                        role: role,
                        email: email,
                    });
                    
                    toast({ title: "Registration Successful", description: "You are now logged in." });
                    redirectUser(user.uid, role);

                } else {
                    // Login User
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;
                    
                    // Get user role from Firestore
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        toast({ title: "Login Successful", description: "Welcome back!" });
                        redirectUser(user.uid, userData.role);
                    } else {
                        throw new Error("User data not found. Please register.");
                    }
                }
            } catch (error: any) {
                toast({
                    variant: "destructive",
                    title: "Authentication Failed",
                    description: error.message || "An unexpected error occurred.",
                });
            }
        });
    };

    const redirectUser = (uid: string, userRole: string) => {
        if (userRole === 'doctor') {
            router.push('/doctor/dashboard');
        } else {
            router.push('/patient/dashboard');
        }
    }


  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center gap-2 text-primary">
                <AppLogo className="h-8 w-8" />
                <h1 className="text-3xl font-bold">HealthVision</h1>
            </div>
            {isClient && (
            <Tabs defaultValue="login" className="w-[450px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                     <form onSubmit={(e) => handleAuth(e, false)}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>
                                    Welcome back. Please login to your account.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="login-email">Email</Label>
                                    <Input id="login-email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="login-password">Password</Label>
                                    <Input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                </div>
                            </CardContent>
                            <CardContent>
                                 <Button type="submit" className="w-full" disabled={isPending}>
                                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Login
                                </Button>
                            </CardContent>
                        </Card>
                    </form>
                </TabsContent>
                <TabsContent value="register">
                     <form onSubmit={(e) => handleAuth(e, true)}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Register</CardTitle>
                                <CardDescription>
                                   Create a new account to get started.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="register-email">Email</Label>
                                    <Input id="register-email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="register-password">Password</Label>
                                    <Input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Your Role</Label>
                                    <Select name="role" required value={role} onValueChange={setRole}>
                                        <SelectTrigger id="role">
                                            <SelectValue placeholder="Select your role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="patient">Patient</SelectItem>
                                            <SelectItem value="doctor">Doctor</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                            <CardContent>
                                 <Button type="submit" className="w-full" disabled={isPending}>
                                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Create Account
                                </Button>
                            </CardContent>
                        </Card>
                    </form>
                </TabsContent>
            </Tabs>
            )}
        </div>
    </div>
  );
}
