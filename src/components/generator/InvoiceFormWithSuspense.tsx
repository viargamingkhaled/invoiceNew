'use client';

import { Suspense } from 'react';
import InvoiceForm from './InvoiceForm';

interface InvoiceFormWithSuspenseProps {
  signedIn: boolean;
}

// Loading fallback component
function InvoiceFormLoading() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-black/5 p-8">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          
          {/* Form skeleton */}
          <div className="space-y-6">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          
          {/* Button skeleton */}
          <div className="mt-8 h-12 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
}

export default function InvoiceFormWithSuspense({ signedIn }: InvoiceFormWithSuspenseProps) {
  return (
    <Suspense fallback={<InvoiceFormLoading />}>
      <InvoiceForm signedIn={signedIn} />
    </Suspense>
  );
}
