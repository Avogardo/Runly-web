'use client'

import { useActionState } from 'react'
import { registerUser } from '@/features/auth/actions'
import { AuthForm, AuthFormField } from '@/features/auth/components'
import { useTranslation } from '@/lib/i18n/client'

export default function RegisterPage() {
  const [state, action, pending] = useActionState(registerUser, null)
  const { t } = useTranslation('auth')

  return (
    <AuthForm
      title={t('createAccount')}
      subtitle={t('createAccountSubtitle')}
      formAction={action}
      error={state?.error}
      pending={pending}
      submitLabel={t('createAccountBtn')}
      pendingLabel={t('creatingAccount')}
      footerText={t('hasAccount')}
      footerLinkText={t('signInLink')}
      footerLinkHref="/login"
    >
      <AuthFormField
        id="name"
        label={
          <>
            {t('name')} <span className="text-white/20">{t('optional')}</span>
          </>
        }
        autoComplete="name"
        placeholder="Runner"
      />
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
        autoComplete="new-password"
        placeholder="Min. 6 characters"
        minLength={6}
      />
    </AuthForm>
  )
}
