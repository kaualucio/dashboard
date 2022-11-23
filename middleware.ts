import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const access_token = request.cookies.get('beru.access_token');
  const refresh_token = request.cookies.get('beru.refresh_token');

  if (!access_token && !refresh_token) {

    return NextResponse.rewrite(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/projetos/:path*',
    '/clientes/:path*',
    '/blog/:path*',
    '/depoimentos/:path*',
    '/calendario',
    '/configuracoes',
  ],
};
