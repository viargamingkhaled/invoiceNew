'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import Section from '@/components/layout/Section';
import { Card, Input, Button } from '@/components';

export default function SignInClient() {
  const search = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const callbackUrl = search.get('callbackUrl') || '/dashboard';
  const mode = search.get('mode') || 'login';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    });
    setLoading(false);
    if (res?.ok) router.push(callbackUrl);
    else setError('Invalid email or password');
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      <Section className="py-10 max-w-md">
        <Card className="p-6">
          <h1 className="text-xl font-semibold">{mode === 'signup' ? 'Sign up' : 'Log in'}</h1>
          <p className="text-sm text-slate-600 mt-1">Use one of the prepared test accounts.</p>
          <ul className="text-xs text-slate-600 mt-3 list-disc pl-5 space-y-1">
            <li>user-with-tokens@mail.com / password123</li>
            <li>user-without-tokens@mail.com / password123</li>
          </ul>
          {error && (
            <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 text-rose-800 text-sm p-3">{error}</div>
          )}
          <form className="mt-4 grid gap-3" onSubmit={onSubmit}>
            <Input label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <Input label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            <div className="mt-2">
              <Button type="submit" disabled={loading} variant="primary">
                {loading ? (mode === 'signup' ? 'Creating…' : 'Signing in…') : (mode === 'signup' ? 'Create account' : 'Log in')}
              </Button>
            </div>
          </form>
        </Card>
      </Section>
    </main>
  );
}

