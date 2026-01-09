/**
 * Explainer Agent - Explains changes between original and improved code
 */

import { ExplainerResult, ProgrammingLanguage } from '@/types';
import { callAI } from './ai-client';
import { EXPLAINER_PROMPT } from './prompts';

export async function runExplainerAgent(
  originalCode: string,
  improvedCode: string,
  language: ProgrammingLanguage
): Promise<ExplainerResult> {
  const userMessage = `Language: ${language}

ORIGINAL CODE:
\`\`\`${language}
${originalCode}
\`\`\`

IMPROVED CODE:
\`\`\`${language}
${improvedCode}
\`\`\``;

  const response = await callAI(EXPLAINER_PROMPT, userMessage, {
    temperature: 0.4,
    maxTokens: 4096,
  });

  try {
    // Clean the response - remove any markdown code blocks if present
    let cleanedResponse = response.trim();
    if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }
    
    const parsed = JSON.parse(cleanedResponse);
    return {
      changes: parsed.changes || [],
      overallExplanation: parsed.overallExplanation || 'Changes have been explained.',
      learningPoints: parsed.learningPoints || [],
    };
  } catch {
    console.error('Failed to parse Explainer response, using fallback');
    return {
      changes: [],
      overallExplanation: 'Unable to generate explanation. Please try again.',
      learningPoints: [],
    };
  }
}
