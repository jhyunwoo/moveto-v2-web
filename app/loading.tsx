import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-overlay backdrop-blur-sm">
      <div className="glass-panel flex items-center gap-3 px-5 py-3.5">
        <ArrowPathIcon className="size-6 animate-spin text-accent" />
        <span className="text-sm font-600">불러오는 중...</span>
      </div>
    </div>
  )
}
