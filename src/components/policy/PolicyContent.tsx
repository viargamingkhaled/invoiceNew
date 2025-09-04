'use client';

import { PolicySection } from '@/types/policy';
import Card from '@/components/ui/Card';

interface PolicyContentProps {
  sections: PolicySection[];
}

export default function PolicyContent({ sections }: PolicyContentProps) {
  return (
    <Card className="p-6" padding="md">
      {sections.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-24">
          <h2 className="text-xl font-semibold mt-6 first:mt-0">{s.title}</h2>
          {s.body && <p className="mt-2 text-slate-700 text-sm">{s.body}</p>}
        </section>
      ))}
    </Card>
  );
}
