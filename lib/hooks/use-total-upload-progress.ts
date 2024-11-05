import { useFileUploadProgress } from '@/lib/stores/file-upload-progress'

export default function useTotalUploadProgress() {
  const { fileUploadProgress } = useFileUploadProgress(store => store)
  if (fileUploadProgress.length === 0) {
    return 0
  }
  const totalProgress = fileUploadProgress.reduce((acc, cur) => {
    if (cur.progress === undefined) return acc
    return acc + cur.progress
  }, 0)
  return Math.ceil(totalProgress / fileUploadProgress.length)
}
