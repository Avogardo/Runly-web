'use server'

import { hash } from 'bcryptjs'
import { prisma } from '@/lib/db'
import { signIn } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth'
import { z } from 'zod'

// ── Register ────────────────────────────────────────────

const registerSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1).optional(),
})

export type AuthActionState = {
  error?: string
} | null

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
    return { error: firstError?.message ?? 'Validation failed' }
  }

  const { email, password, name } = result.data

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { error: 'Email already registered' }
  }

  const hashedPassword = await hash(password, 12)

  await prisma.user.create({
    data: { email, hashedPassword, name },
  })

  // Auto sign-in after registration
  const signInResult = await signIn('credentials', {
    email,
    password,
    redirect: false,
  })

  if (signInResult?.error) {
    return { error: 'Account created but sign-in failed. Try logging in.' }
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
      return { error: 'Invalid email or password' }
    }
    throw error
  }

  redirect('/')
}


