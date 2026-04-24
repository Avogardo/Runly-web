import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthPage = req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register'
  const isApiAuth = req.nextUrl.pathname.startsWith('/api/auth')
  const isApiRegister = req.nextUrl.pathname === '/api/register'

  // Allow auth API routes and register endpoint always
  if (isApiAuth || isApiRegister) {
    return NextResponse.next()
  }

  // Redirect logged-in users away from auth pages
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Allow auth pages for everyone
  if (isAuthPage) {
    return NextResponse.next()
  }

  // Protect everything else
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}


