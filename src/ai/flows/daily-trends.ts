
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating summaries of daily health trends.
 *
 * - dailyHealthTrends - A function that returns a list of current health trends.
 * - DailyHealthTrend - The type for a single health trend item.
 * - DailyHealthTrendsOutput - The return type for the dailyHealthTrends function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DailyHealthTrendSchema = z.object({
  title: z.string().describe('The catchy title of the health trend.'),
  summary: z.string().describe('A brief, one-sentence summary of the trend.'),
});
export type DailyHealthTrend = z.infer<typeof DailyHealthTrendSchema>;

const DailyHealthTrendsOutputSchema = z.array(DailyHealthTrendSchema);
export type DailyHealthTrendsOutput = z.infer<typeof DailyHealthTrendsOutputSchema>;


export async function dailyHealthTrends(): Promise<DailyHealthTrendsOutput> {
  return dailyHealthTrendsFlow();
}

const dailyHealthTrendsPrompt = ai.definePrompt({
  name: 'dailyHealthTrendsPrompt',
  output: { schema: DailyHealthTrendsOutputSchema },
  prompt: `You are an AI that creates a list of 3 current and important (but fictional) daily health trends for a community of doctors.
  
  The topics should be varied and relevant to general medical practice. Keep the summary very brief.
  
  Example topics:
  - Rise in specific vitamin deficiencies.
  - New telehealth adoption statistics.
  - Impact of a recent heatwave on emergency room visits.

  The output must be in JSON format.
  `,
});

const dailyHealthTrendsFlow = ai.defineFlow(
  {
    name: 'dailyHealthTrendsFlow',
    outputSchema: DailyHealthTrendsOutputSchema,
  },
  async () => {
    const { output } = await dailyHealthTrendsPrompt();
    return output!;
  }
);
