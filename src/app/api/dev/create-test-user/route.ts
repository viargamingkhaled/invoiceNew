import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("Creating test user via API...");

    // Проверяем, существует ли уже тестовый пользователь
    const existingUser = await prisma.user.findUnique({
      where: { email: "test@ventira.co.uk" },
    });

    if (existingUser) {
      return NextResponse.json(
        { 
          message: "Test user already exists",
          user: {
            email: existingUser.email,
            name: existingUser.name,
            tokenBalance: existingUser.tokenBalance,
          }
        },
        { status: 200 }
      );
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash("test123", 12);

    // Создаем тестового пользователя
    const testUser = await prisma.user.create({
      data: {
        email: "test@ventira.co.uk",
        password: hashedPassword,
        name: "Test User",
        tokenBalance: 1000,
        currency: "GBP",
      },
    });

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

    // Создаем тестовые инвойсы
    const testInvoice1 = await prisma.invoice.create({
      data: {
        userId: testUser.id,
        number: "VI-2025-000001",
        date: new Date(),
        due: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
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
        due: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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

    // Создаем записи в ledger
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

    return NextResponse.json({
      message: "Test user created successfully",
      user: {
        email: testUser.email,
        name: testUser.name,
        tokenBalance: testUser.tokenBalance,
      },
      company: {
        name: testCompany.name,
        vat: testCompany.vat,
      },
      invoices: [
        { number: testInvoice1.number, status: testInvoice1.status },
        { number: testInvoice2.number, status: testInvoice2.status },
      ],
      credentials: {
        email: "test@ventira.co.uk",
        password: "test123",
      }
    });

  } catch (error) {
    console.error("[CREATE_TEST_USER_ERROR]", error);
    return NextResponse.json(
      { message: "Failed to create test user", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}



