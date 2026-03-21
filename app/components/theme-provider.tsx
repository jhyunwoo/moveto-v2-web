'use client'

import { ReactNode, useEffect } from 'react'
import { useTheme } from '@/lib/stores/theme'

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
    if (saved) {
      setTheme(saved)
    }
  }, [setTheme])

  useEffect(() => {
    if (theme !== 'system') return

    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      document.documentElement.classList.toggle('dark', mql.matches)
    }
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [theme])

  return <>{children}</>
}
