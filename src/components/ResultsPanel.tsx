'use client';

import { useState } from 'react';
import { AnalysisResult, ResultTab } from '@/types';
import { Card, Tabs } from './ui';
import BuilderOutput from './BuilderOutput';
import ReviewerOutput from './ReviewerOutput';
import ExplainerOutput from './ExplainerOutput';

interface ResultsPanelProps {
  result: AnalysisResult;
  processingTime: number;
}

const TABS = [
  { id: 'builder', label: '✨ Improved Code' },
  { id: 'reviewer', label: '🔍 Review Notes' },
  { id: 'explainer', label: '📘 Explanation' },
];

export default function ResultsPanel({ result, processingTime }: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState<ResultTab>('builder');

  return (
    <Card variant="bordered" className="overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-800">
        <span className="text-sm text-gray-400">Analysis Results</span>
        <span className="text-xs text-gray-500">
          Completed in {(processingTime / 1000).toFixed(1)}s
        </span>
      </div>
      
      <Tabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as ResultTab)}
      />

      <div className="p-6">
        {activeTab === 'builder' && <BuilderOutput result={result.builder} />}
        {activeTab === 'reviewer' && <ReviewerOutput result={result.reviewer} />}
        {activeTab === 'explainer' && <ExplainerOutput result={result.explainer} />}
      </div>
    </Card>
  );
}
