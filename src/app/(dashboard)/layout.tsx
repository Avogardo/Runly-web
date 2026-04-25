import { ReactNode } from 'react'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { UserMenu, LanguageSwitcher } from '@/features/navigation'
import { getServerTranslation, getLocale } from '@/lib/i18n/server'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const lng = await getLocale()
  const { t } = await getServerTranslation('common', { lng })

  return (
    <>
      <header className="sticky top-0 z-50 px-6 py-4 border-b border-white/10 bg-[#0B0B1E]/80 backdrop-blur-lg">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl transition-transform group-hover:scale-110">🏃</span>
            <span className="text-xl font-bold text-white tracking-tight">Runly</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher currentLocale={lng} />
            <UserMenu
              userName={session.user.name}
              userEmail={session.user.email}
              signOutLabel={t('signOut')}
            />
          </div>
        </nav>
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">{children}</main>
      <footer className="px-6 py-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center text-xs text-white/20">{t('footer')}</div>
      </footer>
    </>
  )
}
