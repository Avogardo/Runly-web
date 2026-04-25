'use client'

import { useEffect, useState } from 'react'
import i18next, { type TFunction } from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { getOptions, languages } from './settings'

const runsOnServerSide = typeof window === 'undefined'

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    ...getOptions(),
    preload: runsOnServerSide ? [...languages] : [],
  })

export function useTranslation(
  ns: string | string[] = 'common',
  options?: { lng?: string },
): { t: TFunction; i18n: typeof i18next } {
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret

  if (runsOnServerSide && options?.lng && i18n.resolvedLanguage !== options.lng) {
    i18n.changeLanguage(options.lng)
  }

  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)

  useEffect(() => {
    if (activeLng === i18n.resolvedLanguage) return
    setActiveLng(i18n.resolvedLanguage)
  }, [activeLng, i18n.resolvedLanguage])

  useEffect(() => {
    if (!options?.lng || i18n.resolvedLanguage === options.lng) return
    i18n.changeLanguage(options.lng)
  }, [options?.lng, i18n])

  return { t: ret.t, i18n }
}
