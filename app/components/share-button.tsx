'use client'

import { ShareIcon } from '@heroicons/react/24/outline'
import { useToastStore } from '@/lib/stores/toast'

export default function ShareButton({ url }: { url: string }) {
  const addToast = useToastStore((s) => s.addToast)

  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-1.5 rounded-xl border-2 border-accent bg-accent px-4 py-2 font-display font-700 text-white transition-colors hover:bg-accent-hover hover:border-accent-hover"
      onClick={async () => {
        await window.navigator.clipboard.writeText(url)
        addToast('링크가 복사되었습니다.')
      }}
    >
      <ShareIcon className="size-5" />
      <div>링크 복사</div>
    </button>
  )
}
