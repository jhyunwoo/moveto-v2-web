import Link from 'next/link'

export default function NotFound() {
  return (
    <div className={'flex h-screen w-full flex-col items-center justify-center p-4 text-white'}>
      <div className={'flex w-full max-w-lg flex-col p-4'}>
        <h1 className={'text-4xl font-bold'}>404</h1>
        <div className={'text-3xl font-bold'}>Not Found</div>
        <div>페이지를 찾을 수 없습니다.</div>
        <div className={'text-sm text-neutral-400'}>Powered by Moveto Team</div>
      </div>
      <Link
        href={'/'}
        className={'w-full max-w-lg rounded-xl bg-neutral-50 p-2 px-2 text-center font-semibold text-neutral-950'}
      >
        홈 페이지로 돌아가기
      </Link>
    </div>
  )
}
