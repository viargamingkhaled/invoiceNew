'use client';

export type Region = 'UK' | 'EU';

export type PolicySection = {
  id: string;
  title: string;
  body?: string;
};

export type PolicyId = 'privacy' | 'terms' | 'cookies' | 'refund';

export type Policy = {
  id: PolicyId;
  name: string;
  sections: PolicySection[];
};

export type Heading = { id: string; title: string };

