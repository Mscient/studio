
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
    uploadedAt: string;
}

const sampleDocuments: Document[] = [
    { id: '1', name: 'cardiology_report_2024.pdf', type: 'Consultation Note', size: '2.1 MB', uploadedAt: '2024-07-20' },
    { id: '2', name: 'mri_scan_brain.zip', type: 'MRI Scan', size: '15.8 MB', uploadedAt: '2024-06-15' },
    { id: '3', name: 'insurance_claim_form.pdf', type: 'Insurance', size: '800 KB', uploadedAt: '2024-05-30' },
];

export default function PatientDocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>(sampleDocuments);

    return (
        <AppLayout>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2"><FileText /> My Documents</CardTitle>
                        <CardDescription>View, upload, and manage your personal health documents.</CardDescription>
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
