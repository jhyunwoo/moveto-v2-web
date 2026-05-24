import { FolderOpenIcon } from '@heroicons/react/24/outline'

export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-3xl flex-col gap-3 p-4 pt-40 animate-pulse sm:pt-44 md:pb-28">
      <div className="modern-card flex h-20 items-center justify-between gap-2 rounded-xl bg-surface-subtle p-3 px-4" />
      <div className="p-2">
        <div className="font-display text-lg font-700 uppercase tracking-wider text-text-secondary/50">파일</div>
        <div className="mt-2 flex flex-col gap-2">
          <div className="modern-card h-[76px] rounded-xl bg-surface-subtle" />
          <div className="modern-card h-[76px] rounded-xl bg-surface-subtle" />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 flex w-full border-t-2 border-border-subtle bg-surface/80 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-3xl gap-2">
          <div className="h-14 w-full rounded-2xl bg-surface-subtle" />
        </div>
      </div>
    </div>
  )
}
