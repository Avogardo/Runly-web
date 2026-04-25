'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { loginUser } from '@/features/auth/actions'
import { useTranslation } from '@/lib/i18n/client'

const inputClass =
  'bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-purple-500/50 focus:bg-white/[0.06] transition-all duration-200 outline-none'

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginUser, null)
  const { t } = useTranslation('auth')

  const errorMessage = state?.error
    ? t(`errors.${state.error}`, { defaultValue: state.error })
    : null

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <span className="text-5xl">🏃</span>
        <h1 className="text-2xl font-bold text-white mt-3">{t('welcome')}</h1>
        <p className="text-foreground-muted text-sm mt-1">{t('signInSubtitle')}</p>
      </div>

      <form
        action={action}
        className="bg-surface backdrop-blur-xl border border-surface-border rounded-2xl p-6 flex flex-col gap-4"
      >
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs text-foreground-muted uppercase tracking-wider">
            {t('email')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="runner@runly.app"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-xs text-foreground-muted uppercase tracking-wider"
          >
            {t('password')}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={inputClass}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-2 px-6 py-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-medium hover:bg-purple-500/30 hover:shadow-[0_0_16px_rgba(168,85,247,0.2)] transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? t('signingIn') : t('signIn')}
        </button>

        <p className="text-center text-xs text-foreground-muted mt-1">
          {t('noAccount')}{' '}
          <Link
            href="/register"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            {t('createOne')}
          </Link>
        </p>
      </form>
    </div>
  )
}
