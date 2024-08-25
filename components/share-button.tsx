'use client'

import { ShareIcon } from '@heroicons/react/24/outline'

export default function ShareButton({ title, url }: { title: string; url: string }) {
  return (
    <button
      type={'button'}
      className={
        'p-2 px-4 font-semibold rounded-full flex gap-1 items-center bg-white text-black hover:bg-neutral-200 transition-colors'
      }
      onClick={async () => {
        try {
          await window?.navigator?.share({
            title,
            url,
          })
        } catch {
          await window.navigator.clipboard.writeText(url)
          alert('링크가 복사되었습니다')
        }
      }}
    >
      <ShareIcon className={'size-5'} />
      <div>공유</div>
    </button>
  )
}
