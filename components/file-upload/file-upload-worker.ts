import { ClientToWorkersMessageType } from '@/lib/types'

const handleMessage = async (event: MessageEvent<ClientToWorkersMessageType>) => {
  console.log(event.data.session?.user)
  // 1. 전체 파일 리스트와 파일 크기를 보내서 share 생성
  const createShareRequest = await fetch('/api/share', {
    body: JSON.stringify({ files: event.data.files, shareTime: event.data.shareTime }),
    method: 'POST',
  })
  const createdShare = await createShareRequest.json()
  console.log(createdShare)
  // 2. 생성한 share id를 받아오고 id를 폴더 이름으로 사용하고 각 파일을 해당 폴더에 업로드
  // 3. 업로드 완료 후 파일 크기 검증 및 접근 코드 생성
  // 4. 접근 코드를 받은 후 main thread로 전달
}

typeof self === 'object' && self.addEventListener('message', handleMessage)
