import { prisma } from '@/lib/db'

import { Coordinate, IntervalSummary } from '../types'
import { runListSelect, runDetailSelect } from '../consts'
import { getMonthDateRange } from '../utils'
import { parseYearMonth } from '@/features/calendar/utils'

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
    const { year, month } = parseYearMonth(yearMonth)
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
