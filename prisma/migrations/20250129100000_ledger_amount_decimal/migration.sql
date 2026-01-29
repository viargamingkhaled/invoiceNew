-- AlterTable: LedgerEntry.amount from Int to Decimal(12,2) for decimal payment amounts
ALTER TABLE "LedgerEntry" ALTER COLUMN "amount" TYPE DECIMAL(12,2) USING (amount::numeric);
