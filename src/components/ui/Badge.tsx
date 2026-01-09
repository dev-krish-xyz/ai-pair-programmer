import { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'default' | 'critical' | 'warning' | 'suggestion' | 'success';
  children: ReactNode;
  className?: string;
}

export default function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-800 text-gray-300',
    critical: 'bg-red-500/20 text-red-400 border border-red-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    suggestion: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
