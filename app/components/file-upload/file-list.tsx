import { XMarkIcon } from '@heroicons/react/24/outline'
import formatBytes from '@/lib/format-bytes'
import FileItemIcon from '@/app/components/file-item-icon'

export default function FileList({ files, deleteFile }: { files: File[]; deleteFile: (index: number) => void }) {
  if (!files.length) return null

  return (
    <div className="px-3 pb-3">
      <div className="flex items-center justify-between px-2 pb-2">
        <h2 className="section-label">선택한 파일</h2>
        <span className="mono-label">{files.length}</span>
      </div>
      <ul className="border-border-subtle max-h-56 overflow-y-auto rounded-lg border">
        {files.map((file, index) => (
          <li
            key={`${file.name}-${file.size}-${file.lastModified}`}
            className="fade-in border-border-subtle flex items-center justify-between gap-3 border-b px-3 py-2.5 last:border-b-0"
          >
            <div className="flex min-w-0 items-center gap-3">
              <FileItemIcon file={file} />
              <div className="min-w-0">
                <div className="font-600 text-text-primary truncate text-sm">{file.name}</div>
                <div className="text-text-muted font-mono text-xs">{formatBytes(file.size, 2)}</div>
              </div>
            </div>
            <button
              type="button"
              className="icon-button size-8"
              onClick={() => deleteFile(index)}
              aria-label={`${file.name} 삭제`}
              title="파일 제거"
            >
              <XMarkIcon className="size-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
