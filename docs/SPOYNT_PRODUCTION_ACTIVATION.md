# Spoynt Production Activation Guide

## 🔴 Текущая проблема

**Симптомы:**
- Логи показывают успешную отправку запроса в Spoynt API
- Spoynt возвращает HPP URL
- На странице оплаты появляется: **"Ваш платеж неуспешный! Код ошибки: Системная ошибка"**

**Диагностика из логов:**
```
✅ Step 7: Calling Spoynt API { testMode: false, service: 'payment_card_eur_hpp' }
✅ Step 8: Spoynt API response { success: true, paymentId: 'cpi_...' }
✅ Step 9: Payment session created successfully
❌ На Spoynt HPP: "Системная ошибка"
```

**Вывод:** Наш код работает правильно. Проблема в настройках Spoynt аккаунта.

---

## 🎯 Причины и решения

### 1. Аккаунт не активирован для Production

**Проверьте в Spoynt Dashboard:**
1. Зайдите на https://dashboard.spoynt.com
2. Settings → Account Status
3. Убедитесь что есть галочка "Production Mode Enabled"

**Если Production Mode выключен:**
- Свяжитесь с support@spoynt.com
- Сообщите Account ID и попросите активировать production
- Обычно требуется:
  - Верификация бизнеса (Business Verification)
  - Документы компании
  - Proof of business activity

---

### 2. Payment Service не настроен

**Проверьте:**
1. Dashboard → Services → Payment Methods
2. Убедитесь что **payment_card_eur_hpp** активен для Production
3. Проверьте статус других валют (AUD, CAD, NZD, NOK)

**Если сервис не активен:**
- Request activation через Dashboard
- Или напишите в support с указанием нужных сервисов

---

### 3. Callback URL не в whitelist

**Добавьте в Spoynt Dashboard:**
1. Settings → Webhooks → Callback URLs
2. Добавьте: `https://ventira.co.uk/api/payments/spoynt/callback`
3. Убедитесь что URL доступен (не за firewall)

**Проверка доступности:**
```bash
curl -X POST https://ventira.co.uk/api/payments/spoynt/callback \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

---

### 4. Test Mode временно для отладки

**Если нужно срочно протестировать, включите test mode:**

**Шаг 1: Добавьте в Vercel Environment Variables:**
```
SPOYNT_USE_TEST_MODE=true
```

**Шаг 2: Redeploy:**
```bash
vercel --prod
```

**Тестовые карты для test mode:**
- ✅ Успешная: 4242424242424242
- ❌ Ошибка: 4444444444444422
- CVV: любой 3-х значный
- Expiry: любая будущая дата

---

## 📧 Обращение в Spoynt Support

**Email:** support@spoynt.com

**Тема:** Production mode activation required for Ventira.co.uk

**Текст письма:**
```
Hello Spoynt Team,

We are experiencing a "System Error" when processing payments in production mode.

Account Details:
- Account ID: [YOUR_ACCOUNT_ID]
- Website: https://ventira.co.uk
- Service: payment_card_eur_hpp

Error Details:
- Transaction ID: VNT_1770039036334_bafa59d4
- Error: "Системная ошибка" (System Error) on HPP
- Our API logs show successful request to Spoynt API
- Payment session is created (paymentId received)
- Error occurs on Spoynt HPP page

We have verified:
✓ Callback URL is accessible: https://ventira.co.uk/api/payments/spoynt/callback
✓ API credentials are correct
✓ testMode is set to false

Questions:
1. Is our account activated for production payments?
2. Is payment_card_eur_hpp service enabled for production?
3. Are there any KYC/business verification requirements pending?
4. What is causing the "System Error" on the HPP?

Please advise on the steps needed to resolve this issue.

Best regards,
Ventira Team
```

---

## 🔍 Проверка текущего статуса

**1. Проверьте логи Vercel:**
```bash
vercel logs --filter="PAYMENT" --follow
```

**2. Проверьте Spoynt Dashboard:**
- Transactions → Recent Payments
- Найдите VNT_1770039036334_bafa59d4
- Посмотрите детали ошибки

**3. Проверьте environment variables:**
```bash
vercel env ls
```

Убедитесь что заданы:
- SPOYNT_ACCOUNT_ID
- SPOYNT_API_KEY
- SPOYNT_PUBLIC_KEY
- SPOYNT_PRIVATE_KEY

---

## ✅ После активации Production

**1. Удалите test mode flag:**
```bash
vercel env rm SPOYNT_USE_TEST_MODE production
```

**2. Redeploy:**
```bash
vercel --prod
```

**3. Протестируйте с реальной картой:**
- Попробуйте минимальную сумму (5 EUR)
- Проверьте логи Vercel
- Проверьте Dashboard Spoynt

---

## 📊 Мониторинг после запуска

**Vercel Logs:**
```bash
# Real-time monitoring
vercel logs --follow

# Filter by payment events
vercel logs --filter="PAYMENT EVENT"
```

**Check Payment Status:**
```bash
# In Spoynt Dashboard
Transactions → Search by Reference ID
```

---

## 🆘 Если проблема не решается

1. **Double-check credentials:**
   - Are they for the correct environment (production)?
   - No extra spaces or line breaks?

2. **Test with minimal amount:**
   - Try 5 EUR first
   - Check if it's a limit issue

3. **Check Spoynt Status Page:**
   - https://status.spoynt.com (if available)
   - Any ongoing incidents?

4. **Request detailed error logs from Spoynt:**
   - They can see internal errors we can't access
   - Ask for specific transaction: VNT_1770039036334_bafa59d4

---

## 📝 Контрольный список

- [ ] Account Status: Production Enabled
- [ ] Service Status: payment_card_eur_hpp Active
- [ ] Callback URL: Added to whitelist
- [ ] Business Verification: Completed
- [ ] KYC Documents: Submitted
- [ ] Test Mode: Temporarily enabled (if needed)
- [ ] Support Ticket: Created
- [ ] Environment Variables: Verified in Vercel
- [ ] Callback URL: Accessible from outside
