import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to capture Vercel's geo-IP country header and pass it to the client via cookie.
 * Header: x-vercel-ip-country (2-letter ISO country code, e.g. "NO" for Norway)
 * Cookie: geo-country (same value)
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Read country from Vercel's geo header
  const country = request.headers.get('x-vercel-ip-country') || '';

  // Get existing cookie value
  const existingCookie = request.cookies.get('geo-country')?.value;

  // Only set/update cookie if value changed or not set
  if (country && country !== existingCookie) {
    response.cookies.set('geo-country', country, {
      httpOnly: false, // Allow JS access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
  }

  return response;
}

// Run middleware on all routes except static files, images, and API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public folder files (images, etc.)
     * - api routes (they can read headers directly if needed)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$|api/).*)',
  ],
};
