import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createUser } from '@/features/auth/queries'
import { registerSchema } from '@/features/auth/validations'

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()

    const result = registerSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: z.treeifyError(result.error) },
        { status: 400 },
      )
    }

    const { email, password, name } = result.data

    const user = await createUser(email, password, name)

    if (!user) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 },
      )
    }

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('POST /api/register error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
