import getTotalFileSize from '@/lib/get-total-file-size'
import { Meta, Uppy } from '@uppy/core'
import AwsS3, { type AwsBody } from '@uppy/aws-s3'

const handleMessage = async (event: MessageEvent<ClientToFileUploadWorker>) => {
  const files = event.data.files
  const fileNameList = files.map(file => file.name)

  const createShareRequest = await fetch('/api/share', {
    method: 'POST',
    body: JSON.stringify({ files: fileNameList, storageSize: getTotalFileSize(event.data.files) }),
  })

  const createdShare = (await createShareRequest.json()) as { shareId: string; error?: string }
  if (!createShareRequest.ok) {
    self.postMessage({ error: createdShare.error })
    return
  }

  const uppy = new Uppy<Meta, AwsBody>().use(AwsS3, { endpoint: '/api/s3' })
}

typeof self === 'object' && self.addEventListener('message', handleMessage)
