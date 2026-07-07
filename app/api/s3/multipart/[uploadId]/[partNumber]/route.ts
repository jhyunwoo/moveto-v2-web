import { NextRequest, NextResponse } from 'next/server'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import getS3Client from '@/lib/server/get-s3-client'
import { UploadPartCommand } from '@aws-sdk/client-s3'
import checkShareAuth from '@/lib/server/check-share-auth'

function validatePartNumber(partNumber: string) {
  const number = Number(partNumber)
  return Number.isInteger(number) && number >= 1 && number <= 10_000
}

const expiresIn = 60 * 60 * 24 // 24 hours

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uploadId: string; partNumber: string }> }
) {
  const searchParams = request.nextUrl.searchParams
  const key = searchParams.get('key')
  const paramsData = await params

  if (!validatePartNumber(paramsData.partNumber)) {
    return NextResponse.json(
      {
        error: 's3: the part number must be an integer between 1 and 10000.',
      },
      { status: 400 }
    )
  }

  if (!key) {
    return NextResponse.json(
      {
        error: 's3: the object key must be passed as a query parameter. For example: "?key=abc.jpg"',
      },
      { status: 400 }
    )
  }

  const shareId = key.split('/')[0]
  if (!shareId || !(await checkShareAuth(shareId))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Path Traversal 방지를 위해 key 검증
  if (!key.startsWith(`${shareId}/`) || key.includes('..')) {
    return NextResponse.json({ error: 'Invalid key structure' }, { status: 400 })
  }

  const url = await getSignedUrl(
    getS3Client(),
    new UploadPartCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: key,
      UploadId: paramsData.uploadId,
      PartNumber: Number(paramsData.partNumber),
      Body: '',
    }),
    { expiresIn }
  )
  return NextResponse.json({ url, expires: expiresIn })
}
