import { NextRequest, NextResponse } from 'next/server'
import getS3Client from '@/lib/r2/get-s3-client'
import { CreateMultipartUploadCommand } from '@aws-sdk/client-s3'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  const headersList = headers()
  const folder = headersList.get('folder')

  const client = getS3Client()
  const res = (await request.json()) as {
    type: string | null | undefined
    filename: string | null | undefined
  }
  const type = res.type
  const filename = res.filename

  if (typeof filename !== 'string') {
    return NextResponse.json({ error: 'r2: content filename must be a string' }, { status: 400 })
  }
  if (typeof type !== 'string') {
    return NextResponse.json({ error: 'r2: content type must be a string' }, { status: 400 })
  }

  const params = {
    Bucket: process.env.R2_BUCKET!,
    Key: `${folder}/${filename}`,
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
