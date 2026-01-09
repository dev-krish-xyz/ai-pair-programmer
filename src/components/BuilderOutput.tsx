'use client';

import { BuilderResult } from '@/types';
import { Card, CodeBlock } from './ui';

interface BuilderOutputProps {
  result: BuilderResult;
}

export default function BuilderOutput({ result }: BuilderOutputProps) {
  return (
    <div className="space-y-4">
      <Card variant="bordered" className="p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-2">Summary</h3>
        <p className="text-gray-200">{result.summary}</p>
      </Card>

      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-2">Improved Code</h3>
        <CodeBlock code={result.improvedCode} />
      </div>
    </div>
  );
}
