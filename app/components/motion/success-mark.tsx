'use client'

import { motion } from 'motion/react'
import useHydratedReducedMotion from '@/lib/hooks/use-hydrated-reduced-motion'

const ease = [0.23, 1, 0.32, 1] as const
const PARTICLES = 12

export default function SuccessMark() {
  const reduceMotion = useHydratedReducedMotion()

  return (
    <div aria-hidden="true" className="relative size-12 shrink-0">
      {!reduceMotion
        ? Array.from({ length: PARTICLES }, (_, index) => {
            const angle = (index / PARTICLES) * Math.PI * 2
            const distance = index % 2 ? 30 : 40
            return (
              <motion.span
                key={index}
                className={`absolute top-1/2 left-1/2 -mt-[3px] -ml-[3px] size-1.5 rounded-full ${
                  index % 3 ? 'bg-accent' : 'bg-text-primary'
                }`}
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{ delay: 0.5, duration: 0.9, ease }}
              />
            )
          })
        : null}
      <svg viewBox="0 0 48 48" className="relative size-12">
        <motion.circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          className="stroke-accent"
          strokeWidth="2"
          initial={reduceMotion ? false : { pathLength: 0, rotate: -90 }}
          animate={{ pathLength: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease }}
        />
        <motion.path
          d="M15 24.5l6 6 12-13"
          fill="none"
          className="stroke-accent"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.45, duration: 0.4, ease }}
        />
      </svg>
    </div>
  )
}
