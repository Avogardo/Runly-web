import { z } from 'zod'

export const monthQuerySchema = z
  .string()
  .regex(/^\d{4}-\d{2}$/, 'Format must be YYYY-MM')
  .optional()
