'use client'

import { useTheme } from '@/lib/stores/theme'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'motion/react'
import useHydratedReducedMotion from '@/lib/hooks/use-hydrated-reduced-motion'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const shouldReduceMotion = useHydratedReducedMotion()
  const themeLabel = theme === 'light' ? '라이트 모드' : theme === 'dark' ? '다크 모드' : '시스템 설정'
  const ThemeIcon = theme === 'light' ? SunIcon : theme === 'dark' ? MoonIcon : ComputerDesktopIcon

  function cycleTheme() {
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    setTheme(next)
  }

  return (
    <motion.button
      onClick={cycleTheme}
      type="button"
      className="icon-button relative cursor-pointer overflow-hidden"
      title={themeLabel}
      aria-label={`테마 변경, 현재 ${themeLabel}`}
      whileHover={shouldReduceMotion ? undefined : { transform: 'translateY(-1px)' }}
      whileTap={shouldReduceMotion ? undefined : { transform: 'scale(0.94)' }}
      transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="absolute inset-0 flex items-center justify-center"
          initial={shouldReduceMotion ? false : { opacity: 0, transform: 'rotate(-8deg) scale(0.96)' }}
          animate={{ opacity: 1, transform: 'rotate(0deg) scale(1)' }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'rotate(8deg) scale(0.96)' }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.16, ease: [0.23, 1, 0.32, 1] }}
        >
          <ThemeIcon className="size-[19px]" />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
