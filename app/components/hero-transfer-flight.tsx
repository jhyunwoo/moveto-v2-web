'use client'

import { motion } from 'motion/react'
import useHydratedReducedMotion from '@/lib/hooks/use-hydrated-reduced-motion'
import { DocumentChartBarIcon, PhotoIcon, TableCellsIcon } from '@heroicons/react/24/outline'

const floatingFiles = [
  {
    label: 'PDF',
    className: 'right-[8%] top-[3%] text-[#ff654f]',
    Icon: DocumentChartBarIcon,
    duration: 6.4,
    delay: 0.2,
    rotate: -5,
  },
  {
    label: 'IMG',
    className: 'right-[25%] top-[32%] text-[#1463ff]',
    Icon: PhotoIcon,
    duration: 7.2,
    delay: 0.8,
    rotate: 6,
  },
  {
    label: 'XLS',
    className: 'right-[42%] top-[62%] text-[#21b997]',
    Icon: TableCellsIcon,
    duration: 6.8,
    delay: 1.3,
    rotate: 5,
  },
]

export default function HeroTransferFlight() {
  const reduceMotion = useHydratedReducedMotion()

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 hidden h-[430px] overflow-hidden lg:block"
      aria-hidden="true"
    >
      <svg className="absolute inset-0 size-full" viewBox="0 0 1280 430" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="flight-line" x1="1190" y1="10" x2="490" y2="420" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1463ff" stopOpacity="0" />
            <stop offset="0.26" stopColor="#1463ff" stopOpacity="0.28" />
            <stop offset="0.72" stopColor="#1463ff" stopOpacity="0.82" />
            <stop offset="1" stopColor="#1463ff" />
          </linearGradient>
          <filter id="flight-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {[0, 1, 2].map(index => (
          <motion.path
            key={index}
            d={`M ${1260 + index * 14} ${22 + index * 26} C 1100 ${92 + index * 18}, 1010 ${74 + index * 22}, 900 ${146 + index * 14} C 770 ${232 + index * 6}, 690 ${174 + index * 12}, 602 ${292 + index * 12} C 560 ${344 + index * 8}, 532 ${384 + index * 5}, 492 430`}
            stroke="#1463ff"
            strokeWidth={index === 1 ? 1.7 : 1}
            strokeOpacity={index === 1 ? 0.2 : 0.09}
            initial={false}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 1.7, delay: 0.25 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        <motion.path
          d="M 1260 49 C 1112 102, 1024 104, 900 157 C 770 213, 704 220, 620 292 C 564 340, 532 388, 492 430"
          stroke="url(#flight-line)"
          strokeWidth="3.2"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 2.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.circle
          cx="0"
          cy="0"
          r="3.5"
          fill="#1463ff"
          filter="url(#flight-glow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={reduceMotion ? { opacity: 0 } : { offsetDistance: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
          style={{
            offsetPath:
              "path('M 1260 49 C 1112 102, 1024 104, 900 157 C 770 213, 704 220, 620 292 C 564 340, 532 388, 492 430')",
          }}
          transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
        />
      </svg>

      {floatingFiles.map(({ label, className, Icon, duration, delay, rotate }) => (
        <motion.div
          key={label}
          className={`absolute flex h-[78px] w-[62px] flex-col items-center justify-center rounded-[15px] border border-white/90 bg-white/82 shadow-[0_18px_45px_rgba(22,66,125,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111827]/88 ${className}`}
          initial={false}
          animate={
            reduceMotion
              ? { opacity: 1, y: 0, rotate }
              : { opacity: 1, y: [0, -9, 0], rotate: [rotate, rotate + 2, rotate] }
          }
          transition={{
            opacity: { duration: 0.7, delay },
            y: { duration, delay, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration, delay, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <Icon className="size-6" />
          <span className="font-800 mt-1 text-[9px] tracking-[0.08em]">{label}</span>
        </motion.div>
      ))}

      <motion.span
        className="absolute top-[45%] right-[16%] size-1.5 rounded-full bg-[#ff725f]"
        animate={reduceMotion ? undefined : { scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span className="absolute top-[39%] right-[38%] size-1 rounded-full bg-[#43d7bb]" />
    </div>
  )
}
