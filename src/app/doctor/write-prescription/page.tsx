
'use client';

import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Bot,
  Calendar,
  FilePlus,
  Loader2,
  Trash2,
  User,
  Plus,
} from 'lucide-react';
import { getPrescriptionSuggestion } from '@/lib/actions';
import type { PrescriptionSuggestionOutput } from '@/ai/flows/prescription-suggestion';
import { useToast } from "@/hooks/use-toast";

const medicineSchema = z.object({
  name: z.string().min(1, 'Medicine name is required.'),
  brand: z.string().optional(),
  dosage: z.string().min(1, 'Dosage is required.'),
  frequency: z.string().min(1, 'Frequency is required.'),
  duration: z.string().min(1, 'Duration is required.'),
  purpose: z.string().min(1, 'Purpose is required.'),
});

const formSchema = z.object({
  patientName: z.string().min(1, 'Patient name is required.'),
  patientAge: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive('Age must be a positive number.')
  ),
  diagnosis: z.string().min(1, 'Diagnosis is required.'),
  symptoms: z.string().min(10, 'Please describe symptoms in detail.'),
  medicines: z.array(medicineSchema),
});

type FormValues = z.infer<typeof formSchema>;

export default function WritePrescriptionPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: '',
      patientAge: 0,
      diagnosis: '',
      symptoms: '',
      medicines: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'medicines',
  });

  const handleGenerateSuggestion = async () => {
    const { symptoms, diagnosis } = form.getValues();
    if (!symptoms || !diagnosis) {
      form.setError('symptoms', { type: 'manual', message: 'Symptoms and diagnosis are required to generate suggestions.' });
      return;
    }
    
    setIsGenerating(true);
    setError(null);

    const result = await getPrescriptionSuggestion({ symptoms, diagnosis });

    if (result.success && result.data) {
      const suggestedMedicines = result.data.medicines.map(med => ({...med}));
      replace(suggestedMedicines);
       toast({
        title: "AI Suggestions Generated",
        description: "The suggested medications have been added to the form.",
      });
    } else {
      setError(result.error || 'An unknown error occurred.');
    }
    setIsGenerating(false);
  };

  const onSubmit = (data: FormValues) => {
    console.log('Prescription submitted:', data);
    // Here you would typically send the data to your backend to save it.
    toast({
        title: "Prescription Saved",
        description: "The new prescription has been saved successfully.",
    });
    form.reset();
  };

  return (
    <AppLayout userType="doctor">
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FilePlus /> AI-Assisted Prescription
            </CardTitle>
            <CardDescription>
              Fill in the patient's details and diagnosis, then let our AI
              suggest a treatment plan. You can review and edit all
              suggestions before finalizing.
            </CardDescription>
          </CardHeader>
        </Card>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Patient and Diagnosis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="patientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center gap-2'><User/> Patient Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Rahul Sharma" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="patientAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center gap-2'><Calendar/> Patient Age</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 28" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <FormField
                  control={form.control}
                  name="symptoms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Symptoms</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the patient's symptoms..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="diagnosis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diagnosis</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Viral Upper Respiratory Infection" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div>
                  <Button
                    type="button"
                    onClick={handleGenerateSuggestion}
                    disabled={isGenerating}
                    className='mt-2'
                  >
                    {isGenerating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Bot className="mr-2 h-4 w-4" />
                    )}
                    {isGenerating ? 'Generating...' : 'Generate AI Suggestions'}
                  </Button>
                   {error && <p className="text-destructive text-sm mt-2">{error}</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Prescribed Medicines</CardTitle>
                    <CardDescription>Review, edit, or manually add medicines below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {fields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-lg relative space-y-4">
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                                onClick={() => remove(index)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>

                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField
                                control={form.control}
                                name={`medicines.${index}.name`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Medicine Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Paracetamol 500 mg" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name={`medicines.${index}.brand`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Brand (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Crocin Advance" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <div className="grid md:grid-cols-3 gap-4">
                               <FormField
                                control={form.control}
                                name={`medicines.${index}.dosage`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Dosage</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., 1 tablet" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name={`medicines.${index}.frequency`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Frequency</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Every 6 hours" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                 <FormField
                                control={form.control}
                                name={`medicines.${index}.duration`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Duration</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., 3 days" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name={`medicines.${index}.purpose`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Purpose</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Reduces fever" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </div>
                        ))}
                    </div>
                     <Button
                        type="button"
                        variant="outline"
                        className="mt-6"
                        onClick={() => append({ name: '', brand: '', dosage: '', frequency: '', duration: '', purpose: '' })}
                        >
                        <Plus className="mr-2 h-4 w-4" /> Add Medicine Manually
                    </Button>
                </CardContent>
            </Card>

            <div className='flex justify-end'>
                <Button type="submit" size="lg">Save Prescription</Button>
            </div>
          </form>
        </Form>
      </div>
    </AppLayout>
  );
}
