import useFileUpload from '@/lib/hooks/use-file-upload'

export default function FileUploadButton() {
  const { upload } = useFileUpload()

  return (
    <button
      onClick={upload}
      type={'button'}
      className={
        'grow rounded-full bg-white p-2 text-lg font-semibold text-black transition-colors hover:bg-neutral-200'
      }
    >
      공유
    </button>
  )
}
