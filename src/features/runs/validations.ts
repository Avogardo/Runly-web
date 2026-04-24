import { z } from 'zod'

const coordinateSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  timestamp: z.number(),
})

const intervalConfigSchema = z.object({
  total: z.number().int().positive(),
  lightDurationSec: z.number().positive(),
  heavyDurationSec: z.number().positive(),
  startWithHeavy: z.boolean(),
  voiceEnabled: z.boolean(),
})

const intervalSchema = z.object({
  type: z.enum(['light', 'heavy']),
  startedAt: z.number(),
  endedAt: z.number(),
  duration: z.number().positive(),
})

const intervalSummarySchema = z.object({
  config: intervalConfigSchema,
  intervals: z.array(intervalSchema),
})

export const createRunSchema = z.object({
  startedAt: z.iso.datetime(),
  endedAt: z.iso.datetime(),
  distance: z.number().positive(),
  duration: z.number().positive(),
  path: z.array(coordinateSchema).min(1),
  intervals: intervalSummarySchema.optional(),
})

export const monthQuerySchema = z
  .string()
  .regex(/^\d{4}-\d{2}$/, 'Format must be YYYY-MM')
  .optional()

export type CreateRunInput = z.infer<typeof createRunSchema>

