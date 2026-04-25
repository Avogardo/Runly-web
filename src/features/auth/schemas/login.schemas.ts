import { z } from 'zod'
import { MIN_PASSWORD_LENGTH } from '@/consts'

export const registerSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`),
  name: z.string().min(1).optional(),
})

export type RegisterInput = z.infer<typeof registerSchema>
