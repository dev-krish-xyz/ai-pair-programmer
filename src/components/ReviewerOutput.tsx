'use client';

import { ReviewerResult, IssueSeverity } from '@/types';
import { Card, Badge } from './ui';

interface ReviewerOutputProps {
  result: ReviewerResult;
}

const severityVariant: Record<IssueSeverity, 'critical' | 'warning' | 'suggestion'> = {
  critical: 'critical',
  warning: 'warning',
  suggestion: 'suggestion',
};

export default function ReviewerOutput({ result }: ReviewerOutputProps) {
  return (
    <div className="space-y-4">
      <Card variant="bordered" className="p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-2">Summary</h3>
        <p className="text-gray-200">{result.summary}</p>
      </Card>

      {result.issues.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-3">Issues Found</h3>
          <div className="space-y-3">
            {result.issues.map((issue, index) => (
              <Card key={index} variant="bordered" className="p-4">
                <div className="flex items-start gap-3">
                  <Badge variant={severityVariant[issue.severity]}>
                    {issue.severity.toUpperCase()}
                  </Badge>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-200">{issue.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{issue.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {result.strengths.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-3">Strengths</h3>
          <Card variant="bordered" className="p-4">
            <ul className="space-y-2">
              {result.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-200">
                  <span className="text-green-400 mt-0.5">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      {result.issues.length === 0 && result.strengths.length === 0 && (
        <Card variant="bordered" className="p-6 text-center">
          <p className="text-gray-400">No issues found. Your code looks good!</p>
        </Card>
      )}
    </div>
  );
}
