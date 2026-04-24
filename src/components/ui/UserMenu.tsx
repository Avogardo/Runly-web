'use client'

import { signOut } from 'next-auth/react'

type Props = {
  userName: string | null | undefined
  userEmail: string | null | undefined
}

export default function UserMenu({ userName, userEmail }: Props) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-white/40 hidden sm:block">
        {userName ?? userEmail}
      </span>
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/10 text-white/50 hover:text-white hover:border-purple-500/30 transition-all duration-200"
      >
        Sign out
      </button>
    </div>
  )
}

