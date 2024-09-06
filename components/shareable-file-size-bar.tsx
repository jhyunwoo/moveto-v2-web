import { motion } from 'framer-motion'

export default function ShareableFileSizeBar({
  totalStorage,
  usedStorage,
}: {
  totalStorage: number
  usedStorage: number
}) {
  const leftStorage = totalStorage - usedStorage
  return (
    <div className={`h-2 w-full rounded-full ${leftStorage < 0 ? 'bg-red-500' : 'bg-neutral-700'}`}>
      <motion.div
        initial={{ width: '100%' }}
        animate={{
          width: `${(leftStorage / totalStorage) * 100}%`,
          opacity: leftStorage < 0 ? 0 : 1,
        }}
        transition={{ duration: 1 }}
        className={'h-2 rounded-full bg-sky-500'}
      />
    </div>
  )
}
