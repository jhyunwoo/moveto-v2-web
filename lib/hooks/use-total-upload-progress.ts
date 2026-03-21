import { useFileUploadProgress } from '@/lib/stores/file-upload-progress'

export default function useTotalUploadProgress() {
  const { fileUploadProgress } = useFileUploadProgress((store) => store)
  if (fileUploadProgress.length === 0) {
    return 0
  }
  const totalBytes = fileUploadProgress.reduce((acc, cur) => acc + (cur.bytesTotal ?? cur.size ?? 0), 0)
  if (totalBytes === 0) return 0
  const uploadedBytes = fileUploadProgress.reduce((acc, cur) => acc + (cur.bytesUploaded ?? 0), 0)
  return Math.ceil((uploadedBytes / totalBytes) * 100)
}
