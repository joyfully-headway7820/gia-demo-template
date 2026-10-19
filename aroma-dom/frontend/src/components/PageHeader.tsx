import type { ReactNode } from 'react'
import logo from '../assets/logo.svg'

interface PageHeaderProps {
  title: string
  // Логотип показывается только на главной форме
  showLogo?: boolean
  children?: ReactNode
}

export function PageHeader({ title, showLogo = false, children }: PageHeaderProps) {
  return (
    <header className="flex flex-wrap items-center gap-4 bg-surface px-6 py-4">
      {showLogo && <img src={logo} alt="Арома Дом" className="h-14 w-14" />}
      <h1 className="mr-auto text-2xl font-bold text-accent">{title}</h1>
      {children}
    </header>
  )
}
