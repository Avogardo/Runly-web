import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import type { Coordinate, IntervalSummary } from '@/types/run.types'
import RunStats from '@/components/run/RunStats'
import IntervalBreakdown from '@/components/run/IntervalBreakdown'
import RouteMapWrapper from '@/components/run/RouteMapWrapper'

type Params = Promise<{ id: string }>

export default async function RunDetailPage({ params }: { params: Params }) {
  const { id } = await params

  const run = await prisma.run.findUnique({ where: { id } })

  if (!run) {
    notFound()
  }

  const path = run.path as Coordinate[]
  const intervals = run.intervals as IntervalSummary | null

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/"
        className="text-purple-400 hover:text-purple-300 text-sm transition-colors w-fit"
      >
        ← Back to Calendar
      </Link>

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

