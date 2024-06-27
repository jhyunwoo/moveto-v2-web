import { Cog6ToothIcon } from '@heroicons/react/24/outline'

export default function Loading() {
  return (
    <div className={'w-full h-screen fixed top-0 flex items-center justify-center bg-black/50'}>
      <Cog6ToothIcon className={'size-12 animate-spin text-slate-200'} />
    </div>
  )
}
