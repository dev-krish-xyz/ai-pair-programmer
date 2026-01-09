/**
 * Unified AI Client - Supports multiple providers
 * - Groq (FREE) - Llama 3 models
 * - Google Gemini (FREE) - Gemini models
 * - OpenAI (PAID) - GPT models
 */

type AIProvider = 'groq' | 'gemini' | 'openai';

function getProvider(): AIProvider {
  if (process.env.GROQ_API_KEY) return 'groq';
  if (process.env.GEMINI_API_KEY) return 'gemini';
  if (process.env.OPENAI_API_KEY) return 'openai';
  throw new Error('No API key configured. Please set GROQ_API_KEY (free), GEMINI_API_KEY (free), or OPENAI_API_KEY in your .env.local file');
}

/**
 * Groq API - FREE tier with Llama 3
 * https://console.groq.com/keys
 */
async function callGroq(systemPrompt: string, userMessage: string, temperature: number): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}

/**
 * Google Gemini API - FREE tier
 * https://aistudio.google.com/app/apikey
 */
async function callGemini(systemPrompt: string, userMessage: string, temperature: number): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: `${systemPrompt}\n\n${userMessage}` }
            ]
          }
        ],
        generationConfig: {
          temperature,
          maxOutputTokens: 4096,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

/**
 * OpenAI API - PAID
 * https://platform.openai.com/api-keys
 */
async function callOpenAI(systemPrompt: string, userMessage: string, temperature: number): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}

/**
 * Main AI call function - automatically selects provider based on available API keys
 * Priority: Groq (free) > Gemini (free) > OpenAI (paid)
 */
export async function callAI(
  systemPrompt: string,
  userMessage: string,
  options: {
    temperature?: number;
    maxTokens?: number;
  } = {}
): Promise<string> {
  const provider = getProvider();
  const { temperature = 0.3 } = options;

  console.log(`Using AI provider: ${provider}`);

  switch (provider) {
    case 'groq':
      return callGroq(systemPrompt, userMessage, temperature);
    case 'gemini':
      return callGemini(systemPrompt, userMessage, temperature);
    case 'openai':
      return callOpenAI(systemPrompt, userMessage, temperature);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

/**
 * Get current provider info for display
 */
export function getProviderInfo(): { name: string; model: string; isFree: boolean } {
  try {
    const provider = getProvider();
    switch (provider) {
      case 'groq':
        return {
          name: 'Groq',
          model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
          isFree: true,
        };
      case 'gemini':
        return {
          name: 'Google Gemini',
          model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
          isFree: true,
        };
      case 'openai':
        return {
          name: 'OpenAI',
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          isFree: false,
        };
    }
  } catch {
    return { name: 'Not configured', model: 'N/A', isFree: false };
  }
}
