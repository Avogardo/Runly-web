'use client'

import { FC, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import i18next from 'i18next'
import { languages, cookieName, type Locale } from '@/lib/i18n/settings'

type LanguageSwitcherProps = {
  currentLocale: string
}

const labels: Record<Locale, string> = {
  en: 'EN',
  pl: 'PL',
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ currentLocale }) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const handleChange = (locale: Locale) => {
    document.cookie = `${cookieName}=${locale};path=/;max-age=31536000`
    void i18next.changeLanguage(locale)
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <div className="flex gap-0.5 rounded-lg bg-white/4 border border-white/10 p-0.5">
      {languages.map((locale) => (
        <button
          key={locale}
          onClick={() => handleChange(locale)}
          disabled={pending}
          className={`px-2 py-1 text-[10px] font-medium rounded-md transition-all duration-200 cursor-pointer ${
            currentLocale === locale
              ? 'bg-purple-500/20 text-purple-300'
              : 'text-white/50 hover:text-white/70'
          }`}
        >
          {labels[locale]}
        </button>
      ))}
    </div>
  )
}
