import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-4 text-text-primary">
      <div className="brutalist-card flex w-full max-w-md flex-col gap-4 rounded-2xl p-8">
        <h1 className="font-display text-7xl font-800 tracking-tight">404</h1>
        <div className="text-lg text-text-secondary">페이지를 찾을 수 없습니다.</div>
        <Link
          href="/"
          className="mt-2 w-full rounded-xl border-2 border-accent bg-accent p-3 text-center font-display font-700 text-white transition-colors hover:bg-accent-hover hover:border-accent-hover"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
