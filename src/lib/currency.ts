// Currency conversion rates (GBP as base currency)
// Rates are approximate; update periodically
export const TOKENS_PER_GBP = 100; // 1 GBP = 100 tokens
/** @deprecated Use TOKENS_PER_GBP */
export const TOKENS_PER_EUR = TOKENS_PER_GBP;

export const CURRENCY_RATES = {
  GBP: 1.0, // Base currency
  EUR: 1.18, // 1 GBP = 1.18 EUR
} as const;

export type Currency = keyof typeof CURRENCY_RATES;

// Currency symbols and formatting
export const CURRENCY_INFO = {
  GBP: { symbol: '£', name: 'British Pound', locale: 'en-GB' },
  EUR: { symbol: '\u20AC', name: 'Euro', locale: 'de-DE' },
} as const;

// Convert amount from GBP to target currency
export function convertFromGBP(amountGBP: number, targetCurrency: Currency): number {
  const rate = CURRENCY_RATES[targetCurrency];
  return Math.round(amountGBP * rate * 100) / 100;
}
/** @deprecated Use convertFromGBP */
export const convertFromEUR = convertFromGBP;

// Convert amount from any currency to GBP
export function convertToGBP(amount: number, fromCurrency: Currency): number {
  const rate = CURRENCY_RATES[fromCurrency];
  return Math.round((amount / rate) * 100) / 100;
}
/** @deprecated Use convertToGBP */
export const convertToEUR = convertToGBP;

// Format currency amount with proper symbol and locale
export function formatCurrency(amount: number, currency: Currency): string {
  const info = CURRENCY_INFO[currency];
  const locale = info.locale;

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    // Fallback formatting
    return info.symbol + amount.toFixed(2);
  }
}

// Get currency symbol
export function getCurrencySymbol(currency: Currency): string {
  return CURRENCY_INFO[currency].symbol;
}

// Get currency name
export function getCurrencyName(currency: Currency): string {
  return CURRENCY_INFO[currency].name;
}

// Calculate tokens for given amount in any currency
export function calculateTokens(amount: number, currency: Currency): number {
  const amountGBP = convertToGBP(amount, currency);
  return Math.round(amountGBP * TOKENS_PER_GBP);
}

// Calculate amount in any currency for given tokens
export function calculateAmountFromTokens(tokens: number, currency: Currency): number {
  const amountGBP = tokens / TOKENS_PER_GBP;
  return convertFromGBP(amountGBP, currency);
}

// Get all available currencies
export function getAvailableCurrencies(): Currency[] {
  return Object.keys(CURRENCY_RATES) as Currency[];
}

// Validate currency
export function isValidCurrency(currency: string): currency is Currency {
  return currency in CURRENCY_RATES;
}

// Geo-restricted currencies: country code -> currency
// Users from these countries will only see their local currency
export const GEO_CURRENCY_MAP: Record<string, Currency> = {
  GB: 'GBP', // United Kingdom -> British Pound
} as const;

/**
 * Get the restricted currency for a given country code.
 * Returns null if the country has no currency restrictions.
 */
export function getCurrencyForCountry(countryCode: string | null): Currency | null {
  if (!countryCode) return null;
  return GEO_CURRENCY_MAP[countryCode.toUpperCase()] || null;
}

/**
 * Check if a country has geo-restricted currency
 */
export function isGeoRestrictedCountry(countryCode: string | null): boolean {
  return getCurrencyForCountry(countryCode) !== null;
}
