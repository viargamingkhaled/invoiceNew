'use client';

import { Button, Card, Input } from '@/components';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const initialMode = searchParams.get('mode') === 'login' ? 'login' : 'signup';

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await signIn('email', {
        email,
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      if (res?.ok) {
        setSuccess('Check your email for the magic link to sign in!');
      } else {
        throw new Error('Something went wrong. Please try again.');
      }

    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="shadow-lg">
          <h1 className="text-2xl font-bold text-center">
            {initialMode === 'login' ? 'Sign In' : 'Create Account'}
          </h1>
          <p className="mt-2 text-center text-sm text-slate-600">
            Enter your email to receive a magic link.
          </p>

          {error && <div className="mt-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 text-sm">{error}</div>}
          {success && <div className="mt-4 bg-green-50 border border-green-200 text-green-800 rounded-lg p-3 text-sm">{success}</div>}

          {!success && (
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Continue with Email'}
              </Button>
            </form>
          )}

        </Card>
      </div>
    </div>
  );
}
