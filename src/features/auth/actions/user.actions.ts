'use server'

import { signIn } from '@/lib/auth'
import { createUser } from '@/features/auth/queries'
import { registerSchema } from '@/features/auth'
import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth'

// ── Types ───────────────────────────────────────────────

type AuthActionState = {
  error?: string
} | null

// ── Register ────────────────────────────────────────────

export async function registerUser(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const result = registerSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name') || undefined,
  })

  if (!result.success) {
    const firstError = result.error.issues[0]
    return { error: firstError?.message ?? 'validationFailed' }
  }

  const { email, password, name } = result.data

  const user = await createUser(email, password, name)
  if (!user) {
    return { error: 'emailTaken' }
  }

  const signInResult = await signIn('credentials', {
    email,
    password,
    redirect: false,
  })

  if (signInResult?.error) {
    return { error: 'signInFailed' }
  }

  redirect('/')
}

// ── Login ───────────────────────────────────────────────

export async function loginUser(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  try {
    await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: false,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'invalidCredentials' }
    }
    throw error
  }

  redirect('/')
}
