'use client'

import type { CSSProperties } from 'react'
import { motion } from 'motion/react'
import useHydratedReducedMotion from '@/lib/hooks/use-hydrated-reduced-motion'

const COLS = 24
const ROWS = 9

const dots = Array.from({ length: COLS * ROWS }, (_, index) => {
  const x = index % COLS
  const y = Math.floor(index / COLS)
  return { index, x, y, distance: Math.hypot(x - (COLS - 1) / 2, (y - (ROWS - 1) / 2) * 1.6) }
})

export default function DotGrid({ pulseKey, active }: { pulseKey: number; active: boolean }) {
  const reduceMotion = useHydratedReducedMotion()
  const shouldPulse = pulseKey > 0 && !reduceMotion

  return (
    <div
      aria-hidden="true"
      className={`dot-grid pointer-events-none absolute inset-0 grid place-items-center p-5 ${active ? 'is-active' : ''}`}
      style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
    >
      {dots.map(dot => (
        <motion.span
          key={`${pulseKey}-${dot.index}`}
          className="flex"
          initial={false}
          animate={shouldPulse ? { scale: [1, 2.8, 1], y: [0, -6, 0] } : undefined}
          transition={{ delay: dot.distance * 0.03, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="dot-grid-dot" style={{ '--d': dot.x + dot.y } as CSSProperties} />
        </motion.span>
      ))}
    </div>
  )
}
