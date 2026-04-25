export const fallbackLng = 'en'
export const languages = ['en', 'pl'] as const
export const defaultNS = 'common'
export const cookieName = 'NEXT_LOCALE'

export type Locale = (typeof languages)[number]

export function getOptions(lng: string = fallbackLng, ns: string | string[] = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
