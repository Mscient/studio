"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Lightbulb, Loader2, Sparkles, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { SymptomAnalysisOutput } from "@/ai/flows/symptom-analysis";
import { getSymptomAnalysis } from "@/lib/actions";

const formSchema = z.object({
  symptoms: z.string().min(10, "Please describe your symptoms in more detail.").max(1000),
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
  const [analysis, setAnalysis] = useState<SymptomAnalysisOutput | null>(null);
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

    const result = await getSymptomAnalysis(data);
    if (result.success && result.data) {
      setAnalysis(result.data);
    } else {
      setError(result.error || "An unknown error occurred.");
    }
    setIsLoading(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Describe Your Symptoms</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symptoms</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I have a persistent dry cough, a fever of 101°F, and I feel very tired.'"
                        className="min-h-[150px]"
                        {...field}
                      />
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
                    <Bot className="mr-2 h-4 w-4" />
                    Analyze Symptoms
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
                <p className="text-sm text-center text-muted-foreground">Please wait while we analyze your symptoms. This may take a moment.</p>
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
                <CardTitle>Potential Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.topConditions.map((condition) => (
                  <div key={condition.label}>
                    <div className="flex justify-between mb-1">
                      <p className="font-medium">{condition.label.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                      <p className="text-sm text-muted-foreground">{Math.round(condition.score * 100)}% confidence</p>
                    </div>
                    <Progress value={condition.score * 100} />
                  </div>
                ))}
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
