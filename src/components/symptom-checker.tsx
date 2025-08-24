
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lightbulb, Loader2, Sparkles, TriangleAlert, BrainCircuit, Activity, Pill, Stethoscope, Carrot, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { DetailedAnalysisOutput } from "@/ai/flows/detailed-analysis";
import { getDetailedAnalysis } from "@/lib/actions";
import { HeartPulse, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  symptoms: z.string().min(10, "Please describe your symptoms in more detail.").max(2000),
  labReport: z.string().optional(),
  prescription: z.string().optional(),
  treatmentHistory: z.string().optional(),
  nutrition: z.string().optional(),
  wearableData: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const UrgencyMap = {
  self_care: {
    label: "Self-Care",
    color: "bg-green-500",
    icon: <Lightbulb className="h-5 w-5 text-green-700" />,
    description: "Manageable at home. Monitor symptoms."
  },
  routine: {
    label: "Routine",
    color: "bg-yellow-500",
    icon: <Sparkles className="h-5 w-5 text-yellow-700" />,
    description: "Consider scheduling a routine doctor's visit."
  },
  urgent: {
    label: "Urgent",
    color: "bg-red-500",
    icon: <TriangleAlert className="h-5 w-5 text-red-700" />,
    description: "Requires prompt medical attention. Contact a doctor soon."
  },
};

const sampleProfileData = {
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    allergies: ['Pollen'],
};

export default function SymptomChecker() {
  const [analysis, setAnalysis] = useState<DetailedAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: "",
      labReport: "",
      prescription: "",
      treatmentHistory: "",
      nutrition: "",
      wearableData: "",
    },
  });

  const handleLoadData = async () => {
    const conditions = (sampleProfileData.conditions || []).join(', ');
    const allergies = (sampleProfileData.allergies || []).join(', ');
    
    let historyText = "";
    if (conditions) historyText += `Existing Conditions: ${conditions}. `;
    if (allergies) historyText += `Allergies: ${allergies}.`;

    form.setValue("treatmentHistory", historyText.trim());

    toast({
        title: "Data Loaded",
        description: "Your existing conditions and allergies have been loaded into the form.",
    });
  }


  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    const result = await getDetailedAnalysis({
        ...data,
        labReport: data.labReport ? `Lab Report: ${data.labReport}` : undefined,
        prescription: data.prescription ? `Current Medications: ${data.prescription}` : undefined,
    });

    if (result.success && result.data) {
      setAnalysis(result.data);
    } else {
      setError(result.error || "An unknown error occurred.");
    }
    setIsLoading(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-4 items-start">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Provide Health Data</CardTitle>
              <CardDescription>Enter your symptoms and any other relevant health information for a more accurate analysis.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleLoadData}>
              <Download className="mr-2 h-4 w-4" />
              Load My Data
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><HeartPulse/> Current Symptoms</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I feel tired all the time, have a frequent urge to urinate, and my vision is sometimes blurry.'"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="labReport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><FileText/> Lab Report Details</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Copy-paste key results from your lab report. e.g., 'HbA1c: 7.8%, Fasting Glucose: 150 mg/dL'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <FormField
                control={form.control}
                name="prescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Pill/> Current Medications</FormLabel>
                    <FormControl>
                      <Textarea placeholder="List your current medications and dosages. e.g., 'Metformin 500mg twice daily'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="treatmentHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Stethoscope/> Medical History</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe any past treatments, surgeries, or known conditions. e.g., 'Appendectomy in 2015, Hypertension'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nutrition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Carrot/> Nutrition Details</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your typical diet. e.g., 'High-protein, low-carb diet. Avoid sugary drinks.'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wearableData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Activity/> Wearable Device Data</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 'Avg heart rate: 75bpm, Avg blood glucose: 130mg/dL, 8000 steps daily'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BrainCircuit className="mr-2 h-4 w-4" />
                    Run Detailed Analysis
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {isLoading && (
            <Card className="flex flex-col items-center justify-center p-8 space-y-4 animate-pulse">
                <Loader2 className="h-12 w-12 text-primary animate-spin"/>
                <p className="text-lg font-medium text-muted-foreground">AI is thinking...</p>
                <p className="text-sm text-center text-muted-foreground">Analyzing your comprehensive health data. This is an advanced check and may take a moment.</p>
            </Card>
        )}
        {error && (
            <Card className="border-destructive bg-destructive/10">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2"><TriangleAlert/> Error</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-destructive">{error}</p>
                </CardContent>
            </Card>
        )}
        {analysis && (
          <>
            <Card className="bg-accent/50 border-accent">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {UrgencyMap[analysis.urgency].icon}
                        <span>Urgency Level: {UrgencyMap[analysis.urgency].label}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p className="font-semibold text-lg">{UrgencyMap[analysis.urgency].description}</p>
                    <p className="text-sm text-muted-foreground"><strong className="text-foreground">Explanation:</strong> {analysis.explanation}</p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Key Health Indicators</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-background">
                        <div className="p-2 bg-primary/10 rounded-full"><FileText className="w-6 h-6 text-primary"/></div>
                        <div>
                            <p className="text-sm text-muted-foreground">Blood Sugar</p>
                            <p className="font-bold text-lg">{analysis.keyIndicators.bloodSugar}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3 p-4 rounded-lg bg-background">
                        <div className="p-2 bg-primary/10 rounded-full"><HeartPulse className="w-6 h-6 text-primary"/></div>
                        <div>
                            <p className="text-sm text-muted-foreground">Heart Rate</p>
                            <p className="font-bold text-lg">{analysis.keyIndicators.heartRate}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm whitespace-pre-wrap">{analysis.report}</p>
                 <p className="text-xs text-muted-foreground pt-4">
                    Disclaimer: This is an AI-generated analysis based on the provided symptoms and is not a substitute for professional medical advice.
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
