import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="text-text-primary flex w-full flex-1 items-center justify-center px-4 py-16">
      <div className="panel w-full max-w-md p-7 text-center sm:p-9">
        <p className="mono-label">404</p>
        <h1 className="font-700 mt-3 text-xl">페이지를 찾을 수 없습니다</h1>
        <p className="text-text-secondary mt-2 text-sm leading-6">
          주소가 정확한지 확인하거나 홈에서 다시 시작해주세요.
        </p>
        <Link href="/" className="btn-primary mt-7 w-full px-5">
          <ArrowLeftIcon className="size-4" />
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
