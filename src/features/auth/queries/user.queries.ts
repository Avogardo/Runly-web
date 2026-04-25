import { hash } from 'bcryptjs'
import { prisma } from '@/lib/db'
import { BCRYPT_SALT_ROUNDS } from '@/consts'

/**
 * Create a new user. Returns the created user or null if email is taken.
 */
export async function createUser(email: string, password: string, name?: string) {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return null

  const hashedPassword = await hash(password, BCRYPT_SALT_ROUNDS)

  return prisma.user.create({
    data: { email, hashedPassword, name },
    select: { id: true, email: true, name: true, createdAt: true },
  })
}
