import getTotalFileSize from '@/lib/get-total-file-size'
import { useFiles } from '@/lib/stores/files'

/**
 * 선택한 모든 파일 크기 값
 */
export default function useTotalSize() {
  const { files } = useFiles(store => store)
  return getTotalFileSize(files)
}
