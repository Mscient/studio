
'use server';

/**
 * @fileOverview This file defines a Genkit flow for conducting a detailed analysis of a patient's health data.
 *
 * - detailedAnalysis - A function that takes various patient health data points and returns a detailed report.
 * - DetailedAnalysisInput - The input type for the detailedAnalysis function.
 * - DetailedAnalysisOutput - The return type for the detailedAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetailedAnalysisInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A description of the symptoms the patient is experiencing.'),
  labReport: z.string().optional().describe('Text content or file reference from a lab report.'),
  prescription: z
    .string()
    .optional()
    .describe('A list of current medications and dosages, or a file reference.'),
  treatmentHistory: z
    .string()
    .optional()
    .describe('A history of past treatments or surgeries.'),
  nutrition: z
    .string()
    .optional()
    .describe('Information about the patient\'s typical diet and nutrition.'),
  wearableData: z
    .string()
    .optional()
    .describe('Data from wearable devices, like average heart rate or glucose levels.'),
});
export type DetailedAnalysisInput = z.infer<typeof DetailedAnalysisInputSchema>;

const DetailedAnalysisOutputSchema = z.object({
  report: z
    .string()
    .describe(
      'A comprehensive report detailing potential conditions, analysis of provided data, and recommendations.'
    ),
  keyIndicators: z.object({
      bloodSugar: z.string().describe("Patient's blood sugar level, e.g., '150 mg/dL' or 'N/A'"),
      heartRate: z.string().describe("Patient's heart rate, e.g., '75 bpm' or 'N/A'"),
  }),
  urgency: z
    .enum(['self_care', 'routine', 'urgent'])
    .describe(
      'The urgency level of the symptoms, can be self_care, routine, or urgent.'
    ),
  explanation: z
    .string()
    .describe('A brief explanation of why the urgency level was assigned.'),
});
export type DetailedAnalysisOutput = z.infer<typeof DetailedAnalysisOutputSchema>;

export async function detailedAnalysis(input: DetailedAnalysisInput): Promise<DetailedAnalysisOutput> {
  return detailedAnalysisFlow(input);
}

const detailedAnalysisPrompt = ai.definePrompt({
  name: 'detailedAnalysisPrompt',
  input: {schema: DetailedAnalysisInputSchema},
  output: {schema: DetailedAnalysisOutputSchema},
  prompt: `You are an advanced AI medical assistant. Your task is to provide a detailed health analysis based on a comprehensive set of patient data.

  Analyze the following information. Some fields may contain text, while others may reference an uploaded file.
  - Current Symptoms: {{symptoms}}
  {{#if labReport}}- Lab Report Data: {{labReport}}{{/if}}
  {{#if prescription}}- Current Medications: {{prescription}}{{/if}}
  {{#if treatmentHistory}}- Treatment History: {{treatmentHistory}}{{/if}}
  {{#if nutrition}}- Nutrition Details: {{nutrition}}{{/if}}
  {{#if wearableData}}- Wearable Device Data: {{wearableData}}{{/if}}

  Based on a holistic view of all the provided data, generate a detailed report. The report should:
  1.  Synthesize all inputs to identify potential health issues or conditions.
  2.  Discuss how the different data points (symptoms, labs, etc.) correlate.
  3.  Provide clear, actionable next steps or recommendations.
  4.  Extract key health indicators like blood sugar and heart rate from the provided data. If the data is not available, return 'N/A'.
  5.  Determine an overall urgency level (self_care, routine, or urgent) and explain your reasoning.

  The output must be in JSON format. Your report should be thorough but easy for a layperson to understand. Start the report with a summary of your findings.
  `,
});

const detailedAnalysisFlow = ai.defineFlow(
  {
    name: 'detailedAnalysisFlow',
    inputSchema: DetailedAnalysisInputSchema,
    outputSchema: DetailedAnalysisOutputSchema,
  },
  async input => {
    const {output} = await detailedAnalysisPrompt(input);
    return output!;
  }
);

    