'use client'

import { motion } from 'motion/react'
import useHydratedReducedMotion from '@/lib/hooks/use-hydrated-reduced-motion'

export default function AnimatedBackground() {
  const shouldReduceMotion = useHydratedReducedMotion()

  return (
    <div className="ambient-backdrop" aria-hidden="true">
      <svg
        className="ambient-backdrop__art"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMin slice"
        focusable="false"
      >
        <defs>
          <linearGradient id="moveto-flight-line" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--ambient-cobalt)" stopOpacity="0" />
            <stop offset="0.32" stopColor="var(--ambient-cobalt)" stopOpacity="0.18" />
            <stop offset="0.72" stopColor="var(--ambient-cobalt)" stopOpacity="0.42" />
            <stop offset="1" stopColor="var(--ambient-cobalt)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="moveto-flight-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--ambient-cobalt)" stopOpacity="0" />
            <stop offset="0.62" stopColor="var(--ambient-cobalt)" stopOpacity="0.12" />
            <stop offset="1" stopColor="var(--ambient-cobalt)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.g
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -6, 0] }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { opacity: { duration: 1.2 }, y: { duration: 13, ease: 'easeInOut', repeat: Infinity } }
          }
        >
          <path
            className="ambient-backdrop__path ambient-backdrop__path--soft"
            d="M 510 520 C 760 515, 725 310, 984 302 S 1284 112, 1640 54"
            stroke="url(#moveto-flight-fade)"
          />
          <path
            className="ambient-backdrop__path ambient-backdrop__path--soft"
            d="M 570 548 C 780 522, 780 352, 1026 330 S 1320 152, 1648 86"
            stroke="url(#moveto-flight-fade)"
          />
          <motion.path
            className="ambient-backdrop__path ambient-backdrop__path--primary"
            d="M 610 558 C 808 508, 786 370, 1025 347 S 1306 162, 1642 98"
            stroke="url(#moveto-flight-line)"
            initial={shouldReduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.8, delay: 0.25, ease: 'easeOut' }}
          />
        </motion.g>

        <g className="ambient-backdrop__confetti">
          <motion.circle
            cx="824"
            cy="332"
            r="3"
            fill="var(--ambient-coral)"
            animate={shouldReduceMotion ? undefined : { opacity: [0.45, 1, 0.45], scale: [0.85, 1.15, 0.85] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx="963" cy="264" r="2.5" fill="var(--ambient-mint)" />
          <circle cx="1118" cy="208" r="2.5" fill="var(--ambient-cobalt)" />
          <motion.circle
            cx="1276"
            cy="126"
            r="2.5"
            fill="var(--ambient-coral)"
            animate={shouldReduceMotion ? undefined : { y: [0, -8, 0], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx="1398" cy="102" r="2" fill="var(--ambient-mint)" />
        </g>
      </svg>
    </div>
  )
}
