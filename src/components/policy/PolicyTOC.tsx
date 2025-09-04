'use client';

import { Heading } from '@/types/policy';

interface PolicyTOCProps {
  headings: Heading[];
  current?: string | null;
  onJump?: (id: string) => void;
}

export default function PolicyTOC({ headings, current, onJump }: PolicyTOCProps) {
  return (
    <nav aria-label="Table of contents" className="text-sm">
      <div className="text-xs font-semibold text-slate-500 mb-2">On this page</div>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id}>
            <button
              className={`block w-full text-left rounded-lg px-2 py-1.5 hover:bg-slate-100 ${
                current === h.id ? 'text-slate-900 font-medium bg-slate-100' : 'text-slate-700'
              }`}
              onClick={() => onJump?.(h.id)}
            >
              {h.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

