import type { CSSProperties, ReactNode } from 'react'

export default function HomeEntrance({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <div
      className={`home-entrance ${className ?? ''}`}
      style={{ '--home-entrance-delay': `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  )
}
