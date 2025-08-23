
"use server";

import { symptomAnalysis, SymptomAnalysisInput } from "@/ai/flows/symptom-analysis";
import { detailedAnalysis, DetailedAnalysisInput } from "@/ai/flows/detailed-analysis";
import { prescriptionSuggestion, PrescriptionSuggestionInput } from "@/ai/flows/prescription-suggestion";
import { medicalResearchUpdates } from "@/ai/flows/medical-research-updates";

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

export async function getDetailedAnalysis(input: DetailedAnalysisInput) {
  try {
    const output = await detailedAnalysis(input);
    return { success: true, data: output };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
    return { success: false, error: `Detailed analysis failed: ${errorMessage}` };
  }
}

export async function getPrescriptionSuggestion(input: PrescriptionSuggestionInput) {
  try {
    const output = await prescriptionSuggestion(input);
    return { success: true, data: output };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
    return { success: false, error: `Prescription suggestion failed: ${errorMessage}` };
  }
}

export async function getMedicalResearchUpdates() {
  try {
    const output = await medicalResearchUpdates();
    return { success: true, data: output };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
    return { success: false, error: `Medical research updates failed: ${errorMessage}` };
  }
}
