import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1).optional(),
})

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

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 },
      )
    }

    const hashedPassword = await hash(password, 12)

    const user = await prisma.user.create({
      data: { email, hashedPassword, name },
      select: { id: true, email: true, name: true, createdAt: true },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('POST /api/register error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

