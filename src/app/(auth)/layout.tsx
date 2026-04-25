import { ReactNode } from 'react'
import { LanguageSwitcher } from '@/components/ui'
import { getLocale } from '@/lib/i18n/server'

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const lng = await getLocale()

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-8">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher currentLocale={lng} />
      </div>
      {children}
    </main>
  )
}
