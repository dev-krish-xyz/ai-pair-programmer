/**
 * POST /api/analyze
 * Main API endpoint for code analysis
 */

import { NextRequest, NextResponse } from 'next/server';
import { AnalyzeRequest, AnalyzeResponse, ProgrammingLanguage } from '@/types';
import { orchestrateAnalysis } from '@/lib/orchestrator';

const VALID_LANGUAGES: ProgrammingLanguage[] = [
  'javascript',
  'typescript',
  'python',
  'java',
  'csharp',
  'go',
  'rust',
  'cpp',
  'ruby',
  'php',
  'other',
];

export async function POST(request: NextRequest): Promise<NextResponse<AnalyzeResponse>> {
  const startTime = Date.now();

  try {
    const body: AnalyzeRequest = await request.json();

    // Validate request
    if (!body.code || typeof body.code !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Code is required and must be a string',
          },
          timestamp: new Date().toISOString(),
          processingTimeMs: Date.now() - startTime,
        },
        { status: 400 }
      );
    }

    if (body.code.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Code cannot be empty',
          },
          timestamp: new Date().toISOString(),
          processingTimeMs: Date.now() - startTime,
        },
        { status: 400 }
      );
    }

    if (body.code.length > 50000) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Code exceeds maximum length of 50,000 characters',
          },
          timestamp: new Date().toISOString(),
          processingTimeMs: Date.now() - startTime,
        },
        { status: 400 }
      );
    }

    const language = body.language || 'other';
    if (!VALID_LANGUAGES.includes(language)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: `Invalid language. Must be one of: ${VALID_LANGUAGES.join(', ')}`,
          },
          timestamp: new Date().toISOString(),
          processingTimeMs: Date.now() - startTime,
        },
        { status: 400 }
      );
    }

    // Check for any API key (Groq, Gemini, or OpenAI)
    const hasApiKey = process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
    if (!hasApiKey) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CONFIGURATION_ERROR',
            message: 'No API key configured. Please set GROQ_API_KEY (free), GEMINI_API_KEY (free), or OPENAI_API_KEY in your .env.local file',
          },
          timestamp: new Date().toISOString(),
          processingTimeMs: Date.now() - startTime,
        },
        { status: 500 }
      );
    }

    // Run orchestrator
    const result = await orchestrateAnalysis(body.code, language);

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
      processingTimeMs: Date.now() - startTime,
    });
  } catch (error) {
    console.error('Analysis error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to analyze code',
          details: errorMessage,
        },
        timestamp: new Date().toISOString(),
        processingTimeMs: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}
