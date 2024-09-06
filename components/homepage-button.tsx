import Link from 'next/link'
import { FolderIcon } from '@heroicons/react/24/outline'

export default function HomePageButton() {
  return (
    <Link
      href={'/'}
      className={
        'mx-auto flex max-w-3xl grow items-center justify-center gap-2 rounded-full bg-white p-2 px-4 text-center text-lg font-semibold text-black transition-colors hover:bg-neutral-300'
      }
    >
      <FolderIcon className={'size-6'} />
      <div>다른 파일 공유</div>
    </Link>
  )
}
