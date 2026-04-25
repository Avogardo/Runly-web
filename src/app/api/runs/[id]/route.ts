import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { getRunById } from '@/features/runs/queries'

type Params = Promise<{ id: string }>

export async function GET(_request: Request, { params }: { params: Params }) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const run = await getRunById(session.user.id, id)

    if (!run) {
      return NextResponse.json({ error: 'Run not found' }, { status: 404 })
    }

    return NextResponse.json(run)
  } catch (error) {
    console.error('GET /api/runs/[id] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Params }) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const deleted = await prisma.run.deleteMany({
      where: { id, userId: session.user.id },
    })

    if (deleted.count === 0) {
      return NextResponse.json({ error: 'Run not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Run deleted successfully' })
  } catch (error) {
    console.error('DELETE /api/runs/[id] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
