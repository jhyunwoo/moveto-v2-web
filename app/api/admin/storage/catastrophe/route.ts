import getS3Client from '@/lib/r2/get-s3-client'
import { DeleteObjectsCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'

/** 스토리지의 모든 파일 삭제 */
export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: 'development 환경에서만 사용 가능합니다.' })
  }
  const r2client = getS3Client()
  const command = new ListObjectsV2Command({
    Bucket: process.env.R2_BUCKET,
  })
  const response = await r2client.send(command)
  const deleteCommand = new DeleteObjectsCommand({
    Bucket: process.env.R2_BUCKET,
    Delete: {
      Objects: response.Contents?.map(content => ({ Key: content.Key })),
    },
  })
  const deleteResponse = await r2client.send(deleteCommand)
  return NextResponse.json(deleteResponse)
}
