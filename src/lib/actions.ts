"use server";

import { symptomAnalysis, SymptomAnalysisInput } from "@/ai/flows/symptom-analysis";

export async function getSymptomAnalysis(input: SymptomAnalysisInput) {
  try {
    const output = await symptomAnalysis(input);
    return { success: true, data: output };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
    return { success: false, error: `Symptom analysis failed: ${errorMessage}` };
  }
}
