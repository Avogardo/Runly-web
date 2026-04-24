import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { createRunSchema, monthQuerySchema } from '@/lib/validations/run'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = request.nextUrl
    const monthParam = searchParams.get('month')

    // Validate month query param if present
    const monthResult = monthQuerySchema.safeParse(monthParam ?? undefined)
    if (!monthResult.success) {
      return NextResponse.json(
        { error: 'Invalid month format. Use YYYY-MM (e.g. 2026-04)' },
        { status: 400 },
      )
    }

    // Build date filter — always scoped to current user
    const where: Prisma.RunWhereInput = { userId: session.user.id }
    if (monthParam) {
      const year = Number(monthParam.slice(0, 4))
      const month = Number(monthParam.slice(5, 7))
      where.startedAt = {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      }
    }

    const runs = await prisma.run.findMany({
      where,
      orderBy: { startedAt: 'desc' },
      select: {
        id: true,
        startedAt: true,
        endedAt: true,
        distance: true,
        duration: true,
        createdAt: true,
      },
    })

    return NextResponse.json(runs)
  } catch (error) {
    console.error('GET /api/runs error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: unknown = await request.json()

    const result = createRunSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: z.treeifyError(result.error) },
        { status: 400 },
      )
    }

    const { startedAt, endedAt, distance, duration, path, intervals } = result.data

    const run = await prisma.run.create({
      data: {
        userId: session.user.id,
        startedAt: new Date(startedAt),
        endedAt: new Date(endedAt),
        distance,
        duration,
        path,
        intervals: intervals ?? undefined,
      },
    })

    return NextResponse.json(run, { status: 201 })
  } catch (error) {
    console.error('POST /api/runs error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

