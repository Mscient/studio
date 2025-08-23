
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating prescription suggestions.
 *
 * - prescriptionSuggestion - A function that takes patient symptoms and diagnosis to suggest medications.
 * - PrescriptionSuggestionInput - The input type for the prescriptionSuggestion function.
 * - PrescriptionSuggestionOutput - The return type for the prescriptionSuggestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PrescriptionSuggestionInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A detailed description of the patient\'s symptoms.'),
  diagnosis: z.string().describe('The doctor\'s provisional diagnosis.'),
});
export type PrescriptionSuggestionInput = z.infer<typeof PrescriptionSuggestionInputSchema>;

const MedicineSchema = z.object({
    name: z.string().describe('The generic name and strength of the medicine, e.g., "Paracetamol 500 mg"'),
    brand: z.string().optional().describe('The brand name of the medicine, e.g., "Crocin Advance"'),
    dosage: z.string().describe('The amount of medicine to take at one time, e.g., "1 tablet"'),
    frequency: z.string().describe('How often the medicine should be taken, e.g., "Every 6 hours"'),
    duration: z.string().describe('For how long the medicine should be taken, e.g., "3 days"'),
    purpose: z.string().describe('The reason for prescribing this medicine, e.g., "Reduces fever and body ache"'),
});

const PrescriptionSuggestionOutputSchema = z.object({
  medicines: z.array(MedicineSchema).describe('A list of suggested medicines for the given diagnosis and symptoms.'),
});
export type PrescriptionSuggestionOutput = z.infer<typeof PrescriptionSuggestionOutputSchema>;

export async function prescriptionSuggestion(input: PrescriptionSuggestionInput): Promise<PrescriptionSuggestionOutput> {
  return prescriptionSuggestionFlow(input);
}

const prescriptionSuggestionPrompt = ai.definePrompt({
  name: 'prescriptionSuggestionPrompt',
  input: { schema: PrescriptionSuggestionInputSchema },
  output: { schema: PrescriptionSuggestionOutputSchema },
  prompt: `You are an AI assistant for doctors. Your role is to suggest a list of common, first-line medications based on a patient's symptoms and a provisional diagnosis. Your suggestions should be safe, standard, and evidence-based. Do not suggest controlled substances or highly specialized drugs.

  Patient Information:
  - Symptoms: {{symptoms}}
  - Diagnosis: {{diagnosis}}

  Based on this information, please provide a list of suggested medicines. For each medicine, include the name, a common brand name (if applicable), dosage, frequency, duration, and the purpose of the medication.
  
  The output must be in JSON format.
  `,
});

const prescriptionSuggestionFlow = ai.defineFlow(
  {
    name: 'prescriptionSuggestionFlow',
    inputSchema: PrescriptionSuggestionInputSchema,
    outputSchema: PrescriptionSuggestionOutputSchema,
  },
  async input => {
    const { output } = await prescriptionSuggestionPrompt(input);
    return output!;
  }
);
