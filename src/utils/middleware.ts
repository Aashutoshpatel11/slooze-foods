import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function proxy(request: NextRequest) {
    const cookieStore = await cookies()
    const url = request.nextUrl.pathname;
    const token = cookieStore.get('token')

    if( !token ){
        return NextResponse.redirect(new URL('/user/sign-in', request.url))
    }


    return NextResponse.redirect(new URL('/', request.url))
}
 
export const config = {
  matcher: '/:path*',
}