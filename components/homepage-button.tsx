import Link from 'next/link'
import { FolderIcon } from '@heroicons/react/24/outline'

export default function HomePageButton() {
  return (
    <Link
      href={'/'}
      className={
        'bg-white flex gap-2 items-center justify-center text-lg font-semibold p-2 px-4 rounded-full text-center text-black grow max-w-3xl hover:bg-neutral-300 transition-colors mx-auto'
      }
    >
      <FolderIcon className={'size-6'} />
      <div>다른 파일 공유</div>
    </Link>
  )
}
