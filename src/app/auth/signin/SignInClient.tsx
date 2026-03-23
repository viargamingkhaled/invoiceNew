'use client';

import { Button, Card, Input } from '@/components';
import Section from '@/components/layout/Section';
import Select from '@/components/ui/Select';
import { SIGNUP_COUNTRIES } from '@/lib/signup-countries';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

type SignupFormState = {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  addressLine1: string;
  city: string;
  country: string;
  postalCode: string;
  acceptedPolicies: boolean;
};

type SignupField = keyof SignupFormState;
type SignupErrors = Partial<Record<SignupField, string>>;

const initialSignupForm: SignupFormState = {
  name: '',
  surname: '',
  email: '',
  password: '',
  phoneNumber: '',
  dateOfBirth: '',
  addressLine1: '',
  city: '',
  country: '',
  postalCode: '',
  acceptedPolicies: false,
};

const phoneNumberPattern = /^[0-9+()\-\s.]+$/;

export default function SignInClient() {
  const search = useSearchParams();
  const router = useRouter();
  const [signupForm, setSignupForm] = useState<SignupFormState>(initialSignupForm);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState<SignupErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const callbackUrl = search.get('callbackUrl') || '/dashboard';
  const mode = search.get('mode') || 'login';
  const isSignup = mode === 'signup';
  const maxDateOfBirth = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const setSignupField = <K extends SignupField>(field: K, value: SignupFormState[K]) => {
    setSignupForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateSignupForm = (): SignupErrors => {
    const nextErrors: SignupErrors = {};

    if (!signupForm.name.trim()) nextErrors.name = 'Name is required';
    if (!signupForm.surname.trim()) nextErrors.surname = 'Surname is required';

    if (!signupForm.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupForm.email)) {
      nextErrors.email = 'Please enter a valid email address';
    }

    if (!signupForm.password) {
      nextErrors.password = 'Password is required';
    } else if (signupForm.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters';
    }

    if (!signupForm.phoneNumber.trim()) {
      nextErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneNumberPattern.test(signupForm.phoneNumber)) {
      nextErrors.phoneNumber = 'Phone number contains invalid characters';
    }

    if (!signupForm.dateOfBirth) nextErrors.dateOfBirth = 'Date of birth is required';
    if (!signupForm.addressLine1.trim()) nextErrors.addressLine1 = 'Street address is required';
    if (!signupForm.city.trim()) nextErrors.city = 'City is required';
    if (!signupForm.country) nextErrors.country = 'Country is required';
    if (!signupForm.postalCode.trim()) nextErrors.postalCode = 'Post code is required';
    if (!signupForm.acceptedPolicies) {
      nextErrors.acceptedPolicies = 'You must agree to the Terms & Conditions and Privacy Policy';
    }

    return nextErrors;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setLoading(true);

    if (isSignup) {
      const validationErrors = validateSignupForm();
      if (Object.keys(validationErrors).length > 0) {
        setFieldErrors(validationErrors);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signupForm),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({ message: 'Registration failed' }));
          throw new Error(data.message || 'Registration failed');
        }

        await signIn('credentials', {
          email: signupForm.email,
          password: signupForm.password,
          redirect: true,
          callbackUrl,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Registration failed');
      } finally {
        setLoading(false);
      }
      return;
    }

    const res = await signIn('credentials', {
      email: loginForm.email,
      password: loginForm.password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (res?.ok) {
      router.push(callbackUrl);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      <Section className={`py-10 ${isSignup ? 'max-w-4xl' : 'max-w-md'}`}>
        <Card className="p-6">
          <h1 className="text-xl font-semibold">{isSignup ? 'Create Account' : 'Log in'}</h1>
          <p className="text-sm text-slate-600 mt-1">
            {isSignup ? 'Create your account to get started.' : 'Welcome back! Please sign in.'}
          </p>

          {error && (
            <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 text-rose-800 text-sm p-3">
              {error}
            </div>
          )}

          <form className="mt-4 grid gap-4" onSubmit={onSubmit}>
            {isSignup ? (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    label="Name"
                    value={signupForm.name}
                    onChange={(e) => setSignupField('name', e.target.value)}
                    error={fieldErrors.name}
                    autoComplete="given-name"
                    required
                  />
                  <Input
                    label="Surname"
                    value={signupForm.surname}
                    onChange={(e) => setSignupField('surname', e.target.value)}
                    error={fieldErrors.surname}
                    autoComplete="family-name"
                    required
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    label="Phone number"
                    type="tel"
                    value={signupForm.phoneNumber}
                    onChange={(e) => setSignupField('phoneNumber', e.target.value)}
                    error={fieldErrors.phoneNumber}
                    autoComplete="tel"
                    required
                  />
                  <Input
                    label="Date of birth"
                    type="date"
                    value={signupForm.dateOfBirth}
                    onChange={(e) => setSignupField('dateOfBirth', e.target.value)}
                    error={fieldErrors.dateOfBirth}
                    max={maxDateOfBirth}
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <div>
                    <div className="text-xs text-slate-600 font-medium mb-1.5">Address</div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input
                        label="Street, house number, apartment"
                        value={signupForm.addressLine1}
                        onChange={(e) => setSignupField('addressLine1', e.target.value)}
                        error={fieldErrors.addressLine1}
                        autoComplete="address-line1"
                        wrapperClassName="sm:col-span-2"
                        required
                      />
                      <Input
                        label="City"
                        value={signupForm.city}
                        onChange={(e) => setSignupField('city', e.target.value)}
                        error={fieldErrors.city}
                        autoComplete="address-level2"
                        required
                      />
                      <div className="grid gap-1.5">
                        <label className="text-xs text-slate-600 font-medium">Country</label>
                        <Select
                          value={signupForm.country}
                          onChange={(e) => setSignupField('country', e.target.value)}
                          autoComplete="country-name"
                          required
                        >
                          <option value="">Select country</option>
                          {SIGNUP_COUNTRIES.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </Select>
                        {fieldErrors.country && (
                          <p className="text-xs text-red-500">{fieldErrors.country}</p>
                        )}
                      </div>
                      <Input
                        label="Post code"
                        value={signupForm.postalCode}
                        onChange={(e) => setSignupField('postalCode', e.target.value)}
                        error={fieldErrors.postalCode}
                        autoComplete="postal-code"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    label="Email"
                    type="email"
                    value={signupForm.email}
                    onChange={(e) => setSignupField('email', e.target.value)}
                    error={fieldErrors.email}
                    autoComplete="email"
                    required
                  />
                  <Input
                    label="Password"
                    type="password"
                    value={signupForm.password}
                    onChange={(e) => setSignupField('password', e.target.value)}
                    error={fieldErrors.password}
                    autoComplete="new-password"
                    required
                  />
                </div>

                <div className="grid gap-1.5">
                  <label className="flex items-start gap-3 rounded-lg border border-black/10 bg-slate-50 px-3 py-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={signupForm.acceptedPolicies}
                      onChange={(e) => setSignupField('acceptedPolicies', e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-black/20"
                      required
                    />
                    <span>
                      I agree to the{' '}
                      <Link href="/terms" className="underline">
                        Terms & Conditions
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="underline">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                  {fieldErrors.acceptedPolicies && (
                    <p className="text-xs text-red-500">{fieldErrors.acceptedPolicies}</p>
                  )}
                </div>
              </>
            ) : (
              <>
                <Input
                  label="Email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                  autoComplete="email"
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                  autoComplete="current-password"
                  required
                />
              </>
            )}

            <div className="mt-2">
              <Button type="submit" disabled={loading} variant="primary">
                {loading ? (isSignup ? 'Creating...' : 'Signing in...') : (isSignup ? 'Create account' : 'Log in')}
              </Button>
            </div>
          </form>
        </Card>
      </Section>
    </main>
  );
}
