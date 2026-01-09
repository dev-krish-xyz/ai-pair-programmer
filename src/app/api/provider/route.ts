/**
 * GET /api/provider
 * Returns current AI provider information
 */

import { NextResponse } from 'next/server';
import { getProviderInfo } from '@/lib/agents';

export async function GET() {
  const providerInfo = getProviderInfo();
  
  return NextResponse.json({
    success: true,
    provider: providerInfo,
  });
}
