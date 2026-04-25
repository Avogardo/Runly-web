import Link from 'next/link'
import { getServerTranslation } from '@/lib/i18n/server'

export default async function RunNotFound() {
  const { t } = await getServerTranslation('common')

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <span className="text-6xl">🏃‍♂️💨</span>
      <h2 className="text-2xl font-bold text-white">{t('runNotFound')}</h2>
      <p className="text-white/40 text-center max-w-md">{t('runNotFoundDescription')}</p>
      <Link
        href="/"
        className="mt-4 px-6 py-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 hover:shadow-[0_0_16px_rgba(168,85,247,0.2)] transition-all duration-200 active:scale-95"
      >
        {t('backToCalendar')}
      </Link>
    </div>
  )
}
