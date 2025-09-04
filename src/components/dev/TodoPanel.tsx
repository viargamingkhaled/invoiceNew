'use client';

import React from 'react';

type Status = 'completed' | 'in_progress' | 'pending';

export interface TodoItem {
  label: string;
  status: Status;
}

interface TodoPanelProps {
  title?: string;
  items: TodoItem[];
  className?: string;
}

const Dot: React.FC<{ status: Status }>= ({ status }) => {
  const map: Record<Status, string> = {
    completed: 'bg-emerald-500',
    in_progress: 'bg-amber-500',
    pending: 'bg-slate-300',
  };
  const cls = `h-2.5 w-2.5 rounded-full ${map[status]} ${status==='in_progress' ? 'animate-pulse motion-reduce:animate-none' : ''}`;
  return <span className={cls} aria-hidden="true" />;
};

export default function TodoPanel({ title = 'TODOs for this section', items, className = '' }: TodoPanelProps) {
  return (
    <div className={`mb-6 rounded-xl border border-dashed border-black/15 p-3 bg-white/70 ${className}`}>
      <div className="text-xs font-semibold text-slate-500 mb-2">{title}</div>
      <ul className="text-sm text-slate-700 grid sm:grid-cols-2 gap-x-4 gap-y-1">
        {items.map((it) => (
          <li key={it.label} className="inline-flex items-center gap-2">
            <Dot status={it.status} />
            <span>{it.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

