'use client'

import { type FC, useActionState } from 'react'
import { deleteRun } from '../actions'

type Props = {
  runId: string
  deleteLabel: string
  deletingLabel: string
  confirmMessage: string
}

export const DeleteRunButton: FC<Props> = ({ runId, deleteLabel, deletingLabel, confirmMessage }) => {
  const [state, action, pending] = useActionState(deleteRun, null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!confirm(confirmMessage)) {
      e.preventDefault()
    }
  }

  return (
    <form action={action} onSubmit={handleSubmit}>
      <input type="hidden" name="runId" value={runId} />
      {state?.error && (
        <span className="text-red-400 text-xs mr-2">{state.error}</span>
      )}
      <button
        type="submit"
        disabled={pending}
        className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? deletingLabel : deleteLabel}
      </button>
    </form>
  )
}
