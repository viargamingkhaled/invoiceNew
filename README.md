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
- 📧 **Email Integration**: Send invoices directly via email
- 🎨 **Custom Branding**: Upload your company logo

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **PDF Generation**: Puppeteer + Chromium
- **Email Service**: Resend
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/viargamingkhaled/invoiceNew.git
   cd invoiceNew
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in the required environment variables in `.env.local`:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/invoicegen"
   
   # Authentication
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Email Service
   RESEND_API_KEY="your-resend-api-key"
   EMAIL_FROM="info@yourdomain.com"
   
   # App Configuration
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NEXT_PUBLIC_APP_NAME="Your App Name"
   ```

4. **Set up the database**
   ```bash
   npm run prisma:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | Secret key for NextAuth.js | Yes |
| `NEXTAUTH_URL` | Base URL for authentication | Yes |
| `RESEND_API_KEY` | Resend API key for email service | Yes |
| `EMAIL_FROM` | Email address for sending emails | Yes |
| `NEXT_PUBLIC_APP_URL` | Public URL of your application | Yes |
| `NEXT_PUBLIC_APP_NAME` | Name of your application | Yes |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:deploy` - Deploy migrations to production

## Project Structure

```
src/
├── app/                 # Next.js 15 app directory
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard page
│   ├── generator/      # Invoice generator
│   └── ...
├── components/         # React components
│   ├── ui/            # UI components
│   ├── layout/        # Layout components
│   ├── sections/      # Page sections
│   └── ...
├── lib/               # Utility libraries
├── types/             # TypeScript type definitions
└── ...
```

## Database Schema

The application uses Prisma with PostgreSQL. Key models include:

- **User**: User accounts with token balance
- **Company**: Company information and branding
- **Invoice**: Invoice data and metadata
- **InvoiceItem**: Individual line items
- **LedgerEntry**: Token transaction history

## Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm run start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary. All rights reserved.

## Support

For support and questions, please contact the development team.