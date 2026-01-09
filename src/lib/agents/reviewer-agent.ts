/**
 * Reviewer Agent - Provides strict code review
 */

import { ReviewerResult, ProgrammingLanguage } from '@/types';
import { callAI } from './ai-client';
import { REVIEWER_PROMPT } from './prompts';

export async function runReviewerAgent(
  code: string,
  language: ProgrammingLanguage
): Promise<ReviewerResult> {
  const userMessage = `Language: ${language}

Code to review:
\`\`\`${language}
${code}
\`\`\``;

  const response = await callAI(REVIEWER_PROMPT, userMessage, {
    temperature: 0.2,
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
      issues: parsed.issues || [],
      strengths: parsed.strengths || [],
      summary: parsed.summary || 'Code review completed.',
    };
  } catch {
    console.error('Failed to parse Reviewer response, using fallback');
    return {
      issues: [],
      strengths: [],
      summary: 'Unable to process review. Please try again.',
    };
  }
}
