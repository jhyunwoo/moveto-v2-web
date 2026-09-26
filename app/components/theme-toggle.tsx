'use client'

import { useTheme } from '@/lib/stores/theme'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'

const themeMeta = {
  light: { label: '라이트 모드', Icon: SunIcon, next: 'dark' },
  dark: { label: '다크 모드', Icon: MoonIcon, next: 'system' },
  system: { label: '시스템 설정', Icon: ComputerDesktopIcon, next: 'light' },
} as const

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { label, Icon, next } = themeMeta[theme]

  return (
    <button
      onClick={() => setTheme(next)}
      type="button"
      className="icon-button"
      title={label}
      aria-label={`테마 변경, 현재 ${label}`}
    >
      <Icon className="size-[18px]" />
    </button>
  )
}
