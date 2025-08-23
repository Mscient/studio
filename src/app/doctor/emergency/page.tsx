
import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, Siren } from "lucide-react";
import Link from "next/link";

const emergencyRequests = [
  { id: "er_1", type: "O- Negative Blood", location: "City General Hospital", urgency: "Critical", posted: "15 mins ago" },
  { id: "er_2", type: "On-call Neurologist", location: "St. Luke's Medical Center", urgency: "Urgent", posted: "45 mins ago" },
  { id: "er_3", type: "Portable Ventilator", location: "Community Clinic", urgency: "High", posted: "2 hours ago" },
  { id: "er_4", type: "Kidney Donor (A+)", location: "Metro Health Institute", urgency: "Urgent", posted: "5 hours ago" },
  { id: "er_5", type: "Cardiothoracic Surgeon", location: "City General Hospital", urgency: "Critical", posted: "1 day ago" },
];

const urgencyVariantMap = {
    "Critical": "destructive",
    "Urgent": "destructive",
    "High": "default",
} as const;

export default function EmergencyPage() {
  return (
    <AppLayout userType="doctor">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center gap-2"><Siren className="text-destructive"/> Emergency Requests</CardTitle>
                <CardDescription>View and respond to urgent medical needs from nearby facilities.</CardDescription>
            </div>
            <Button>
                <PlusCircle className="mr-2"/> Post New Request
            </Button>
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
                    {emergencyRequests.map(req => (
                        <TableRow key={req.id}>
                            <TableCell className="font-medium">{req.type}</TableCell>
                            <TableCell>{req.location}</TableCell>
                            <TableCell>
                                <Badge variant={urgencyVariantMap[req.urgency as keyof typeof urgencyVariantMap] || 'secondary'}>
                                    {req.urgency}
                                </Badge>
                            </TableCell>
                            <TableCell>{req.posted}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Offer Assistance</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
