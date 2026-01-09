'use client';

import { useState, useEffect } from 'react';
import { useCodeAnalysis } from '@/hooks/useCodeAnalysis';
import { CodeInput, ResultsPanel } from '@/components';
import { Button, Card, Spinner } from '@/components/ui';
import { ProgrammingLanguage } from '@/types';

interface ProviderInfo {
  name: string;
  model: string;
  isFree: boolean;
}

export default function Home() {
  const [showApp, setShowApp] = useState(false);
  const [provider, setProvider] = useState<ProviderInfo | null>(null);
  const { state, processingTime, analyze, reset } = useCodeAnalysis();

  useEffect(() => {
    fetch('/api/provider')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProvider(data.provider);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (code: string, language: ProgrammingLanguage) => {
    await analyze(code, language);
  };

  const handleReset = () => {
    reset();
  };

  // Landing Page
  if (!showApp) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex flex-col">
        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              Built with Blackbox AI ⚡
            </div>

            {/* Hero Text */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Your code.{' '}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Reviewed by 3 AIs.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-xl md:text-2xl text-gray-400 mb-12">
              One writes. One critiques. One explains.
            </p>

            {/* CTA Button */}
            <Button size="lg" onClick={() => setShowApp(true)} className="text-lg px-10 py-4">
              Try the AI Pair Programmer
            </Button>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-20">
              <Card variant="bordered" className="p-6 text-left">
                <div className="text-3xl mb-4">✨</div>
                <h3 className="text-lg font-semibold text-white mb-2">Builder Agent</h3>
                <p className="text-gray-400 text-sm">
                  Refactors your code with best practices, improved readability, and optimized performance.
                </p>
              </Card>

              <Card variant="bordered" className="p-6 text-left">
                <div className="text-3xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-white mb-2">Reviewer Agent</h3>
                <p className="text-gray-400 text-sm">
                  Conducts strict code review, identifying bugs, security issues, and code smells.
                </p>
              </Card>

              <Card variant="bordered" className="p-6 text-left">
                <div className="text-3xl mb-4">📘</div>
                <h3 className="text-lg font-semibold text-white mb-2">Explainer Agent</h3>
                <p className="text-gray-400 text-sm">
                  Explains every change in beginner-friendly language so you learn as you improve.
                </p>
              </Card>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 text-center text-gray-500 text-sm">
          Multi-Agent AI Pair Programmer • Powered by {provider?.name || 'AI'} 
          {provider?.isFree && <span className="ml-2 text-green-400">(Free)</span>}
        </footer>
      </div>
    );
  }

  // App Interface
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => {
              setShowApp(false);
              handleReset();
            }}
            className="flex items-center gap-2 text-white hover:text-violet-400 transition-colors"
          >
            <span className="text-xl font-bold">AI Pair Programmer</span>
          </button>
          <div className="flex items-center gap-4">
            {provider && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className={provider.isFree ? 'text-green-400' : 'text-yellow-400'}>
                  {provider.isFree ? '✓ Free' : '$ Paid'}
                </span>
                <span>{provider.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              3 Agents Ready
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Code Input */}
          <CodeInput onSubmit={handleSubmit} isLoading={state.status === 'loading'} />

          {/* Loading State */}
          {state.status === 'loading' && (
            <Card variant="bordered" className="p-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Spinner size="lg" />
                <div className="text-center">
                  <p className="text-lg font-medium text-white">Agents are analyzing your code...</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Builder and Reviewer working in parallel, then Explainer will summarize
                  </p>
                </div>
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Spinner size="sm" />
                    <span className="text-violet-400">Builder</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Spinner size="sm" />
                    <span className="text-violet-400">Reviewer</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="h-4 w-4 rounded-full border-2 border-gray-700"></span>
                    <span>Explainer</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Error State */}
          {state.status === 'error' && (
            <Card variant="bordered" className="p-6 border-red-500/30 bg-red-500/5">
              <div className="flex items-start gap-4">
                <div className="text-2xl">⚠️</div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-red-400">Analysis Failed</h3>
                  <p className="text-gray-400 mt-1">{state.error}</p>
                  <Button variant="secondary" size="sm" onClick={handleReset} className="mt-4">
                    Try Again
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Results */}
          {state.status === 'success' && state.result && (
            <>
              <ResultsPanel result={state.result} processingTime={processingTime} />
              <div className="flex justify-center">
                <Button variant="secondary" onClick={handleReset}>
                  Analyze Another Code
                </Button>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-800 mt-12">
        Built with Blackbox AI ⚡ • Multi-Agent Architecture
      </footer>
    </div>
  );
}
