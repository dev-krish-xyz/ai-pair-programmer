'use client';

import { ExplainerResult } from '@/types';
import { Card } from './ui';

interface ExplainerOutputProps {
  result: ExplainerResult;
}

export default function ExplainerOutput({ result }: ExplainerOutputProps) {
  return (
    <div className="space-y-4">
      <Card variant="bordered" className="p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-2">Overview</h3>
        <p className="text-gray-200">{result.overallExplanation}</p>
      </Card>

      {result.changes.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-3">Changes Explained</h3>
          <div className="space-y-4">
            {result.changes.map((change, index) => (
              <Card key={index} variant="bordered" className="p-4">
                <h4 className="font-medium text-violet-400 mb-3">{change.title}</h4>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-2">Before</p>
                    <div className="bg-gray-950 rounded-lg p-3 border border-gray-800">
                      <code className="text-sm text-red-400 font-mono">{change.before}</code>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-2">After</p>
                    <div className="bg-gray-950 rounded-lg p-3 border border-gray-800">
                      <code className="text-sm text-green-400 font-mono">{change.after}</code>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-sm text-gray-300">
                    <span className="text-gray-500">Why: </span>
                    {change.why}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {result.learningPoints.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-3">Key Takeaways</h3>
          <Card variant="bordered" className="p-4">
            <ul className="space-y-2">
              {result.learningPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-200">
                  <span className="text-violet-400 mt-0.5">→</span>
                  {point}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      {result.changes.length === 0 && (
        <Card variant="bordered" className="p-6 text-center">
          <p className="text-gray-400">No significant changes were made to the code.</p>
        </Card>
      )}
    </div>
  );
}
