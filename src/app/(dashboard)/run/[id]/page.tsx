import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import type { Coordinate, IntervalSummary } from '@/types/run.types'
import RunStats from '@/components/run/RunStats'
import IntervalBreakdown from '@/components/run/IntervalBreakdown'
import RouteMapWrapper from '@/components/run/RouteMapWrapper'
import DeleteRunButton from '@/components/run/DeleteRunButton'

type Params = Promise<{ id: string }>

export default async function RunDetailPage({ params }: { params: Params }) {
  const session = (await auth())!

  const { id } = await params

  const run = await prisma.run.findUnique({
    where: { id, userId: session.user!.id },
  })

  if (!run) {
    notFound()
  }

  const path = run.path as Coordinate[]
  const intervals = run.intervals as IntervalSummary | null

  const runMonth = `${run.startedAt.getUTCFullYear()}-${String(run.startedAt.getUTCMonth() + 1).padStart(2, '0')}`
  const runDay = run.startedAt.getUTCDate()
  const backHref = `/?month=${runMonth}&day=${runDay}`

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm transition-all duration-200 hover:-translate-x-0.5"
        >
          ← Back to Calendar
        </Link>
        <DeleteRunButton runId={id} />
      </div>

      <RunStats
        distance={run.distance}
        duration={run.duration}
        startedAt={run.startedAt}
        endedAt={run.endedAt}
      />

      {path.length > 0 && <RouteMapWrapper path={path} />}

      {intervals && <IntervalBreakdown intervals={intervals} />}
    </div>
  )
}

