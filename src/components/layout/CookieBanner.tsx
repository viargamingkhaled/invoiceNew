'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'cookie_consent';

type ConsentChoice = 'accepted' | 'rejected';

interface ConsentRecord {
  choice: ConsentChoice;
  ts: number;
  version: number;
}

const CURRENT_VERSION = 1;

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) {
        setVisible(true);
        return;
      }
      const record: ConsentRecord = JSON.parse(raw);
      // Re-show if policy version changed
      if (!record.version || record.version < CURRENT_VERSION) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function save(choice: ConsentChoice) {
    const record: ConsentRecord = { choice, ts: Date.now(), version: CURRENT_VERSION };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-black/10 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-sm text-[#374151] flex-1">
          We use essential cookies to keep the platform running and, with your consent, optional
          analytics cookies to improve the experience. For full details see our{' '}
          <Link href="/cookies" className="underline hover:text-[#0F766E] transition-colors">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => save('rejected')}
            className="px-4 py-2 text-sm rounded-lg border border-black/15 text-[#374151] hover:bg-[#F3F4F6] transition-colors"
          >
            Reject non-essential
          </button>
          <button
            onClick={() => save('accepted')}
            className="px-4 py-2 text-sm rounded-lg bg-[#0F766E] text-white hover:bg-[#0d6660] transition-colors"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
