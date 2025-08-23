'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing patient symptoms and providing potential conditions and urgency levels.
 *
 * - symptomAnalysis - A function that takes patient symptoms as input and returns potential conditions and urgency level.
 * - SymptomAnalysisInput - The input type for the symptomAnalysis function.
 * - SymptomAnalysisOutput - The return type for the symptomAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomAnalysisInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A description of the symptoms the patient is experiencing.'),
});
export type SymptomAnalysisInput = z.infer<typeof SymptomAnalysisInputSchema>;

const SymptomAnalysisOutputSchema = z.object({
  topConditions: z
    .array(z.object({label: z.string(), score: z.number()}))
    .describe('An array of potential conditions with a confidence score.'),
  urgency: z
    .enum(['self_care', 'routine', 'urgent'])
    .describe(
      'The urgency level of the symptoms, can be self_care, routine, or urgent.'
    ),
  explanation: z
    .string()
    .describe('A brief explanation of why the urgency level was assigned.'),
});
export type SymptomAnalysisOutput = z.infer<typeof SymptomAnalysisOutputSchema>;

export async function symptomAnalysis(input: SymptomAnalysisInput): Promise<SymptomAnalysisOutput> {
  return symptomAnalysisFlow(input);
}

const symptomAnalysisPrompt = ai.definePrompt({
  name: 'symptomAnalysisPrompt',
  input: {schema: SymptomAnalysisInputSchema},
  output: {schema: SymptomAnalysisOutputSchema},
  prompt: `You are an AI assistant designed to analyze patient symptoms and provide a list of potential conditions and an urgency level.

  Analyze the following symptoms:
  {{symptoms}}

  Based on the symptoms, provide a list of potential conditions with a confidence score, and an urgency level (self_care, routine, or urgent) with a brief explanation.
  The output must be in JSON format.
  `,
});

const symptomAnalysisFlow = ai.defineFlow(
  {
    name: 'symptomAnalysisFlow',
    inputSchema: SymptomAnalysisInputSchema,
    outputSchema: SymptomAnalysisOutputSchema,
  },
  async input => {
    const {output} = await symptomAnalysisPrompt(input);
    return output!;
  }
);
