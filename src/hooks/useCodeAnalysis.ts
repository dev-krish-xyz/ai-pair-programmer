'use client';

import { useState, useCallback } from 'react';
import { AnalysisState, ProgrammingLanguage, AnalyzeResponse } from '@/types';

interface UseCodeAnalysisReturn {
  state: AnalysisState;
  processingTime: number;
  analyze: (code: string, language: ProgrammingLanguage) => Promise<void>;
  reset: () => void;
}

export function useCodeAnalysis(): UseCodeAnalysisReturn {
  const [state, setState] = useState<AnalysisState>({
    status: 'idle',
    result: null,
    error: null,
  });
  const [processingTime, setProcessingTime] = useState(0);

  const analyze = useCallback(async (code: string, language: ProgrammingLanguage) => {
    setState({ status: 'loading', result: null, error: null });
    setProcessingTime(0);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      const data: AnalyzeResponse = await response.json();

      if (data.success && data.data) {
        setState({
          status: 'success',
          result: data.data,
          error: null,
        });
        setProcessingTime(data.processingTimeMs);
      } else {
        setState({
          status: 'error',
          result: null,
          error: data.error?.message || 'An unknown error occurred',
        });
      }
    } catch (error) {
      setState({
        status: 'error',
        result: null,
        error: error instanceof Error ? error.message : 'Failed to analyze code',
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({ status: 'idle', result: null, error: null });
    setProcessingTime(0);
  }, []);

  return { state, processingTime, analyze, reset };
}
