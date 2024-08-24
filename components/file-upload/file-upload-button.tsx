'use client'

export default function FileUploadButton({ uploadFunc }: { uploadFunc: () => void }) {
  return (
    <button
      onClick={uploadFunc}
      type={'button'}
      className={
        'bg-white text-lg font-semibold p-2 rounded-full text-black mt-8 hover:bg-neutral-200 transition-colors'
      }
    >
      공유
    </button>
  )
}
