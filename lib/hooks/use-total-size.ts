import { useFilesStore } from '@/components/store-provider/files-provider'
import getTotalFileSize from '@/lib/get-total-file-size'

/**
 * 선택한 모든 파일 크기 값
 */
export default function useTotalSize() {
  const { files } = useFilesStore(store => store)
  return getTotalFileSize(files)
}
