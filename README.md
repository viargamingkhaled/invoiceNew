# Ventira Invoice Generator

A modern, VAT-compliant invoice generator built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Fast & Modern**: Built with Next.js 15 and TypeScript
- 💰 **Multi-currency Support**: GBP, EUR, USD, PLN, CZK
- 🧾 **VAT Compliance**: UK & EU VAT calculations
- 📄 **8 Professional Templates**: Clean, modern invoice designs
- 🔐 **Secure Authentication**: NextAuth.js integration
- 💳 **Token-based System**: Pay-per-use model
- 📱 **Responsive Design**: Works on all devices

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **PDF Generation**: Puppeteer + Chromium
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run database migrations: `npm run prisma:migrate`
5. Start development server: `npm run dev`

## Environment Variables

See `.env.example` for required environment variables.

## Deployment

The project is configured for deployment on Vercel with automatic database migrations.

## License

Private project - All rights reserved.