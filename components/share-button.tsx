'use client'

import { ShareIcon } from '@heroicons/react/24/outline'

export default function ShareButton({ url }: { url: string }) {
  return (
    <button
      type={'button'}
      className={
        'flex items-center gap-1 rounded-full bg-white p-2 px-4 font-semibold text-black transition-colors hover:bg-neutral-200'
      }
      onClick={async () => {
        await window.navigator.clipboard.writeText(url)
        alert('링크가 복사되었습니다')
      }}
    >
      <ShareIcon className={'size-5'} />
      <div>링크 복사</div>
    </button>
  )
}
