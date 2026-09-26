'use client'

import { useEffect } from 'react'
import { motion, useSpring, useTransform } from 'motion/react'

export default function AnimatedNumber({ value, className }: { value: number; className?: string }) {
  const spring = useSpring(value, { stiffness: 140, damping: 24 })
  const rounded = useTransform(spring, latest => Math.round(latest))

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return <motion.span className={className}>{rounded}</motion.span>
}
