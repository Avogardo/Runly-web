'use client'

import { useTransition } from 'react'
import { deleteRun } from '@/features/runs/actions'

type Props = {
  runId: string
}

export default function DeleteRunButton({ runId }: Props) {
  const [pending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm('Are you sure you want to delete this run? This cannot be undone.')) {
      return
    }

    startTransition(() => deleteRun(runId))
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Deleting...' : 'Delete run'}
    </button>
  )
}

