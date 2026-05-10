'use client'

import { ShareIcon } from '@heroicons/react/24/outline'
import { useToastStore } from '@/lib/stores/toast'

export default function ShareButton({ url }: { url: string }) {
  const addToast = useToastStore((s) => s.addToast)

  return (
    <button
      type="button"
      className="flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border-2 border-accent bg-accent px-2.5 py-1.5 font-display text-xs font-600 text-white transition-colors hover:border-accent-hover hover:bg-accent-hover sm:gap-1.5 sm:px-3 sm:text-sm"
      onClick={async () => {
        await window.navigator.clipboard.writeText(url)
        addToast('링크가 복사되었습니다.')
      }}
    >
      <ShareIcon className="size-4 sm:size-4" />
      <div>링크 복사</div>
    </button>
  )
}
