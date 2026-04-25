import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from '@/lib/i18n/settings'
import { SECONDS_IN_YEAR } from '@/consts'

acceptLanguage.languages([...languages])

const PUBLIC_PATHS = ['/login', '/register']
const PUBLIC_API_PREFIXES = ['/api/auth', '/api/register']

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth
  const isAuthPage = PUBLIC_PATHS.includes(pathname)
  const isPublicApi = PUBLIC_API_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  const isApiRoute = pathname.startsWith('/api/')

  // — Language detection (cookie-based) —
  let response: NextResponse | undefined

  const localeCookie = req.cookies.get(cookieName)?.value
  if (!localeCookie || !languages.includes(localeCookie as (typeof languages)[number])) {
    const detected = acceptLanguage.get(req.headers.get('Accept-Language')) ?? fallbackLng
    response = NextResponse.next()
    response.cookies.set(cookieName, detected, { path: '/', maxAge: SECONDS_IN_YEAR })
  }

  // — Auth logic —

  if (isPublicApi) {
    return response ?? NextResponse.next()
  }

  if (isApiRoute && !isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (isAuthPage) {
    return response ?? NextResponse.next()
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return response ?? NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
