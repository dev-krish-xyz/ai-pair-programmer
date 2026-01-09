/**
 * API Request/Response Types
 */

/**
 * Supported programming languages for code analysis
 */
export type ProgrammingLanguage =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'csharp'
  | 'go'
  | 'rust'
  | 'cpp'
  | 'ruby'
  | 'php'
  | 'other';

/**
 * Request body for POST /api/analyze
 */
export interface AnalyzeRequest {
  code: string;
  language: ProgrammingLanguage;
}

/**
 * Response from POST /api/analyze
 */
export interface AnalyzeResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: ErrorResponse;
  timestamp: string;
  processingTimeMs: number;
}

/**
 * Combined result from all agents
 */
export interface AnalysisResult {
  builder: BuilderResult;
  reviewer: ReviewerResult;
  explainer: ExplainerResult;
}

/**
 * Result from Builder Agent
 */
export interface BuilderResult {
  improvedCode: string;
  summary: string;
}

/**
 * Severity levels for code review issues
 */
export type IssueSeverity = 'critical' | 'warning' | 'suggestion';

/**
 * Individual code review issue
 */
export interface ReviewIssue {
  severity: IssueSeverity;
  title: string;
  description: string;
}

/**
 * Result from Reviewer Agent
 */
export interface ReviewerResult {
  issues: ReviewIssue[];
  strengths: string[];
  summary: string;
}

/**
 * Individual change explanation
 */
export interface ChangeExplanation {
  title: string;
  before: string;
  after: string;
  why: string;
}

/**
 * Result from Explainer Agent
 */
export interface ExplainerResult {
  changes: ChangeExplanation[];
  overallExplanation: string;
  learningPoints: string[];
}

/**
 * Error response structure
 */
export interface ErrorResponse {
  code: string;
  message: string;
  details?: string;
}
