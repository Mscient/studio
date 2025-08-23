
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating summaries of recent medical research.
 *
 * - medicalResearchUpdates - A function that returns a list of recent medical research updates.
 * - MedicalResearchUpdate - The type for a single research update item.
 * - MedicalResearchUpdatesOutput - The return type for the medicalResearchUpdates function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MedicalResearchUpdateSchema = z.object({
  title: z.string().describe('The title of the medical research article or news.'),
  summary: z.string().describe('A concise summary of the research findings or news.'),
  tags: z.array(z.string()).describe('A list of relevant tags (e.g., Cardiology, AI, Oncology).'),
  source: z.string().describe('A fictional source or journal for the research (e.g., "The Lancet AI", "Journal of Innovative Cardiology").'),
});
export type MedicalResearchUpdate = z.infer<typeof MedicalResearchUpdateSchema>;

const MedicalResearchUpdatesOutputSchema = z.array(MedicalResearchUpdateSchema);
export type MedicalResearchUpdatesOutput = z.infer<typeof MedicalResearchUpdatesOutputSchema>;


export async function medicalResearchUpdates(): Promise<MedicalResearchUpdatesOutput> {
  return medicalResearchUpdatesFlow();
}

const medicalResearchUpdatesPrompt = ai.definePrompt({
  name: 'medicalResearchUpdatesPrompt',
  output: { schema: MedicalResearchUpdatesOutputSchema },
  prompt: `You are an AI that summarizes recent, groundbreaking (but fictional) medical research for a community of doctors.

  Generate a list of 4 diverse and interesting medical research updates. Each update should include a compelling title, a clear summary of its importance, a fictional source, and relevant tags. The topics should be varied and cover different medical fields like oncology, AI in medicine, cardiology, neurology, etc.
  
  The output must be in JSON format.
  `,
});

const medicalResearchUpdatesFlow = ai.defineFlow(
  {
    name: 'medicalResearchUpdatesFlow',
    outputSchema: MedicalResearchUpdatesOutputSchema,
  },
  async () => {
    const { output } = await medicalResearchUpdatesPrompt();
    return output!;
  }
);
