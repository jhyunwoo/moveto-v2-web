import Link from 'next/link'

export default function Footer() {
  return (
    <div className={'flex w-full bg-neutral-900 p-4'}>
      <div className={'flex w-full max-w-4xl flex-col'}>
        <div className={'text-sm text-neutral-300'}>
          Copyright © 2024{' '}
          <Link href={'https://team.moveto.kr'} className={'hover:underline'}>
            Moveto Team
          </Link>
          . 모든 권리 보유.
        </div>
        <div className={'flex gap-2 py-2 text-xs text-neutral-400'}>
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
