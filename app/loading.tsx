import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-overlay backdrop-blur-sm">
      <div className="modern-card flex items-center gap-3 rounded-xl p-4 px-6">
        <ArrowPathIcon className="size-6 animate-spin text-accent" />
        <span className="font-display text-sm font-600 tracking-wide">로딩중...</span>
      </div>
    </div>
  )
}
