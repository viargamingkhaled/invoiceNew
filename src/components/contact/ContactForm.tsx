'use client';

import { useMemo, useState } from 'react';
import Card from '@/components/ui/Card';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { CURRENCY_BY_COUNTRY } from '@/lib/constants';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [topic, setTopic] = useState('Sales');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState<null | { id: string }>(null);

  const countries = useMemo(() => Object.keys(CURRENCY_BY_COUNTRY), []);

  const canSubmit = Boolean(name.trim() && email.includes('@') && message.trim() && consent);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const id = `REQ-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setSubmitted({ id });
  };

  return (
    <Card className="p-6" padding="md">
      <h2 className="text-lg font-semibold">Send a message</h2>
      <p className="text-slate-600 text-sm mt-1">Fill the form and we will reply by email.</p>
      <form onSubmit={onSubmit} className="mt-4 grid gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Alex Johnson" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" placeholder="Acme Ltd" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <Select id="country" value={country} onChange={(e) => setCountry(e.target.value)}>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="topic">Topic</Label>
            <Select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option>Sales</option>
              <option>Support</option>
              <option>Billing</option>
              <option>Privacy</option>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" rows={6} placeholder="How can we help?" value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
          <span>I agree to be contacted about my request.</span>
        </label>
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={!canSubmit}>Send</Button>
          <span className="text-xs text-slate-500">Avg. reply within 1 business day</span>
        </div>
        {submitted && (
          <Alert variant="success">
            Thanks! Your request <b>{submitted.id}</b> has been received. We will reply to <b>{email}</b>.
          </Alert>
        )}
      </form>
    </Card>
  );
}

