'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/client'

type DashboardErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  const { t } = useTranslation('common')

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <span className="text-6xl">⚠️</span>
      <h2 className="text-2xl font-bold text-white">{t('somethingWentWrong')}</h2>
      <p className="text-white/55 text-center max-w-md">{error.message || t('unexpectedError')}</p>
      <div className="flex gap-3 mt-4">
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 hover:shadow-[0_0_16px_rgba(168,85,247,0.2)] transition-all duration-200 active:scale-95"
        >
          {t('tryAgain')}
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-xl bg-white/6 border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all duration-200 active:scale-95"
        >
          {t('backToCalendar')}
        </Link>
      </div>
    </div>
  )
}
