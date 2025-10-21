'use client';

import React from 'react';

type TemplatePreviewProps = {
  children: React.ReactNode;
};

export default function TemplatePreview({ children }: TemplatePreviewProps) {
  return (
    <div className="min-h-[600px] flex items-start justify-center" data-template-preview>
      <div className="w-full overflow-x-auto overflow-y-auto max-h-[800px]">
        <div className="mx-auto">{children}</div>
      </div>
      <style>{`
        @media screen {
          [data-template-preview] #print-area,
          [data-template-preview] #dash-print-area {
            display: block !important;
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}

