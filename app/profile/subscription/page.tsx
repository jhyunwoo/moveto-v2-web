import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '구독 설정 | 모베토 Moveto',
}

export default function Subscription() {
  return (
    <div className={'flex flex-col gap-2 text-white'}>
      <div>구독 관리</div>
      <div>아직 지원하지 않는 기능입니다.</div>
      <Link href={'/profile'} className={'w-full rounded-xl bg-neutral-100 p-2 px-4 text-center text-neutral-950'}>
        프로필 페이지
      </Link>
    </div>
  )
}
