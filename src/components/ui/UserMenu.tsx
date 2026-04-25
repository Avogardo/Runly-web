import { type FC } from 'react'
import { signOut } from '@/lib/auth'

type Props = {
  userName: string | null | undefined
  userEmail: string | null | undefined
  signOutLabel: string
}

const UserMenu: FC<Props> = ({ userName, userEmail, signOutLabel }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-white/40 hidden sm:block">{userName ?? userEmail}</span>
      <form
        action={async () => {
          'use server'
          await signOut({ redirectTo: '/login' })
        }}
      >
        <button
          type="submit"
          className="text-xs px-3 py-1.5 rounded-lg bg-white/6 border border-white/10 text-white/50 hover:text-white hover:border-purple-500/30 transition-all duration-200"
        >
          {signOutLabel}
        </button>
      </form>
    </div>
  )
}

export default UserMenu
