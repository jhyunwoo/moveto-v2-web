'use client'

import { ShareIcon } from '@heroicons/react/24/outline'

export default function ShareButton({ title, url }: { title: string; url: string }) {
  return (
    <button type={'button'}>
      <ShareIcon
        className={'size-6'}
        onClick={async () => {
          try {
            await window?.navigator?.share({
              title,
              url,
            })
          } catch {
            await window.navigator.clipboard.writeText(url)
            alert('URL이 복사되었습니다')
          }
        }}
      />
    </button>
  )
}
