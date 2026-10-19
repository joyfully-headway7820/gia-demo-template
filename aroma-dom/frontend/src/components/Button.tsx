import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // primary — целевое действие, secondary — второстепенное (назад, переходы)
  variant?: 'primary' | 'secondary'
}

const VARIANT_CLASS_NAMES = {
  primary: 'bg-accent text-white hover:bg-accent-dark',
  secondary: 'border border-accent bg-white text-accent hover:bg-surface',
}

export function Button({ variant = 'primary', className = '', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`cursor-pointer rounded-md px-5 py-3 text-base font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASS_NAMES[variant]} ${className}`}
      {...props}
    />
  )
}
