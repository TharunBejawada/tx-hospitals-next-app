// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';
  let redirectNeeded = false;

  // 1. Redirect www → non-www (canonical domain)
  if (host === 'www.txhospitals.in') {
    url.host = 'txhospitals.in';
    url.protocol = 'https:';
    redirectNeeded = true;
  }

  // 2. Enforce trailing slash on all non-file, non-internal paths
  const pathname = url.pathname;
  const isFile = /\.[a-zA-Z0-9]+$/.test(pathname);
  const isNextInternal = pathname.startsWith('/_next') || pathname.startsWith('/api/');

  if (!isFile && !isNextInternal && !pathname.endsWith('/')) {
    url.pathname = pathname + '/';
    redirectNeeded = true;
  }

  if (redirectNeeded) {
    // Use 301 for www→non-www, 308 for trailing-slash enforcement
    const statusCode = host === 'www.txhospitals.in' ? 301 : 308;
    return NextResponse.redirect(url, statusCode);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*', // catch-all matcher
};
