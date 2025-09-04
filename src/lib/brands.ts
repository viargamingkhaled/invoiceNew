export type BrandTier = 'featured' | 'standard';

export type Brand = {
  id: string;
  name: string;
  country?: string;
  industry?: string;
  tier: BrandTier;
  colorSrc: string; // public path
  monoSrc?: string; // optional separate mono; if missing use color with CSS
  href?: string; // brand site or case study
  consent?: boolean; // legal toggle
};

export const BRANDS: Brand[] = [
  { id: 'canva', name: 'Canva', tier: 'featured', colorSrc: '/Canva-Logo.png', consent: true },
  { id: 'intercom', name: 'Intercom', tier: 'featured', colorSrc: '/Intercom_logo.png', consent: true },
  { id: 'pipedrive', name: 'Pipedrive', tier: 'featured', colorSrc: '/Pipedrive_logo.svg', consent: true },
  { id: 'vinted', name: 'Vinted', tier: 'standard', colorSrc: '/Vinted_logo.png', consent: true },
  { id: 'payhawk', name: 'Payhawk', tier: 'standard', colorSrc: '/Payhawk_Logo.png', consent: true },
  { id: 'productboard', name: 'Productboard', tier: 'standard', colorSrc: '/Productboard-logo-clean.png', consent: true },
  { id: 'docplanner', name: 'Docplanner', tier: 'standard', colorSrc: '/Docplanner_Logo.png', consent: true },
  { id: 'pleo', name: 'Pleo', tier: 'standard', colorSrc: '/Pleo_logo.svg', consent: true },
  { id: 'personio', name: 'Personio', tier: 'standard', colorSrc: '/Personio_Logo.png', consent: true },
  { id: 'aircall', name: 'Aircall', tier: 'standard', colorSrc: '/Aircall_green_rgb.png', consent: true },
  { id: 'payfit', name: 'PayFit', tier: 'standard', colorSrc: '/PayFit-logo.png', consent: true },
  { id: 'mollie', name: 'Mollie', tier: 'standard', colorSrc: '/Mollie-Logo-Black-2023.png', consent: true },
];

