'use client'

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Orb 1: Violet - Moves automatically and slightly towards mouse */}
      <motion.div
        className="absolute h-[50vh] w-[50vh] rounded-full bg-violet-400/30 mix-blend-multiply blur-[100px] dark:bg-violet-600/20 dark:mix-blend-screen"
        animate={{
          x: mousePosition.x / 4 - 100,
          y: mousePosition.y / 4 - 100,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 2 }}
        style={{ left: '10%', top: '20%' }}
      />
      
      {/* Orb 2: Cyan - Slow ambient movement */}
      <motion.div
        className="absolute h-[60vh] w-[60vh] rounded-full bg-cyan-400/20 mix-blend-multiply blur-[120px] dark:bg-cyan-600/15 dark:mix-blend-screen"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{ right: '5%', top: '10%' }}
      />

      {/* Orb 3: Purple - Slow ambient movement at bottom */}
      <motion.div
        className="absolute h-[70vh] w-[70vh] rounded-full bg-purple-400/20 mix-blend-multiply blur-[150px] dark:bg-purple-600/15 dark:mix-blend-screen"
        animate={{
          x: [0, -150, 50, 0],
          y: [0, 100, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{ left: '25%', bottom: '-10%' }}
      />
    </div>
  )
}
