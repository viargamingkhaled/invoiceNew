'use client';

import { ReactNode } from 'react';

interface LabelProps {
  htmlFor: string;
  children: ReactNode;
  className?: string;
}

export default function Label({ htmlFor, children, className = '' }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={`text-xs font-medium text-slate-700 ${className}`}>
      {children}
    </label>
  );
}

