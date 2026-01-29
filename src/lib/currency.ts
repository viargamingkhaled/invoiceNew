// Currency conversion rates (EUR as base currency)
// Rates are approximate; update periodically
export const TOKENS_PER_EUR = 100; // 1 EUR = 100 tokens

export const CURRENCY_RATES = {
  EUR: 1.0, // Base currency
  AUD: 1.65, // 1 EUR = 1.65 AUD
  CAD: 1.47, // 1 EUR = 1.47 CAD
  NZD: 1.78, // 1 EUR = 1.78 NZD
  NOK: 11.6, // 1 EUR = 11.6 NOK
} as const;

export type Currency = keyof typeof CURRENCY_RATES;

// Currency symbols and formatting
export const CURRENCY_INFO = {
  EUR: { symbol: '\u20AC', name: 'Euro', locale: 'de-DE' },
  AUD: { symbol: '$', name: 'Australian Dollar', locale: 'en-AU' },
  CAD: { symbol: '$', name: 'Canadian Dollar', locale: 'en-CA' },
  NZD: { symbol: '$', name: 'New Zealand Dollar', locale: 'en-NZ' },
  NOK: { symbol: 'kr', name: 'Norwegian Krone', locale: 'nb-NO' },
} as const;

// Convert amount from EUR to target currency
export function convertFromEUR(amountEUR: number, targetCurrency: Currency): number {
  const rate = CURRENCY_RATES[targetCurrency];
  return Math.round(amountEUR * rate * 100) / 100; // Round to 2 decimal places
}

// Convert amount from target currency to EUR
export function convertToEUR(amount: number, fromCurrency: Currency): number {
  const rate = CURRENCY_RATES[fromCurrency];
  return Math.round((amount / rate) * 100) / 100; // Round to 2 decimal places
}

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
  const amountEUR = convertToEUR(amount, currency);
  return Math.round(amountEUR * TOKENS_PER_EUR);
}

// Calculate amount in any currency for given tokens
export function calculateAmountFromTokens(tokens: number, currency: Currency): number {
  const amountEUR = tokens / TOKENS_PER_EUR;
  return convertFromEUR(amountEUR, currency);
}

// Get all available currencies
export function getAvailableCurrencies(): Currency[] {
  return Object.keys(CURRENCY_RATES) as Currency[];
}

// Validate currency
export function isValidCurrency(currency: string): currency is Currency {
  return currency in CURRENCY_RATES;
}
