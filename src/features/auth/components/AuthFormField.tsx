import { FC, type ReactNode } from 'react'

const INPUT_CLASS =
  'bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-purple-500/50 focus:bg-white/[0.06] transition-all duration-200 outline-none'

type AuthFormFieldProps = {
  id: string
  label: ReactNode
  type?: string
  required?: boolean
  autoComplete?: string
  placeholder?: string
  minLength?: number
}

export const AuthFormField: FC<AuthFormFieldProps> = ({
  id,
  label,
  type = 'text',
  required,
  autoComplete,
  placeholder,
  minLength,
}) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-xs text-foreground-muted uppercase tracking-wider">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      required={required}
      autoComplete={autoComplete}
      className={INPUT_CLASS}
      placeholder={placeholder}
      minLength={minLength}
    />
  </div>
)
