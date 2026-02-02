# 🔍 Production Checklist - Spoynt Integration

## Статус интеграции

### ✅ Что работает идеально с нашей стороны:

1. **Backend API** (`/api/payments/spoynt`)
   - ✅ Все 9 шагов логируются и выполняются
   - ✅ Reference ID генерируется корректно
   - ✅ Запись в БД создается
   - ✅ Spoynt API возвращает `success: true`
   - ✅ HPP URL получен и возвращен на фронтенд

2. **Frontend** (Pricing page)
   - ✅ Все 6 шагов выполняются успешно
   - ✅ Редирект на Spoynt HPP происходит

3. **Callback handler** (`/api/payments/spoynt/callback`)
   - ✅ Endpoint создан и готов принимать webhooks
   - ✅ Signature verification реализована
   - ✅ Обработка статусов платежа готова

### ❌ Проблема: "Системная ошибка" на стороне Spoynt

**Симптомы:**
- Spoynt API принимает запрос (success: true)
- HPP страница открывается
- При попытке оплаты: "Ваш платеж неуспешный! Код ошибки: Системная ошибка"

---

## 🔧 Что нужно проверить в Spoynt Dashboard

### 1. Проверьте Callback URL
**URL:** `https://ventira.co.uk/api/payments/spoynt/callback`

**Как проверить доступность:**
```bash
# Из командной строки
curl -X POST https://ventira.co.uk/api/payments/spoynt/callback

# Или откройте в браузере
https://ventira.co.uk/api/payments/spoynt/callback
```

**Ожидаемый ответ:**
```json
{"status":"ok","endpoint":"Spoynt callback handler"}
```

**Если недоступен:**
- Проверьте настройки Vercel firewall
- Убедитесь что маршрут не заблокирован

### 2. Проверьте Payment Service Configuration

**Текущий service:** `payment_card_eur_hpp`

**В Spoynt Dashboard проверьте:**
- [ ] Service `payment_card_eur_hpp` существует
- [ ] Service **активирован для production**
- [ ] Service настроен на обработку EUR
- [ ] HPP (Hosted Payment Page) включена

**Аналогично для других валют:**
- `payment_card_aud_hpp` (AUD)
- `payment_card_cad_hpp` (CAD)
- `payment_card_nzd_hpp` (NZD)
- `payment_card_nok_hpp` (NOK)

### 3. Проверьте Test Mode vs Production Mode

**Текущая конфигурация:** `testMode: false` (production)

**В Spoynt Dashboard:**
- [ ] Production mode включен для вашего account
- [ ] Merchant account полностью верифицирован
- [ ] KYC (Know Your Customer) проверка пройдена
- [ ] Banking details добавлены

**Если используете тестовые карты в production:**
❌ Это не сработает! Тестовые карты работают только в test mode.

### 4. Проверьте API Credentials

**Переменные окружения на Vercel:**
```env
SPOYNT_ACCOUNT_ID=ac_...
SPOYNT_PUBLIC_KEY=...
SPOYNT_PRIVATE_KEY=...
SPOYNT_SECRET_KEY=...
```

**Проверьте:**
- [ ] Credentials именно для **production** (не test)
- [ ] Нет лишних пробелов или переносов строк
- [ ] Keys не истекли

### 5. Проверьте Return URL

**Текущий return URL:** `https://ventira.co.uk/payment/result`

**Проверьте что страница доступна:**
```
https://ventira.co.uk/payment/result?status=success
https://ventira.co.uk/payment/result?status=failed
```

---

## 🔍 Как диагностировать проблему

### Шаг 1: Проверьте логи в Vercel

**Идите в:** Vercel Dashboard → Your Project → Logs

**Ищите:**
1. `🟢 [API] Step 8: Spoynt API response` - смотрите `fullResponse`
2. `🔵 [SPOYNT LIB] API Success` - смотрите полный ответ от Spoynt
3. `🟣 [CALLBACK]` - проверьте приходят ли callbacks от Spoynt

### Шаг 2: Проверьте приходят ли callbacks

**Если НЕ видите логи с 🟣 [CALLBACK]:**
- ❌ Spoynt не может достучаться до callback URL
- Проверьте URL доступен извне
- Проверьте нет ли блокировки в Vercel/firewall

**Если видите callback с error:**
- Смотрите конкретную ошибку в логах
- Проверьте signature verification

### Шаг 3: Свяжитесь с Spoynt Support

**Email:** support@spoynt.com

**Информация для отправки:**
```
Subject: Production Payment Failing - System Error

Hello,

We are experiencing "System Error" when trying to process payments via HPP.

Details:
- Account ID: ac_...
- Transaction ID: VNT_1770039036334_bafa59d4
- Spoynt Payment ID: cpi_BPJMMQdL7eBfHiG8
- Amount: 10 EUR
- Service: payment_card_eur_hpp
- Test Mode: false
- Date/Time: 2026-02-02 13:30:38 UTC

Our API successfully creates payment session (success: true), but HPP shows "System Error" when customer attempts payment.

Please check:
1. Is payment_card_eur_hpp service properly configured for production?
2. Is our callback URL accessible: https://ventira.co.uk/api/payments/spoynt/callback
3. Are there any issues with our account setup?

Request body we sent:
[См. в Vercel logs - 🔵 [SPOYNT LIB] Request body]

Response we received:
[См. в Vercel logs - ✅ [SPOYNT LIB] Full response]
```

---

## 📊 Логи для анализа

### Где смотреть логи:

**Vercel Logs (Backend):**
1. Dashboard → Project → Logs
2. Filter: `[PAYMENT]` или `[SPOYNT]` или `[CALLBACK]`
3. Ищите transaction ID: `VNT_...`

**Browser Console (Frontend):**
1. F12 → Console
2. Попытайтесь купить токены
3. Смотрите логи Steps 1-6
4. После возврата логи автоматически покажутся

### Ключевые логи для отправки в Spoynt:

```
🔵 [SPOYNT LIB] Request body - показывает что мы отправляем
✅ [SPOYNT LIB] Full response - показывает что Spoynt возвращает
🟢 [API] Step 8: Spoynt API response - сводная информация
```

---

## 💡 Возможные причины "Системная ошибка"

### 1. Service не настроен (САМАЯ ВЕРОЯТНАЯ)
- `payment_card_eur_hpp` не активирован для production
- Service существует только в test mode

### 2. Callback URL недоступен
- Spoynt не может отправить webhook
- URL заблокирован или неверный

### 3. Account не готов для production
- KYC не завершен
- Merchant verification в процессе
- Banking details не добавлены

### 4. Используете тестовые карты в production
- Card 4242424242424242 - это ТЕСТОВАЯ карта
- В production нужны настоящие карты
- Или переключитесь на test mode

### 5. Currency/Amount ограничения
- Проверьте min/max суммы для EUR
- Проверьте supported currencies

### 6. API Credentials неверные
- Using test credentials в production
- Keys истекли или были изменены

---

## ✅ Следующие шаги

1. **Сейчас:** Проверьте Vercel logs с новым детальным логированием
2. **Затем:** Проверьте callback URL доступен: `curl https://ventira.co.uk/api/payments/spoynt/callback`
3. **Затем:** Войдите в Spoynt Dashboard и проверьте:
   - Services configuration
   - Production mode status
   - Account verification status
4. **Если все ОК:** Свяжитесь с Spoynt support с логами
5. **Альтернатива:** Попробуйте test mode для debugging:
   ```env
   NODE_ENV=development
   ```

---

## 🚀 После решения проблемы

1. Удалите избыточное логирование (если нужно)
2. Протестируйте все валюты (EUR, AUD, CAD, NZD, NOK)
3. Протестируйте разные суммы
4. Проверьте callback обрабатывается корректно
5. Проверьте токены начисляются в аккаунт

---

**Последнее обновление:** 2026-02-02
**Статус:** 🔴 Waiting for Spoynt support / dashboard configuration
