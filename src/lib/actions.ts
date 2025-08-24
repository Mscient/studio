
"use server";

import { symptomAnalysis, SymptomAnalysisInput } from "@/ai/flows/symptom-analysis";
import { detailedAnalysis, DetailedAnalysisInput } from "@/ai/flows/detailed-analysis";
import { prescriptionSuggestion, PrescriptionSuggestionInput } from "@/ai/flows/prescription-suggestion";
import { medicalResearchUpdates } from "@/ai/flows/medical-research-updates";
import { dailyHealthTrends } from "@/ai/flows/daily-trends";

// Note: In a real app, you would handle errors more gracefully.
// These are simplified to return a success/error state.

export async function getDetailedAnalysis(input: DetailedAnalysisInput) {
  try {
    const output = await detailedAnalysis(input);
    return { success: true, data: output };
  } catch (e: any) {
    console.error("Detailed analysis failed:", e);
    return { success: false, error: e.message || "An unexpected error occurred." };
  }
}

export async function getPrescriptionSuggestion(input: PrescriptionSuggestionInput) {
  try {
    const output = await prescriptionSuggestion(input);
    return { success: true, data: output };
  } catch (e: any) {
    console.error("Prescription suggestion failed:", e);
    return { success: false, error: e.message || "An unexpected error occurred." };
  }
}

export async function getMedicalResearchUpdates() {
  try {
    const output = await medicalResearchUpdates();
    return { success: true, data: output };
  } catch (e: any) {
    console.error("Medical research updates failed:", e);
    return { success: false, error: e.message || "An unexpected error occurred." };
  }
}

export async function getDailyHealthTrends() {
  try {
    const output = await dailyHealthTrends();
    return { success: true, data: output };
  } catch (e: any) {
    console.error("Daily health trends failed:", e);
    return { success: false, error: e.message || "An unexpected error occurred." };
  }
}
