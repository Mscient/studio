import { AppLayout } from "@/components/app-layout";
import SymptomChecker from "@/components/symptom-checker";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

export default function SymptomCheckerPage() {
  return (
    <AppLayout userType="patient">
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
                <Bot className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle>AI-Powered Symptom Checker</CardTitle>
              <CardDescription>
                Describe your symptoms, and our AI will provide potential insights. 
                <strong className="block">This is not a medical diagnosis.</strong> Always consult a healthcare professional.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        <SymptomChecker />
      </div>
    </AppLayout>
  );
}
