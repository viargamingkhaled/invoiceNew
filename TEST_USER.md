# Test User Documentation

## Overview
A test user has been created for development and testing purposes.

## Login Credentials
- **Email:** `test@ventira.co.uk`
- **Password:** `test123`

## Test User Data

### User Profile
- **Name:** Test User
- **Token Balance:** 1000 tokens
- **Currency:** GBP (default)

### Company Information
- **Name:** Ventira Test Ltd
- **VAT:** GB123456789
- **Registration:** 12345678
- **Address:** 221B Baker Street, London, United Kingdom
- **Bank:** NatWest Bank
- **IBAN:** GB29 NWBK 6016 1331 9268 19
- **BIC:** NWBKGB2L

### Sample Invoices

#### Invoice 1: VI-2025-000001
- **Status:** Ready
- **Client:** Test Client Ltd (CZ12345678)
- **Currency:** GBP
- **Items:**
  - Design sprint workshop (2 × £600.00, 20% VAT)
  - UI template license (1 × £250.00, 0% VAT)
- **Total:** £1,440.00

#### Invoice 2: VI-2025-000002
- **Status:** Sent
- **Client:** Another Client s.r.o. (SK12345678)
- **Currency:** EUR
- **Items:**
  - Web development services (1 × €850.00, 20% VAT)
- **Total:** €1,020.00

### Token History
- **Initial Top-up:** +1000 tokens (£10.00)
- **Invoice 1:** -10 tokens
- **Invoice 2:** -10 tokens
- **Current Balance:** 980 tokens

## Usage

### Creating Test User
You can create the test user using:

1. **Script:** `node scripts/create-test-user.js`
2. **API:** `POST /api/dev/create-test-user`
3. **Web Interface:** Visit `/dev/test-user`

### Testing Features
The test user allows you to test:
- All invoice templates (including new Nordic Grid)
- Multi-currency support (GBP, EUR)
- VAT calculations (Domestic, Intra-EU, Export)
- Token system and billing
- PDF generation and email sending
- Dashboard functionality

### Development Notes
- The test user is safe to use for development
- All data is sample data and can be reset
- The user has sufficient tokens for testing all features
- Company information is pre-filled for quick testing



