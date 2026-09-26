'use client'

import { motion } from 'motion/react'
import useHydratedReducedMotion from '@/lib/hooks/use-hydrated-reduced-motion'

const ease = [0.23, 1, 0.32, 1] as const

export default function StepTrack({ steps }: { steps: { title: string; description: string }[] }) {
  const reduceMotion = useHydratedReducedMotion()

  return (
    <motion.section
      aria-label="이용 절차"
      className="mt-16"
      initial={reduceMotion ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div aria-hidden="true" className="relative hidden h-3 sm:block">
        <motion.div
          className="bg-border-primary absolute top-1/2 right-0 left-0 h-px origin-left"
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease } } }}
        />
        {steps.map((step, index) => (
          <motion.span
            key={step.title}
            className="bg-surface border-text-primary absolute top-0 size-3 -translate-x-1/2 rounded-full border-2"
            style={{ left: `${(index / steps.length) * 100 + 0.5}%` }}
            variants={{
              hidden: { scale: 0 },
              show: {
                scale: 1,
                transition: { delay: 0.25 + index * 0.3, type: 'spring', stiffness: 500, damping: 18 },
              },
            }}
          />
        ))}
        {!reduceMotion ? (
          <motion.span
            className="bg-accent absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full"
            initial={{ left: '0%', opacity: 0 }}
            animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2, repeatDelay: 0.6 }}
          />
        ) : null}
      </div>
      <div className="border-border-subtle grid gap-px border-t pt-8 sm:mt-5 sm:grid-cols-3 sm:gap-8 sm:border-t-0 sm:pt-0">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            className="py-3 sm:py-0"
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { delay: 0.3 + index * 0.3, duration: 0.6, ease } },
            }}
          >
            <span className="mono-label">0{index + 1}</span>
            <h2 className="font-700 text-text-primary mt-2 text-base">{step.title}</h2>
            <p className="text-text-secondary mt-1 text-sm leading-6">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
