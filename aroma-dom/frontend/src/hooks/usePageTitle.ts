import { useEffect } from 'react'

const COMPANY_NAME = 'Арома Дом'

export function usePageTitle(title: string): void {
  useEffect(() => {
    document.title = `${title} — ${COMPANY_NAME}`
  }, [title])
}
