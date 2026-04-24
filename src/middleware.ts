import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/login', '/register']
const PUBLIC_API_PREFIXES = ['/api/auth', '/api/register']

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth
  const isAuthPage = PUBLIC_PATHS.includes(pathname)
  const isPublicApi = PUBLIC_API_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  const isApiRoute = pathname.startsWith('/api/')

  // Allow public API routes always
  if (isPublicApi) {
    return NextResponse.next()
  }

  // Protected API routes → 401 JSON (not redirect) for mobile clients
  if (isApiRoute && !isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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
