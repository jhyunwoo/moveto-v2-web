import { Cog6ToothIcon } from '@heroicons/react/24/outline'

export default function Loading() {
  return (
    <div className={'fixed top-0 flex h-screen w-full items-center justify-center bg-black/50'}>
      <Cog6ToothIcon className={'size-12 animate-spin text-slate-200'} />
    </div>
  )
}
