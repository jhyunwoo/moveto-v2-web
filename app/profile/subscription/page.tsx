import Link from 'next/link'

export default function Subscription() {
  return (
    <div className={'text-white flex flex-col gap-2'}>
      <div>구독 관리</div>
      <div>아직 지원하지 않는 기능입니다.</div>
      <Link href={'/profile'} className={'w-full bg-neutral-100 text-neutral-950 p-2 px-4 rounded-xl'}>
        프로필 페이지
      </Link>
    </div>
  )
}
