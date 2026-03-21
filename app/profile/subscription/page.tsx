import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '구독 설정 | 모베토 Moveto',
}

export default function Subscription() {
  return (
    <div className="flex flex-col gap-3 text-text-primary">
      <div className="font-display text-xl font-700">구독 관리</div>
      <div className="brutalist-card rounded-xl p-6 text-text-secondary">아직 지원하지 않는 기능입니다.</div>
      <Link
        href="/profile"
        className="w-full rounded-xl border-2 border-accent bg-accent p-2.5 px-4 text-center font-display font-700 text-white transition-colors hover:bg-accent-hover hover:border-accent-hover"
      >
        프로필 페이지
      </Link>
    </div>
  )
}
