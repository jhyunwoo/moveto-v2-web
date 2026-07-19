import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] w-full items-center justify-center px-4 py-16 text-text-primary">
      <div className="document-panel w-full max-w-md p-7 text-center sm:p-9">
        <div className="text-6xl font-700">404</div>
        <h1 className="mt-5 text-xl font-700">페이지를 찾을 수 없습니다</h1>
        <p className="mt-2 text-sm leading-6 text-text-secondary">주소가 정확한지 확인하거나 홈에서 다시 시작해주세요.</p>
        <Link href="/" className="btn-primary mt-7 w-full px-5">
          <ArrowLeftIcon className="size-4" />
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
