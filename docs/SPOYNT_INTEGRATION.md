# Spoynt Payment Integration Guide

This document describes the Spoynt (Ventira) payment system integration for token top-ups.

## Configuration

### Environment Variables

Add the following to your `.env` file:

```env
# Spoynt Payment Gateway
# Documentation: https://docs.spoynt.com
SPOYNT_API_URL=https://api.spoynt.com
SPOYNT_ACCOUNT_ID=coma_cGNK06tJD6sQcbMi
SPOYNT_API_KEY=EhGGVP5EOnvn2XEu4MXq2BNpNJ-RZcL2AzIQWH4pk_Q
SPOYNT_PUBLIC_KEY=pk_live_AVQJfYEOxgjbVEYzvg-Apu4qUHXmdea7SYji_IsXZvg
SPOYNT_PRIVATE_KEY=sk_live_cEiUyiwJ2EXsk_Z4LG-Y7ajbToIwQPA1tNJfdcTbmz0
```

### Database Migration

Run the following to add the Payment model:

```bash
npx prisma migrate dev --name add_payment_model
# or in production:
npx prisma migrate deploy
npx prisma generate
```

## Architecture

### Payment Flow

1. **User initiates payment** (`/pricing` page)
   - User selects a plan or enters custom amount
   - Frontend calls `POST /api/payments/spoynt`

2. **Payment session created** (`/api/payments/spoynt/route.ts`)
   - Creates a Payment record in the database
   - Calls Spoynt API to create a payment invoice
   - Returns HPP (Hosted Payment Page) URL

3. **User redirected to Spoynt** 
   - User completes payment on Spoynt's secure page
   - Card details are handled by Spoynt (PCI DSS compliant)

4. **Callback received** (`/api/payments/spoynt/callback/route.ts`)
   - Spoynt sends webhook when payment status changes
   - Signature verification ensures authenticity
   - On success: tokens added to user balance

5. **User redirected back** (`/payment/result`)
   - Shows success, pending, or failure status
   - Auto-redirects to dashboard on success

### Available Payment Methods

| Currency | Service ID |
|----------|------------|
| EUR | `payment_card_eur_hpp` |
| AUD | `payment_card_aud_hpp` |
| CAD | `payment_card_cad_hpp` |
| NZD | `payment_card_nzd_hpp` |
| NOK | `payment_card_nok_hpp` |

## API Endpoints

### POST /api/payments/spoynt

Create a new payment session.

**Request:**
```json
{
  "amount": 50,
  "currency": "EUR"
}
```

**Response:**
```json
{
  "success": true,
  "paymentId": "clxyz...",
  "redirectUrl": "https://pay.spoynt.com/hpp/..."
}
```

### POST /api/payments/spoynt/callback

Webhook endpoint for Spoynt callbacks. Do not call directly.

**Headers:**
- `x-signature`: HMAC signature for verification

**Spoynt sends:**
```json
{
  "data": {
    "type": "payment-invoices",
    "id": "cpi_xxx",
    "attributes": {
      "status": "processed",
      "resolution": "ok",
      "amount": 50,
      "currency": "EUR",
      "test_mode": false
    }
  }
}
```

## Signature Verification

Spoynt signs callbacks using:
```
signature = base64(sha1(secret_key + raw_body + secret_key))
```

The callback handler verifies this signature using the appropriate key:
- **Test mode**: Uses `SPOYNT_TEST_PRIVATE_KEY` (if set) or `SPOYNT_PRIVATE_KEY`
- **Live mode**: Uses `SPOYNT_PRIVATE_KEY`

## Testing

### Test Mode

Set `testMode: true` in payment requests for testing:
- Uses Spoynt's test environment
- No real money is charged

### Test Card Numbers

Per Spoynt documentation:
- Use test card numbers from https://docs.spoynt.com/general-information/testing
- Use any valid expiry date except `0777` for successful processing
- Use `0777` to simulate pending/3DS required

## Security Considerations

1. **Signature Verification**: Always verify `x-signature` in production
2. **Idempotency**: Each `reference_id` is unique to prevent duplicates
3. **HTTPS**: All communication must be over SSL
4. **IP Whitelist**: Configure allowed IPs for callbacks:
   - `3.126.246.226`
   - `3.127.19.165`
   - `3.126.219.223`

## Files

```
src/
├── lib/
│   └── spoynt.ts              # Spoynt API client
├── app/
│   ├── api/
│   │   └── payments/
│   │       └── spoynt/
│   │           ├── route.ts     # Create payment
│   │           └── callback/
│   │               └── route.ts # Webhook handler
│   ├── payment/
│   │   └── result/
│   │       ├── page.tsx
│   │       └── PaymentResultClient.tsx
│   └── pricing/
│       └── pricingClient.tsx    # Updated for Spoynt
└── prisma/
    └── schema.prisma            # Payment model
```

## Debugging & Logs

### Frontend Logs (Browser Console)
Откройте консоль браузера (F12) перед покупкой токенов. Вы увидите логи:
- 🔵 Frontend steps (1-6) - показывают процесс до редиректа на Spoynt
- Логи сохраняются в localStorage и остаются доступны после возврата

**После возврата со страницы Spoynt:**
```javascript
// Логи автоматически отображаются в консоли при загрузке страницы pricing
// Или вручную:
JSON.parse(localStorage.getItem('payment_logs'))
localStorage.getItem('payment_reference') // Reference ID платежа
```

### Backend Logs (Vercel Dashboard)
Все backend логи автоматически отправляются в Vercel:

**Где смотреть:**
1. Vercel Dashboard → Your Project → Logs
2. Или через CLI: `vercel logs [deployment-url]`
3. Для runtime logs: `vercel logs --follow`

**Типы событий в Vercel:**
- 🟢 API Route steps (1-9) - процесс создания платежа
- 🟡 REDIRECT_TO_HPP - успешный редирект на Spoynt
- 🟡 PAYMENT_API_ERROR - ошибка при создании платежа
- 🟣 CALLBACK events - webhook от Spoynt

**Пример поиска в Vercel Logs:**
```bash
# Найти все события платежа
vercel logs --filter="PAYMENT"

# Найти конкретный Reference ID
vercel logs --filter="VNT_1770037108569"

# Следить за логами в реальном времени
vercel logs --follow
```

### Local Development Logs
При локальной разработке (`npm run dev`):
- Frontend логи → Browser Console (F12)
- Backend логи → Terminal где запущен dev server

### Troubleshooting with Logs

### Payment not completing

1. Check callback URL is publicly accessible
2. Verify signature configuration
3. Check Spoynt dashboard for payment status
4. Review server logs for callback errors

### Tokens not added

1. Check `LedgerEntry` table for the transaction
2. Verify `Payment` record status is 'completed'
3. Check callback was received (callback_logs in Spoynt dashboard)

### Signature verification failing

1. Ensure correct private key is configured
2. Check for whitespace in env variables
3. Verify test_mode matches key type
