export default function FileUploadButton({ upload }: { upload: () => void }) {
  return (
    <button
      onClick={upload}
      type="button"
      className="grow cursor-pointer rounded-xl border-2 border-accent bg-accent p-2.5 font-display text-lg font-700 text-white transition-colors hover:bg-accent-hover hover:border-accent-hover"
    >
      공유
    </button>
  )
}
