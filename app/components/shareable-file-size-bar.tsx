import { motion } from 'motion/react'

export default function ShareableFileSizeBar({
  totalStorage,
  usedStorage,
}: {
  totalStorage: number
  usedStorage: number
}) {
  const leftStorage = totalStorage - usedStorage

  return (
    <div className={`my-1 h-2.5 w-full overflow-hidden rounded-full ${leftStorage < 0 ? 'bg-danger/20' : 'bg-border-subtle'}`}>
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{
          scaleX: Math.max(0, leftStorage / totalStorage),
          opacity: leftStorage < 0 ? 0 : 1,
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ willChange: 'transform', transformOrigin: 'left' }}
        className="h-full w-full rounded-full bg-accent"
      />
    </div>
  )
}
