
'use client';

import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MoreHorizontal, PlusCircle, Siren, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatDistanceToNow } from 'date-fns';

interface EmergencyRequest {
    id: string;
    type: string;
    location: string;
    urgency: "Critical" | "Urgent" | "High";
    posted: any;
    details: string;
}

const urgencyVariantMap = {
    "Critical": "destructive",
    "Urgent": "destructive",
    "High": "default",
} as const;

export default function EmergencyPage() {
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "emergencyRequests"), orderBy("posted", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const requestsData: EmergencyRequest[] = [];
        querySnapshot.forEach((doc) => {
            requestsData.push({ id: doc.id, ...doc.data() } as EmergencyRequest);
        });
        setRequests(requestsData);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handlePostRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newRequest = {
        type: formData.get("type") as string,
        location: formData.get("location") as string,
        urgency: formData.get("urgency") as "Critical" | "Urgent" | "High",
        details: formData.get("details") as string,
        posted: serverTimestamp(),
    };
    
    await addDoc(collection(db, "emergencyRequests"), newRequest);

    setIsNewRequestOpen(false);
    toast({
        title: "Request Posted",
        description: "Your emergency request has been broadcasted.",
    });
  };
  
  const handleOfferAssistance = () => {
    toast({
        title: "Assistance Offered",
        description: "The facility has been notified of your availability.",
    })
  }

  return (
    <AppLayout userType="doctor">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center gap-2"><Siren className="text-destructive"/> Emergency Requests</CardTitle>
                <CardDescription>View and respond to urgent medical needs from nearby facilities.</CardDescription>
            </div>
            <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
              <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2"/> Post New Request
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Post a New Emergency Request</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to broadcast an urgent need to the medical community.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handlePostRequest} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Request Type</Label>
                    <Input id="type" name="type" placeholder="e.g., O- Negative Blood, On-call Neurologist" required/>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" placeholder="e.g., City General Hospital" required/>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency</Label>
                    <Select name="urgency" required defaultValue="Urgent">
                        <SelectTrigger id="urgency">
                            <SelectValue placeholder="Select urgency level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Urgent">Urgent</SelectItem>
                            <SelectItem value="Critical">Critical</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="details">Details</Label>
                    <Textarea id="details" name="details" placeholder="Provide a brief but clear description of the need." required/>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="ghost" onClick={() => setIsNewRequestOpen(false)}>Cancel</Button>
                    <Button type="submit">Post Request</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Request Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                <div className="flex justify-center items-center p-4">
                                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        requests.map(req => (
                        <TableRow key={req.id}>
                            <TableCell className="font-medium">{req.type}</TableCell>
                            <TableCell>{req.location}</TableCell>
                            <TableCell>
                                <Badge variant={urgencyVariantMap[req.urgency] || 'secondary'}>
                                    {req.urgency}
                                </Badge>
                            </TableCell>
                            <TableCell>{req.posted ? formatDistanceToNow(req.posted.toDate(), { addSuffix: true }) : 'Just now'}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                         <Dialog>
                                            <DialogTrigger asChild>
                                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>View Details</DropdownMenuItem>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>{req.type}</DialogTitle>
                                                    <DialogDescription>
                                                        <Badge variant={urgencyVariantMap[req.urgency] || 'secondary'}>
                                                            {req.urgency}
                                                        </Badge>
                                                        <p className="mt-2">Location: <strong>{req.location}</strong></p>
                                                        <p>Posted: {req.posted ? formatDistanceToNow(req.posted.toDate(), { addSuffix: true }) : 'Just now'}</p>
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="py-4">
                                                    <p className="font-semibold">Details:</p>
                                                    <p>{req.details}</p>
                                                </div>
                                                <DialogFooter>
                                                    <Button variant="outline" onClick={handleOfferAssistance}>Offer Assistance</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <DropdownMenuItem onClick={handleOfferAssistance}>Offer Assistance</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
