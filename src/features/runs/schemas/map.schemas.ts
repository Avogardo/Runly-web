import { z } from 'zod'

const MIN_LATITUDE = -90
const MAX_LATITUDE = 90
const MIN_LONGITUDE = -180
const MAX_LONGITUDE = 180

export const coordinateSchema = z.object({
  latitude: z.number().min(MIN_LATITUDE).max(MAX_LATITUDE),
  longitude: z.number().min(MIN_LONGITUDE).max(MAX_LONGITUDE),
  timestamp: z.number(),
})
