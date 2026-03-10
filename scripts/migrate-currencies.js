const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const r1 = await prisma.$executeRawUnsafe(
    `UPDATE "User" SET currency = 'EUR' WHERE currency::text IN ('AUD', 'CAD', 'NZD', 'NOK')`
  );
  console.log('User rows updated:', r1);

  const r2 = await prisma.$executeRawUnsafe(
    `UPDATE "Invoice" SET currency = 'EUR' WHERE currency::text IN ('AUD', 'CAD', 'NZD', 'NOK')`
  );
  console.log('Invoice rows updated:', r2);

  const r3 = await prisma.$executeRawUnsafe(
    `UPDATE "LedgerEntry" SET currency = 'EUR' WHERE currency::text IN ('AUD', 'CAD', 'NZD', 'NOK')`
  );
  console.log('LedgerEntry rows updated:', r3);

  const r4 = await prisma.$executeRawUnsafe(
    `UPDATE "Payment" SET currency = 'EUR' WHERE currency::text IN ('AUD', 'CAD', 'NZD', 'NOK')`
  );
  console.log('Payment rows updated:', r4);

  console.log('Data migration complete!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
