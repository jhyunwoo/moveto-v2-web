'use client'

import { motion } from 'motion/react'
import useHydratedReducedMotion from '@/lib/hooks/use-hydrated-reduced-motion'

const COLS = 16
const ROWS = 3
const CELLS = COLS * ROWS

export default function PacketGrid({ progress, generating }: { progress: number; generating: boolean }) {
  const reduceMotion = useHydratedReducedMotion()
  const filled = Math.round((Math.min(100, Math.max(0, progress)) / 100) * CELLS)

  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      role="progressbar"
      aria-label="전체 업로드 진행률"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={generating ? 100 : progress}
    >
      {Array.from({ length: CELLS }, (_, index) => {
        const isOn = generating || index < filled
        const wave = (index % COLS) + Math.floor(index / COLS)
        return (
          <motion.span
            key={index}
            className={`aspect-square rounded-[2px] transition-colors duration-300 ${isOn ? 'bg-accent' : 'bg-border-subtle'}`}
            animate={
              reduceMotion
                ? undefined
                : generating
                  ? { scale: [0.6, 1, 0.6], opacity: [0.35, 1, 0.35] }
                  : { scale: isOn ? 1 : 0.72, opacity: 1 }
            }
            transition={
              generating
                ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: wave * 0.05 }
                : { type: 'spring', stiffness: 520, damping: 16 }
            }
          />
        )
      })}
    </div>
  )
}
