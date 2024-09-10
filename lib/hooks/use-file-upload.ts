import { useRecoilValue } from 'recoil'
import { filesState } from '@/lib/client/recoil'

export default function useFileUpload() {
  const files = useRecoilValue(filesState)
  return files
}
