import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { getUserRuns } from '@/features/runs/queries'
import { createRunSchema, monthQuerySchema } from '@/features/runs'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const monthParam = request.nextUrl.searchParams.get('month')

    const monthResult = monthQuerySchema.safeParse(monthParam ?? undefined)
    if (!monthResult.success) {
      return NextResponse.json(
        { error: 'Invalid month format. Use YYYY-MM (e.g. 2026-04)' },
        { status: 400 },
      )
    }

    const runs = await getUserRuns(session.user.id, monthParam ?? undefined)

    return NextResponse.json(runs)
  } catch (error) {
    console.error('GET /api/runs error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
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
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
