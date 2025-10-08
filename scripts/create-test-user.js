const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    console.log("Creating test user...");

    // Проверяем, существует ли уже тестовый пользователь
    const existingUser = await prisma.user.findUnique({
      where: { email: "test@ventira.co.uk" },
    });

    if (existingUser) {
      console.log("Test user already exists:", existingUser.email);
      return existingUser;
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash("test123", 12);

    // Создаем тестового пользователя
    const testUser = await prisma.user.create({
      data: {
        email: "test@ventira.co.uk",
        password: hashedPassword,
        name: "Test User",
        tokenBalance: 1000, // Даем 1000 токенов для тестирования
        currency: "GBP",
      },
    });

    console.log("Test user created successfully:", testUser.email);

    // Создаем компанию для тестового пользователя
    const testCompany = await prisma.company.create({
      data: {
        userId: testUser.id,
        name: "Ventira Test Ltd",
        vat: "GB123456789",
        reg: "12345678",
        address1: "221B Baker Street",
        city: "London",
        country: "United Kingdom",
        iban: "GB29 NWBK 6016 1331 9268 19",
        bankName: "NatWest Bank",
        bic: "NWBKGB2L",
      },
    });

    console.log("Test company created:", testCompany.name);

    // Создаем несколько тестовых инвойсов
    const testInvoice1 = await prisma.invoice.create({
      data: {
        userId: testUser.id,
        number: "VI-2025-000001",
        date: new Date(),
        due: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 дней
        client: "Test Client Ltd",
        clientMeta: {
          name: "Test Client Ltd",
          vat: "CZ12345678",
          address: "Na Príkope 14, Praha 1, Czechia",
          email: "finance@testclient.cz",
        },
        currency: "GBP",
        subtotal: 1200.00,
        tax: 240.00,
        total: 1440.00,
        status: "Ready",
        items: {
          create: [
            {
              description: "Design sprint workshop",
              quantity: 2,
              rate: 600.00,
              tax: 20,
            },
            {
              description: "UI template license",
              quantity: 1,
              rate: 250.00,
              tax: 0,
            },
          ],
        },
      },
    });

    const testInvoice2 = await prisma.invoice.create({
      data: {
        userId: testUser.id,
        number: "VI-2025-000002",
        date: new Date(),
        due: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 дней
        client: "Another Client s.r.o.",
        clientMeta: {
          name: "Another Client s.r.o.",
          vat: "SK12345678",
          address: "Hlavná 1, Bratislava, Slovakia",
          email: "billing@anotherclient.sk",
        },
        currency: "EUR",
        subtotal: 850.00,
        tax: 170.00,
        total: 1020.00,
        status: "Sent",
        items: {
          create: [
            {
              description: "Web development services",
              quantity: 1,
              rate: 850.00,
              tax: 20,
            },
          ],
        },
      },
    });

    console.log("Test invoices created:", testInvoice1.number, testInvoice2.number);

    // Создаем записи в ledger для истории токенов
    await prisma.ledgerEntry.createMany({
      data: [
        {
          userId: testUser.id,
          type: "Top-up",
          delta: 1000,
          balanceAfter: 1000,
          currency: "GBP",
          amount: 10,
        },
        {
          userId: testUser.id,
          type: "Invoice",
          delta: -10,
          balanceAfter: 990,
          invoiceNumber: testInvoice1.number,
        },
        {
          userId: testUser.id,
          type: "Invoice",
          delta: -10,
          balanceAfter: 980,
          invoiceNumber: testInvoice2.number,
        },
      ],
    });

    console.log("Ledger entries created");

    console.log("\n=== Test User Created Successfully ===");
    console.log("Email: test@ventira.co.uk");
    console.log("Password: test123");
    console.log("Token Balance: 1000");
    console.log("Company: Ventira Test Ltd");
    console.log("Invoices: 2 created");
    console.log("================================");

    return testUser;
  } catch (error) {
    console.error("Error creating test user:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Запускаем скрипт
createTestUser()
  .then(() => {
    console.log("Script completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });