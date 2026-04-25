export const runListSelect = {
  id: true,
  startedAt: true,
  endedAt: true,
  distance: true,
  duration: true,
} as const

export const runDetailSelect = {
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
