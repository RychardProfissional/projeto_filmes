import { NextResponse } from 'next/server'

export async function middleware(req) {
  const user = {
    name: 'Test',
    roles: ['development']
  };

  const reqHeaders = new Headers(req.headers);
  reqHeaders.set('X-user', JSON.stringify(user));

  return NextResponse.next({
    request: {
      headers: reqHeaders
    }
  });
}

export const config = { 
  matcher: ['/', '/:path*'], 
};
