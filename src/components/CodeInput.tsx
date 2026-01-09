'use client';

import { useState } from 'react';
import { ProgrammingLanguage } from '@/types';
import { Button, Card } from './ui';

interface CodeInputProps {
  onSubmit: (code: string, language: ProgrammingLanguage) => void;
  isLoading: boolean;
}

const LANGUAGES: { value: ProgrammingLanguage; label: string }[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'cpp', label: 'C++' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'php', label: 'PHP' },
  { value: 'other', label: 'Other' },
];

export default function CodeInput({ onSubmit, isLoading }: CodeInputProps) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<ProgrammingLanguage>('javascript');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onSubmit(code, language);
    }
  };

  return (
    <Card variant="bordered" className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="language" className="text-sm font-medium text-gray-300">
            Select Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value as ProgrammingLanguage)}
            className="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-300 mb-2">
            Paste your code
          </label>
          <textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Paste your code here..."
            className="w-full h-80 bg-gray-950 border border-gray-800 text-gray-200 font-mono text-sm rounded-lg p-4 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none resize-none placeholder-gray-600"
            spellCheck={false}
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {code.length.toLocaleString()} characters
          </p>
          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            disabled={!code.trim() || isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Run Agents'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
