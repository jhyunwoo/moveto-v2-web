import { NextRequest, NextResponse } from 'next/server'
import getS3Client from '@/lib/server/get-s3-client'
import { CreateMultipartUploadCommand } from '@aws-sdk/client-s3'
import checkShareAuth from '@/lib/server/check-share-auth'
import pathModule from 'path'

export async function POST(request: NextRequest) {
  const client = getS3Client()
  const res = (await request.json()) as {
    type: string | null | undefined
    filename: string | null | undefined
    metadata: {
      name: string | null | undefined
      path: string | null | undefined
      type: string | null | undefined
    }
  }
  const type = res.type
  const filename = res.filename
  const pathVal = res.metadata.path

  if (typeof filename !== 'string') {
    return NextResponse.json({ error: 's3: content filename must be a string' }, { status: 400 })
  }
  if (typeof type !== 'string') {
    return NextResponse.json({ error: 's3: content type must be a string' }, { status: 400 })
  }
  if (typeof pathVal !== 'string') {
    return NextResponse.json({ error: 's3: content path must be a string' }, { status: 400 })
  }

  if (!(await checkShareAuth(pathVal))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Path Traversal 방지를 위해 파일명만 추출
  const safeFilename = pathModule.basename(filename)

  const params = {
    Bucket: process.env.R2_BUCKET!,
    Key: `${pathVal}/${safeFilename}`,
    ContentType: type,
  }

  const command = new CreateMultipartUploadCommand(params)

  try {
    const result = await client.send(command)
    return NextResponse.json({ key: result.Key, uploadId: result.UploadId })
  } catch (e) {
    console.error(e)
    return NextResponse.json(e, { status: 500 })
  }
}
