-- Step 1: Add new currency enum values (CAD, NZD, NOK)
ALTER TYPE "Currency" ADD VALUE IF NOT EXISTS 'CAD';
ALTER TYPE "Currency" ADD VALUE IF NOT EXISTS 'NZD';
ALTER TYPE "Currency" ADD VALUE IF NOT EXISTS 'NOK';

-- Step 2: Migrate existing data: set GBP, USD, PLN, CZK to EUR
UPDATE "User" SET currency = 'EUR' WHERE currency::text IN ('GBP', 'USD', 'PLN', 'CZK');
UPDATE "Invoice" SET currency = 'EUR' WHERE currency::text IN ('GBP', 'USD', 'PLN', 'CZK');
UPDATE "LedgerEntry" SET currency = 'EUR' WHERE currency::text IN ('GBP', 'USD', 'PLN', 'CZK');

-- Step 3: Create new enum with only EUR, AUD, CAD, NZD, NOK
CREATE TYPE "Currency_new" AS ENUM ('EUR', 'AUD', 'CAD', 'NZD', 'NOK');

-- Step 4: Alter User.currency to use new type
ALTER TABLE "User" ALTER COLUMN "currency" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "currency" TYPE "Currency_new" USING ("currency"::text::"Currency_new");
ALTER TABLE "User" ALTER COLUMN "currency" SET DEFAULT 'EUR'::"Currency_new";

-- Step 5: Alter Invoice.currency to use new type
ALTER TABLE "Invoice" ALTER COLUMN "currency" TYPE "Currency_new" USING ("currency"::text::"Currency_new");

-- Step 6: Alter LedgerEntry.currency to use new type
ALTER TABLE "LedgerEntry" ALTER COLUMN "currency" TYPE "Currency_new" USING ("currency"::text::"Currency_new");

-- Step 7: Drop old enum and rename new one
DROP TYPE "Currency";
ALTER TYPE "Currency_new" RENAME TO "Currency";
