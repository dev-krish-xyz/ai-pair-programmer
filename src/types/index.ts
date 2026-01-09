export * from './api';

/**
 * UI State for the analysis process
 */
export interface AnalysisState {
  status: 'idle' | 'loading' | 'success' | 'error';
  result: import('./api').AnalysisResult | null;
  error: string | null;
}

/**
 * Tab identifiers for results panel
 */
export type ResultTab = 'builder' | 'reviewer' | 'explainer';
