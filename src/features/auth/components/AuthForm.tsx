'use client'

import { type FC, type ReactNode } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/client'

import { AuthHeader } from './AuthHeader'

type AuthFormProps = {
  title: string
  subtitle: string
  formAction: (payload: FormData) => void
  error?: string | null
  pending: boolean
  submitLabel: string
  pendingLabel: string
  footerText: string
  footerLinkText: string
  footerLinkHref: string
  children: ReactNode
}

export const AuthForm: FC<AuthFormProps> = ({
  title,
  subtitle,
  formAction,
  error,
  pending,
  submitLabel,
  pendingLabel,
  footerText,
  footerLinkText,
  footerLinkHref,
  children,
}) => {
  const { t } = useTranslation('auth')

  const errorMessage = error ? t(`errors.${error}`, { defaultValue: error }) : null

  return (
    <div className="w-full max-w-sm">
      <AuthHeader title={title} subtitle={subtitle} />

      <form
        action={formAction}
        className="bg-surface backdrop-blur-xl border border-surface-border rounded-2xl p-6 flex flex-col gap-4"
      >
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        {children}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 px-6 py-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-medium hover:bg-purple-500/30 hover:shadow-[0_0_16px_rgba(168,85,247,0.2)] transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? pendingLabel : submitLabel}
        </button>

        <p className="text-center text-xs text-foreground-muted mt-1">
          {footerText}{' '}
          <Link
            href={footerLinkHref}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            {footerLinkText}
          </Link>
        </p>
      </form>
    </div>
  )
}
