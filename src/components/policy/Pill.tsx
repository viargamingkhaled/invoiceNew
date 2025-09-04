'use client';

import { ReactNode } from 'react';

interface PillProps {
  children: ReactNode;
  className?: string;
}

export default function Pill({ children, className = '' }: PillProps) {
  return (
    <span className={`inline-flex items-center rounded-full border border-black/10 bg-white/70 px-2 py-0.5 text-[11px] ${className}`}>
      {children}
    </span>
  );
}

