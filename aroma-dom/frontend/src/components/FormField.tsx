import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  hint?: string
  children: ReactNode
}

export function FormField({ label, hint, children }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-bold text-accent">{label}</span>
      {children}
      {hint && <span className="text-sm text-gray-600">{hint}</span>}
    </label>
  )
}
