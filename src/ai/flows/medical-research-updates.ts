
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
  title: z.string().describe('The compelling title of the medical research article or news.'),
  summary: z.string().describe('A detailed summary of the research, explaining its background, methods, and importance.'),
  keyFindings: z.array(z.string()).describe('A list of the most important, specific findings from the study.'),
  implications: z.string().describe('Practical implications of the research for clinical practice or future studies.'),
  tags: z.array(z.string()).describe('A list of relevant tags (e.g., Cardiology, AI, Oncology, Neurology).'),
  source: z.string().describe('A fictional source or journal for the research (e.g., "The Lancet AI", "Journal of Innovative Cardiology").'),
  publicationDate: z.string().describe('A fictional publication date in "Month YYYY" format (e.g., "July 2024").'),
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
  prompt: `You are an AI that creates detailed summaries of recent, groundbreaking (but fictional) medical research for a community of doctors.

  Generate a list of 4 diverse and interesting medical research updates. Each update must be a rich, valuable resource.
  
  For each update, provide:
  1. A compelling title.
  2. A detailed summary covering the study's background, methodology, and significance.
  3. A bulleted list of key findings.
  4. A section on the practical implications for clinicians.
  5. A fictional, recent publication date (e.g., "July 2024").
  6. A fictional source (e.g., "The Lancet AI").
  7. Relevant tags (e.g., Cardiology, AI in Medicine, Oncology).
  
  The topics should be varied and cover different medical fields. The output must be in JSON format.
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
