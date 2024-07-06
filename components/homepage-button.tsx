import Link from 'next/link'
import { FolderIcon } from '@heroicons/react/24/outline'

export default function HomePageButton() {
  return (
    <Link
      href={'/'}
      className={
        'bg-white flex gap-2 items-center justify-center p-2 px-4 rounded-lg text-center text-black w-full max-w-3xl font-semibold text-sm hover:bg-neutral-300 transition-colors mx-auto'
      }
    >
      <FolderIcon className={'size-5'} />
      <div>다른 파일 공유</div>
    </Link>
  )
}
