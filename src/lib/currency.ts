// Currency conversion rates (GBP as base currency)
// Rates are updated periodically - these are approximate rates as of October 2024
export const TOKENS_PER_GBP = 100; // 1 GBP = 100 tokens

export const CURRENCY_RATES = {
  GBP: 1.0, // Base currency
  EUR: 1.16, // 1 GBP = 1.16 EUR
  USD: 1.27, // 1 GBP = 1.27 USD
  PLN: 5.12, // 1 GBP = 5.12 PLN
  CZK: 29.8, // 1 GBP = 29.8 CZK
} as const;

export type Currency = keyof typeof CURRENCY_RATES;

// Currency symbols and formatting
export const CURRENCY_INFO = {
  GBP: { symbol: '\u00A3', name: 'British Pound', locale: 'en-GB' },
  EUR: { symbol: '\u20AC', name: 'Euro', locale: 'de-DE' },
  USD: { symbol: '$', name: 'US Dollar', locale: 'en-US' },
  PLN: { symbol: 'z\u0142', name: 'Polish Z\u0142oty', locale: 'pl-PL' },
  CZK: { symbol: 'K\u010D', name: 'Czech Koruna', locale: 'cs-CZ' },
} as const;

// Convert amount from GBP to target currency
export function convertFromGBP(amountGBP: number, targetCurrency: Currency): number {
  const rate = CURRENCY_RATES[targetCurrency];
  return Math.round(amountGBP * rate * 100) / 100; // Round to 2 decimal places
}

// Convert amount from target currency to GBP
export function convertToGBP(amount: number, fromCurrency: Currency): number {
  const rate = CURRENCY_RATES[fromCurrency];
  return Math.round(amount / rate * 100) / 100; // Round to 2 decimal places
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
  const amountGBP = convertToGBP(amount, currency);
  return Math.round(amountGBP * 100); // 1 GBP = 100 tokens
}

// Calculate amount in any currency for given tokens
export function calculateAmountFromTokens(tokens: number, currency: Currency): number {
  const amountGBP = tokens / 100; // 100 tokens = 1 GBP
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
