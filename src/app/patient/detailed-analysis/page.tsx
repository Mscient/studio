import { AppLayout } from "@/components/app-layout";
import SymptomChecker from "@/components/symptom-checker";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";

export default function DetailedAnalysisPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
                <BrainCircuit className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle>AI Detailed Analysis</CardTitle>
              <CardDescription>
                Upload your health data to receive a detailed AI-powered analysis. This tool can process lab reports, prescriptions, and wearable device data.
                <strong className="block mt-1">This is not a medical diagnosis.</strong> Always consult a healthcare professional for medical advice.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        <SymptomChecker />
      </div>
    </AppLayout>
  );
}
