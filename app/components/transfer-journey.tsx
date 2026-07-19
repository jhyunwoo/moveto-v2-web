'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import useHydratedReducedMotion from '@/lib/hooks/use-hydrated-reduced-motion'
import {
  ArrowUpTrayIcon,
  CheckIcon,
  ClipboardDocumentIcon,
  ClockIcon,
  DocumentChartBarIcon,
  PhotoIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline'

const ease = [0.16, 1, 0.3, 1] as const

function StepNumber({ children }: { children: string }) {
  return (
    <span className="bg-accent font-800 flex size-12 shrink-0 items-center justify-center rounded-full text-sm text-white shadow-[0_10px_30px_rgba(20,99,255,0.24)]">
      {children}
    </span>
  )
}

function UploadScene() {
  return (
    <div className="journey-scene journey-upload-scene">
      <div className="absolute top-0 left-[10%] flex gap-2">
        <span className="journey-file journey-file--photo text-accent">
          <PhotoIcon className="size-6" />
        </span>
        <span className="journey-file journey-file--sheet text-[#21b997]">
          <TableCellsIcon className="size-6" />
        </span>
        <span className="journey-file journey-file--report text-[#ff654f]">
          <DocumentChartBarIcon className="size-6" />
        </span>
      </div>
      <div className="border-accent/55 bg-accent/[0.035] absolute inset-x-[7%] bottom-0 flex h-[118px] items-center justify-center rounded-[22px] border border-dashed">
        <ArrowUpTrayIcon className="text-accent size-9" />
      </div>
    </div>
  )
}

function SettingScene() {
  return (
    <div className="journey-scene flex flex-col items-center justify-center gap-3">
      <div className="journey-setting-card border-border-primary bg-surface-elevated w-[210px] rounded-2xl border p-3.5 shadow-[0_18px_50px_rgba(20,55,82,0.08)] backdrop-blur-xl">
        <span className="font-700 text-text-muted mb-2 flex items-center gap-1.5 text-[11px]">
          <ClockIcon className="size-3.5" /> 보관 시간
        </span>
        <div className="border-border-primary bg-surface font-650 text-text-primary flex h-10 items-center justify-between rounded-xl border px-3 text-sm">
          24시간 <span className="text-text-muted">⌄</span>
        </div>
      </div>
      <div className="journey-code-card border-border-primary bg-surface ml-20 rounded-2xl border px-5 py-3 text-center shadow-[0_14px_36px_rgba(20,55,82,0.08)]">
        <span className="font-600 text-text-muted block text-[10px]">한글 코드가 생성됩니다</span>
        <strong className="font-800 text-accent mt-1 block text-[17px]">파란 · 여름 · 바다</strong>
      </div>
    </div>
  )
}

function DeliveryScene() {
  return (
    <div className="journey-scene flex items-end justify-center">
      <div className="journey-code-pill border-border-primary bg-surface-elevated absolute top-6 left-6 flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-[0_18px_44px_rgba(20,55,82,0.08)] backdrop-blur-xl">
        <strong className="font-800 text-accent text-sm">파란 · 여름 · 바다</strong>
        <ClipboardDocumentIcon className="text-text-muted size-4" />
      </div>
      <div className="folder-illustration" aria-hidden="true">
        <div className="folder-back" />
        <div className="folder-front" />
        <motion.span
          className="folder-check"
          initial={{ transform: 'scale(0.92)', opacity: 0 }}
          whileInView={{ transform: 'scale(1)', opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.55, delay: 0.2, ease }}
        >
          <CheckIcon className="size-7 stroke-[2.5]" />
        </motion.span>
      </div>
    </div>
  )
}

const steps = [
  {
    number: '01',
    title: '파일 선택',
    description: '기기에서 고르거나 화면에 바로 놓으세요.',
    Scene: UploadScene,
  },
  {
    number: '02',
    title: '공유 설정',
    description: '필요한 보관 시간을 선택하세요.',
    Scene: SettingScene,
  },
  {
    number: '03',
    title: '한글 코드 전달',
    description: '생성된 코드나 링크를 상대에게 보내세요.',
    Scene: DeliveryScene,
  },
]

export default function TransferJourney() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useHydratedReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.35'],
  })
  const pathLength = useSpring(scrollYProgress, { stiffness: 85, damping: 24, mass: 0.45 })

  return (
    <section
      ref={sectionRef}
      className="journey-section relative mx-auto w-full max-w-[1504px] scroll-mt-24 px-4 pt-28 pb-24 sm:px-6 sm:pt-36 sm:pb-32 lg:px-10 lg:pt-[clamp(10rem,12vw,13rem)] lg:pb-40"
      aria-labelledby="journey-title"
    >
      <motion.h2
        id="journey-title"
        className="font-800 text-text-primary max-w-5xl scroll-mt-28 text-[clamp(2.4rem,4vw,4rem)] leading-[1.02] tracking-[-0.055em]"
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease }}
      >
        세 번의 움직임이면 충분해요.
      </motion.h2>

      <div className="relative mt-20 lg:mt-24">
        <svg
          className="pointer-events-none absolute inset-x-[4%] top-[180px] hidden h-[180px] w-[92%] lg:block"
          viewBox="0 0 1200 180"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 20 102 C 180 18, 280 166, 420 100 S 650 45, 780 105 S 1030 170, 1180 74"
            stroke="var(--accent-soft-strong)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <motion.path
            d="M 20 102 C 180 18, 280 166, 420 100 S 650 45, 780 105 S 1030 170, 1180 74"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ pathLength: reduceMotion ? 1 : pathLength }}
          />
        </svg>

        <ol className="grid gap-24 lg:grid-cols-3 lg:gap-16">
          {steps.map(({ number, title, description, Scene }, index) => (
            <motion.li
              key={number}
              className={`relative ${index === 1 ? 'lg:translate-y-8' : index === 2 ? 'lg:translate-y-1' : ''}`}
              initial={reduceMotion ? false : { opacity: 0, transform: 'translateY(30px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75, delay: index * 0.12, ease }}
            >
              <article>
                <div className="flex items-start gap-4">
                  <StepNumber>{number}</StepNumber>
                  <div className="pt-0.5">
                    <h3 className="font-800 text-text-primary text-xl tracking-[-0.025em]">{title}</h3>
                    <p className="text-text-secondary mt-2 max-w-[240px] text-[15px] leading-6 break-keep">
                      {description}
                    </p>
                  </div>
                </div>
                <Scene />
              </article>
            </motion.li>
          ))}
        </ol>
      </div>

      <motion.div
        className="closing-panel border-border-primary bg-surface-elevated relative mt-32 overflow-hidden rounded-[30px] border px-6 py-14 shadow-[0_28px_90px_rgba(20,55,82,0.08)] backdrop-blur-xl sm:mt-40 sm:px-10 lg:mt-[clamp(9rem,12vw,12rem)] lg:grid lg:min-h-[350px] lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-16"
        initial={reduceMotion ? false : { opacity: 0, transform: 'translateY(34px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0)' }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ duration: 0.85, ease }}
      >
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-800 text-text-primary text-[clamp(2.25rem,3vw,2.75rem)] leading-[1.08] tracking-[-0.045em] break-keep">
            보내는 순간부터, 도착하는 순간까지.
          </h2>
          <p className="text-text-secondary mt-6 max-w-xl text-base leading-7 break-keep sm:text-lg">
            설치도, 복잡한 가입도 필요 없어요. 파일은 만료 시간이 지나면 자동으로 사라집니다.
          </p>
        </div>
        <div className="relative mt-14 flex h-[190px] items-center justify-center lg:mt-0 lg:h-full">
          <div className="closing-flight-lines" aria-hidden="true" />
          <div className="folder-illustration folder-illustration-large" aria-hidden="true">
            <div className="folder-back" />
            <div className="folder-front" />
            <motion.span
              className="folder-check"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      transform: [
                        'translateY(0) rotate(0deg)',
                        'translateY(-7px) rotate(2deg)',
                        'translateY(0) rotate(0deg)',
                      ],
                    }
              }
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <CheckIcon className="size-8 stroke-[2.5]" />
            </motion.span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
