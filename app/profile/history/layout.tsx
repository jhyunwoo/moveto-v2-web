import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: '공유 기록 | 모베토 Moveto',
}

export default function HistoryLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
