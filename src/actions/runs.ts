'use server'

import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteRun(runId: string) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const deleted = await prisma.run.deleteMany({
    where: { id: runId, userId: session.user.id },
  })

  if (deleted.count === 0) {
    throw new Error('Run not found')
  }

  revalidatePath('/')
  redirect('/')
}

