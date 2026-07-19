import Link from 'next/link'
import { FolderPlusIcon } from '@heroicons/react/24/outline'

export default function HomePageButton() {
  return (
    <Link href="/" className="btn-primary w-full px-5 sm:w-auto">
      <FolderPlusIcon className="size-[18px]" />
      다른 파일 공유
    </Link>
  )
}
