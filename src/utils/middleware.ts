import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function proxy(request: NextRequest) {
    const url = request.nextUrl.pathname;


  return NextResponse.redirect(new URL('/sign-up', request.url))
}
 
export const config = {
  matcher: '/:path*',
}