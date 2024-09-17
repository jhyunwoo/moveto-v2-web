import { UppyType } from '@/types/uppy'

export default function FileUploadButton({ uppy }: { uppy: UppyType }) {
  return (
    <button
      onClick={async () => await uppy.upload()}
      type={'button'}
      className={
        'grow rounded-full bg-white p-2 text-lg font-semibold text-black transition-colors hover:bg-neutral-200'
      }
    >
      공유
    </button>
  )
}
