'use server'

import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type RunActionState = {
  error?: string
} | null

export async function deleteRun(
  _prevState: RunActionState,
  formData: FormData,
): Promise<RunActionState> {
  const runId = formData.get('runId') as string

  const session = await auth()
  if (!session?.user?.id) {
    return { error: 'Unauthorized' }
  }

  const deleted = await prisma.run.deleteMany({
    where: { id: runId, userId: session.user.id },
  })

  if (deleted.count === 0) {
    return { error: 'Run not found' }
  }

  revalidatePath('/')
  redirect('/')
}
