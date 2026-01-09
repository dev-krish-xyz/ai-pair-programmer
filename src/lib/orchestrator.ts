/**
 * Orchestrator - Coordinates all AI agents
 * 
 * Execution Flow:
 * 1. Builder and Reviewer run in PARALLEL
 * 2. Explainer runs AFTER Builder completes (needs improved code)
 * 3. Results are merged and returned
 */

import { AnalysisResult, ProgrammingLanguage } from '@/types';
import { runBuilderAgent, runReviewerAgent, runExplainerAgent } from './agents';

export async function orchestrateAnalysis(
  code: string,
  language: ProgrammingLanguage
): Promise<AnalysisResult> {
  // Step 1: Run Builder and Reviewer in parallel
  const [builderResult, reviewerResult] = await Promise.all([
    runBuilderAgent(code, language),
    runReviewerAgent(code, language),
  ]);

  // Step 2: Run Explainer with original and improved code
  const explainerResult = await runExplainerAgent(
    code,
    builderResult.improvedCode,
    language
  );

  // Step 3: Return merged results
  return {
    builder: builderResult,
    reviewer: reviewerResult,
    explainer: explainerResult,
  };
}
