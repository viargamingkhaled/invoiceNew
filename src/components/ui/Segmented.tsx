'use client';

import { ReactNode } from 'react';

type Option = { label: ReactNode; value: string };

interface SegmentedProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Segmented({ options, value, onChange, className = '' }: SegmentedProps) {
  return (
    <div className={`inline-flex rounded-xl border border-black/10 bg-white p-1 ${className}`}>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`px-3 py-1.5 text-sm rounded-lg ${value === o.value ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
          type="button"
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

