import Link from 'next/link'
import { FolderIcon } from '@heroicons/react/24/outline'

export default function HomePageButton() {
  return (
    <Link
      href="/"
      className="mx-auto flex max-w-3xl grow items-center justify-center gap-2 rounded-xl border-2 border-accent bg-accent p-2.5 px-4 text-center font-display text-lg font-700 text-white transition-colors hover:bg-accent-hover hover:border-accent-hover"
    >
      <FolderIcon className="size-6" />
      <div>다른 파일 공유</div>
    </Link>
  )
}
