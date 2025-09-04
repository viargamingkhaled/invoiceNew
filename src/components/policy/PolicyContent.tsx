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
          {s.body && (
            <div className="mt-2 space-y-3 text-slate-700 text-sm">
              {s.body.split('\n\n').map((block, idx) => {
                const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
                const isList = lines.length > 1 && lines.every((l) => l.startsWith('•'));
                if (isList) {
                  return (
                    <ul key={idx} className="list-disc pl-5">
                      {lines.map((l, i) => (
                        <li key={i}>{l.replace(/^•\s?/, '')}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={idx}>{block}</p>;
              })}
            </div>
          )}
        </section>
      ))}
    </Card>
  );
}
