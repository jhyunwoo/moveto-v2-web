'use client'

import { motion } from 'motion/react'
import useHydratedReducedMotion from '@/lib/hooks/use-hydrated-reduced-motion'

export default function CodeReveal({ code, className }: { code: string; className?: string }) {
  const reduceMotion = useHydratedReducedMotion()

  return (
    <strong className={className} aria-label={code}>
      {code.split(' ').map((word, wordIndex, words) => (
        <span key={`${word}-${wordIndex}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom">
          {Array.from(word).map((char, charIndex) => {
            const order = words.slice(0, wordIndex).join('').length + charIndex
            return (
              <motion.span
                key={`${char}-${charIndex}`}
                className="inline-block"
                initial={reduceMotion ? false : { y: '100%', opacity: 0, filter: 'blur(6px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.55 + order * 0.07, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              >
                {char}
              </motion.span>
            )
          })}
          {wordIndex < words.length - 1 ? '\u00a0' : null}
        </span>
      ))}
    </strong>
  )
}
