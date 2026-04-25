import { type FC } from 'react'

type AuthHeaderProps = {
  title: string
  subtitle: string
}

export const AuthHeader: FC<AuthHeaderProps> = ({ title, subtitle }) => (
  <div className="text-center mb-8">
    <span className="text-5xl">🏃</span>
    <h1 className="text-2xl font-bold text-white mt-3">{title}</h1>
    <p className="text-foreground-muted text-sm mt-1">{subtitle}</p>
  </div>
)
