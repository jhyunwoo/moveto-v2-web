'use client'

import { LinkIcon } from '@heroicons/react/24/outline'
import { useToastStore } from '@/lib/stores/toast'

export default function ShareButton({ url }: { url: string }) {
  const addToast = useToastStore((store) => store.addToast)

  return (
    <button
      type="button"
      className="btn-secondary w-fit shrink-0 cursor-pointer px-4"
      onClick={async () => {
        try {
          await window.navigator.clipboard.writeText(url)
          addToast('공유 링크가 복사되었습니다.')
        } catch {
          addToast('링크를 복사하지 못했습니다.', 'error')
        }
      }}
    >
      <LinkIcon className="size-[18px]" />
      링크 복사
    </button>
  )
}
