
'use client';

import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, MoreHorizontal, PlusCircle, Upload, Download, Trash2, Eye } from "lucide-react";
import { useState } from "react";

interface Document {
    id: string;
    name: string;
    type: string;
    size: string;
    patientName: string;
    uploadedAt: string;
}

const sampleDocuments: Document[] = [
    { id: '1', name: 'john_doe_mri.pdf', type: 'MRI Scan', size: '5.2 MB', patientName: 'John Doe', uploadedAt: '2024-07-28' },
    { id: '2', name: 'jane_smith_bloodwork.docx', type: 'Lab Report', size: '1.1 MB', patientName: 'Jane Smith', uploadedAt: '2024-07-27' },
    { id: '3', 'name': 'peter_jones_xray.jpg', type: 'X-Ray', size: '2.8 MB', patientName: 'Peter Jones', uploadedAt: '2024-07-25' },
];

export default function DoctorDocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>(sampleDocuments);

    return (
        <AppLayout userType="doctor">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2"><FileText /> Documents</CardTitle>
                        <CardDescription>Manage patient documents and your own files here.</CardDescription>
                    </div>
                    <Button>
                        <Upload className="mr-2"/> Upload Document
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Document Name</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead>Date Uploaded</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents.map(doc => (
                                <TableRow key={doc.id}>
                                    <TableCell className="font-medium">{doc.name}</TableCell>
                                    <TableCell>{doc.patientName}</TableCell>
                                    <TableCell>{doc.type}</TableCell>
                                    <TableCell>{doc.size}</TableCell>
                                    <TableCell>{doc.uploadedAt}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                                            <Button variant="ghost" size="icon"><Download className="w-4 h-4" /></Button>
                                            <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                                        </div>
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
