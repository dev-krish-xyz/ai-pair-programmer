/**
 * Builder Agent - Refactors and improves code
 */

import { BuilderResult, ProgrammingLanguage } from '@/types';
import { callAI } from './ai-client';
import { BUILDER_PROMPT } from './prompts';

export async function runBuilderAgent(
  code: string,
  language: ProgrammingLanguage
): Promise<BuilderResult> {
  const userMessage = `Language: ${language}

Code to improve:
\`\`\`${language}
${code}
\`\`\``;

  const response = await callAI(BUILDER_PROMPT, userMessage, {
    temperature: 0.3,
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
      improvedCode: parsed.improvedCode || code,
      summary: parsed.summary || 'Code has been reviewed and improved.',
    };
  } catch {
    // If parsing fails, try to extract code from the response
    console.error('Failed to parse Builder response, using fallback');
    return {
      improvedCode: code,
      summary: 'Unable to process improvements. Original code returned.',
    };
  }
}
