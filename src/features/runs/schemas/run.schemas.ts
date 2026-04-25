import { z } from 'zod'

import {coordinateSchema} from "./map.schemas";

export const intervalConfigSchema = z.object({
  total: z.number().int().positive(),
  lightDurationSec: z.number().positive(),
  heavyDurationSec: z.number().positive(),
  startWithHeavy: z.boolean(),
  voiceEnabled: z.boolean(),
})

export const intervalSchema = z.object({
  type: z.enum(['light', 'heavy']),
  startedAt: z.number(),
  endedAt: z.number(),
  duration: z.number().positive(),
})

export const intervalSummarySchema = z.object({
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

export type CreateRunInput = z.infer<typeof createRunSchema>
