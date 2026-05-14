import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'ro'] as const
export type Locale = typeof locales[number]

const defaultLocale: Locale = 'en'

function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim())
    for (const lang of languages) {
      const langCode = lang.split('-')[0].toLowerCase()
      if (locales.includes(langCode as Locale)) {
        return langCode as Locale
      }
    }
  }
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/|blog/).*)',
  ],
}