'use client'

import { motion, type Variants } from 'motion/react'
import useHydratedReducedMotion from '@/lib/hooks/use-hydrated-reduced-motion'

const charVariants: Variants = {
  hidden: { y: '110%', rotate: 6 },
  show: (index: number) => ({
    y: 0,
    rotate: 0,
    transition: { delay: index * 0.035, duration: 0.8, ease: [0.23, 1, 0.32, 1] },
  }),
}

export default function SplitTitle({ id, lines, className }: { id?: string; lines: string[]; className?: string }) {
  const reduceMotion = useHydratedReducedMotion()
  let charIndex = 0

  return (
    <motion.h1
      id={id}
      className={className}
      aria-label={lines.join(' ')}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      {lines.map(line => (
        <span key={line} aria-hidden="true" className="block overflow-hidden pb-[0.08em]">
          {Array.from(line).map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              className="inline-block origin-bottom-left"
              variants={charVariants}
              custom={charIndex++}
            >
              {char === ' ' ? '\u00a0' : char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  )
}
