import { createInstance, type i18n, type TFunction } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions, fallbackLng, cookieName } from './settings'
import { cookies } from 'next/headers'

async function initI18next(lng: string, ns: string | string[]): Promise<i18n> {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lng, ns))
  return i18nInstance
}

export async function getLocale(): Promise<string> {
  const cookieStore = await cookies()
  return cookieStore.get(cookieName)?.value ?? fallbackLng
}

export async function getServerTranslation(
  ns: string | string[] = 'common',
  options?: { lng?: string },
): Promise<{ t: TFunction; lng: string; i18n: i18n }> {
  const lng = options?.lng ?? await getLocale()
  const i18nInstance = await initI18next(lng, ns)
  return {
    t: i18nInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns),
    lng,
    i18n: i18nInstance,
  }
}

