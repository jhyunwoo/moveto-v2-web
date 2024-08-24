import { NextRequest, NextResponse } from 'next/server'
import getS3Client from '@/lib/r2/get-s3-client'
import { CreateMultipartUploadCommand } from '@aws-sdk/client-s3'

export async function POST(request: NextRequest) {
  const client = getS3Client()
  const res = (await request.json()) as {
    type: string | null | undefined
    metadata: Record<string, string>
    filename: string | null | undefined
  }
  const type = res.type
  const metadata = res.metadata
  const filename = res.filename

  if (typeof filename !== 'string') {
    return NextResponse.json({ error: 's3: content filename must be a string' }, { status: 400 })
  }
  if (typeof type !== 'string') {
    return NextResponse.json({ error: 's3: content type must be a string' }, { status: 400 })
  }

  const params = {
    Bucket: process.env.R2_BUCKET!,
    Key: filename,
    ContentType: type,
    Metadata: metadata,
  }

  const command = new CreateMultipartUploadCommand(params)

  try {
    const result = await client.send(command)
    return NextResponse.json({ key: result.Key, uploadId: result.UploadId })
  } catch (e) {
    return NextResponse.json(e, { status: 500 })
  }
}
