import { Suspense } from 'react';
import SignInClient from './SignInClient';

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center text-slate-500">Loading…</div>}>
      <SignInClient />
    </Suspense>
  );
}
