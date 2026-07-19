'use client'

import { useTheme } from '@/lib/stores/theme'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  function cycleTheme() {
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    setTheme(next)
  }

  return (
    <button
      onClick={cycleTheme}
      type="button"
      className="icon-button cursor-pointer"
      title={theme === 'light' ? '라이트 모드' : theme === 'dark' ? '다크 모드' : '시스템 설정'}
    >
      {theme === 'light' && <SunIcon className="size-[19px]" />}
      {theme === 'dark' && <MoonIcon className="size-[19px]" />}
      {theme === 'system' && <ComputerDesktopIcon className="size-[19px]" />}
    </button>
  )
}
