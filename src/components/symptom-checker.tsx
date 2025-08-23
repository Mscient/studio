"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Lightbulb, Loader2, Sparkles, TriangleAlert, Upload, FileText, HeartPulse } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { DetailedAnalysisOutput } from "@/ai/flows/detailed-analysis";
import { getDetailedAnalysis } from "@/lib/actions";
import { Input } from "./ui/input";

const formSchema = z.object({
  symptoms: z.string().min(10, "Please describe your symptoms in more detail.").max(2000),
  labReport: z.any().optional(),
  prescription: z.any().optional(),
  wearableData: z.any().optional(),
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

export default function SymptomChecker() {
  const [analysis, setAnalysis] = useState<DetailedAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    const { symptoms } = data;
    // In a real app, file uploads would be handled properly.
    // For this demo, we'll just pass text content.
    const result = await getDetailedAnalysis({ 
        symptoms,
        labReport: "Blood sugar: 150 mg/dL, Cholesterol: 220 mg/dL",
        prescription: "Metformin 500mg daily",
        wearableData: "Avg heart rate: 75bpm, Avg blood glucose: 130mg/dL",
     });

    if (result.success && result.data) {
      setAnalysis(result.data);
    } else {
      setError(result.error || "An unknown error occurred.");
    }
    setIsLoading(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Provide Health Data</CardTitle>
          <CardDescription>Enter your symptoms and upload any relevant health documents for a more accurate analysis.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Symptoms</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I feel tired all the time, have a frequent urge to urinate, and my vision is sometimes blurry.'"
                        className="min-h-[120px]"
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
                    <FormLabel>Lab Report (Optional)</FormLabel>
                    <FormControl>
                      <Input type="file" disabled />
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
                    <FormLabel>Previous Prescription (Optional)</FormLabel>
                    <FormControl>
                      <Input type="file" disabled/>
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
