'use client'

import { useActionState } from 'react'
import { loginUser } from '@/features/auth/actions'
import { AuthForm, AuthFormField } from '@/features/auth/components'
import { useTranslation } from '@/lib/i18n/client'

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginUser, null)
  const { t } = useTranslation('auth')

  return (
    <AuthForm
      title={t('welcome')}
      subtitle={t('signInSubtitle')}
      formAction={action}
      error={state?.error}
      pending={pending}
      submitLabel={t('signIn')}
      pendingLabel={t('signingIn')}
      footerText={t('noAccount')}
      footerLinkText={t('createOne')}
      footerLinkHref="/register"
    >
      <AuthFormField
        id="email"
        label={t('email')}
        type="email"
        required
        autoComplete="email"
        placeholder="runner@runly.app"
      />
      <AuthFormField
        id="password"
        label={t('password')}
        type="password"
        required
        autoComplete="current-password"
        placeholder="••••••••"
      />
    </AuthForm>
  )
}
