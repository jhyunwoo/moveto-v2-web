'use client'

export default function FileUploadButton({ uploadFunc }: { uploadFunc: () => void }) {
  return (
    <button
      onClick={uploadFunc}
      type={'button'}
      className={
        'mt-8 rounded-full bg-white p-2 text-lg font-semibold text-black transition-colors hover:bg-neutral-200'
      }
    >
      공유
    </button>
  )
}
