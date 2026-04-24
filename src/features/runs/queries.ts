import { prisma } from '@/lib/db'
import { getMonthDateRange } from '@/features/calendar/utils'
import type { Coordinate, IntervalSummary } from '@/features/runs/types'

// ── Select shapes ───────────────────────────────────────

/** Lightweight fields for list views (no path/intervals) */
const runListSelect = {
  id: true,
  startedAt: true,
  endedAt: true,
  distance: true,
  duration: true,
} as const

/** Full run with all fields */
const runDetailSelect = {
  id: true,
  startedAt: true,
  endedAt: true,
  distance: true,
  duration: true,
  path: true,
  intervals: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
} as const

// ── Queries ─────────────────────────────────────────────

export type RunListItem = Awaited<ReturnType<typeof getRunsByMonth>>[number]

/**
 * Get all runs for a user in a given month.
 * Returns lightweight data (no path/intervals).
 */
export async function getRunsByMonth(userId: string, year: number, month: number) {
  const { start, end } = getMonthDateRange(year, month)

  return prisma.run.findMany({
    where: {
      userId,
      startedAt: { gte: start, lt: end },
    },
    orderBy: { startedAt: 'asc' },
    select: runListSelect,
  })
}

/**
 * Get all runs for a user (optionally filtered by month).
 * Used by API for mobile app.
 */
export async function getUserRuns(userId: string, yearMonth?: string) {
  if (yearMonth) {
    const year = Number(yearMonth.slice(0, 4))
    const month = Number(yearMonth.slice(5, 7))
    return getRunsByMonth(userId, year, month)
  }

  return prisma.run.findMany({
    where: { userId },
    orderBy: { startedAt: 'desc' },
    select: runListSelect,
  })
}

/**
 * Get a single run by ID, scoped to the given user.
 * Returns full data including path and intervals.
 */
export async function getRunById(userId: string, runId: string) {
  const run = await prisma.run.findUnique({
    where: { id: runId, userId },
    select: runDetailSelect,
  })

  if (!run) return null

  return {
    ...run,
    path: run.path as Coordinate[],
    intervals: run.intervals as IntervalSummary | null,
  }
}

