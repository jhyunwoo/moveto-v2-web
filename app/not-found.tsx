import Link from 'next/link'

export default function NotFound() {
  return (
    <div className={'w-full h-screen text-white flex flex-col items-center justify-center p-4'}>
      <div className={'flex flex-col w-full max-w-lg p-4'}>
        <h1 className={'text-4xl font-bold'}>404</h1>
        <div className={'text-3xl font-bold'}>Not Found</div>
        <div>페이지를 찾을 수 없습니다.</div>
        <div className={'text-sm text-neutral-400'}>Powered by Moveto Team</div>
      </div>
      <Link
        href={'/'}
        className={'bg-neutral-50 text-neutral-950 p-2 rounded-xl px-2 w-full max-w-lg text-center font-semibold'}
      >
        홈 페이지로 돌아가기
      </Link>
    </div>
  )
}
