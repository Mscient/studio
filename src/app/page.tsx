
'use client';

import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from 'lucide-react';


export default function AuthenticationPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const [role, setRole] = useState('patient');

    const handleProceed = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(() => {
            if (role === 'doctor') {
                router.push('/doctor/dashboard');
            } else {
                router.push('/patient/dashboard');
            }
        });
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center gap-2 text-primary">
                <AppLogo className="h-8 w-8" />
                <h1 className="text-3xl font-bold">HealthVision</h1>
            </div>
            <Tabs defaultValue="register" className="w-[450px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login" disabled>Login</TabsTrigger>
                    <TabsTrigger value="register">Enter Dashboard</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                     <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                This feature is currently disabled. Please use the "Enter Dashboard" tab.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </TabsContent>
                <TabsContent value="register">
                     <form onSubmit={handleProceed}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Enter Dashboard</CardTitle>
                                <CardDescription>
                                   Select a role to explore the application. No login required.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" placeholder="John Doe" defaultValue="John Doe" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="m@example.com" defaultValue="m@example.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" defaultValue="password" required/>
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
                                    Proceed to Dashboard
                                </Button>
                            </CardContent>
                        </Card>
                    </form>
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}
