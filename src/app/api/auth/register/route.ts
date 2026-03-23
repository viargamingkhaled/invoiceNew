import { prisma } from "@/lib/prisma";
import { isAllowedSignupCountry } from "@/lib/signup-countries";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80, "Name is too long"),
  surname: z.string().trim().min(1, "Surname is required").max(80, "Surname is too long"),
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  phoneNumber: z
    .string()
    .trim()
    .min(7, "Phone number is required")
    .max(30, "Phone number is too long")
    .regex(/^[0-9+()\-\s.]+$/, "Phone number contains invalid characters"),
  dateOfBirth: z.string().refine((value) => {
    const parsed = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(parsed.getTime());
  }, "Date of birth is required"),
  addressLine1: z.string().trim().min(1, "Street address is required").max(150, "Street address is too long"),
  city: z.string().trim().min(1, "City is required").max(80, "City is too long"),
  country: z
    .string()
    .trim()
    .refine((value) => isAllowedSignupCountry(value), "Please select an allowed country"),
  postalCode: z.string().trim().min(1, "Post code is required").max(20, "Post code is too long"),
  acceptedPolicies: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the Terms & Conditions and Privacy Policy" }),
  }),
});

export async function POST(req: Request) {
  try {
    const parsed = registerSchema.safeParse(await req.json());

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { message: firstIssue?.message || "Invalid registration data" },
        { status: 400 },
      );
    }

    const {
      name,
      surname,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      addressLine1,
      city,
      country,
      postalCode,
    } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const consentTimestamp = new Date();

    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name: `${name} ${surname}`.trim(),
        firstName: name,
        lastName: surname,
        phone: phoneNumber,
        dateOfBirth: new Date(`${dateOfBirth}T00:00:00.000Z`),
        addressLine1,
        addressCity: city,
        addressCountry: country,
        addressPostalCode: postalCode,
        termsAcceptedAt: consentTimestamp,
        privacyAcceptedAt: consentTimestamp,
      },
      select: {
        id: true,
        email: true,
        name: true,
        firstName: true,
        lastName: true,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("[REGISTER_ERROR]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
