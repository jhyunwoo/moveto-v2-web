import Link from 'next/link'

export default function Footer() {
  return (
    <div className={'w-full p-4 bg-neutral-900 flex'}>
      <div className={'w-full max-w-4xl flex flex-col'}>
        <div className={'text-neutral-300 text-sm'}>
          Copyright © 2024{' '}
          <Link href={'https://team.moveto.kr'} className={'hover:underline'}>
            Moveto Team
          </Link>
          . 모든 권리 보유.
        </div>
        <div className={'flex gap-2 text-neutral-400 text-xs py-2'}>
          <Link href={'/privacy'} className={'hover:underline'}>
            개인정보 처리방침
          </Link>
          <Link href={'/terms'} className={'hover:underline'}>
            웹사이트 이용약관
          </Link>
        </div>
      </div>
    </div>
  )
}
