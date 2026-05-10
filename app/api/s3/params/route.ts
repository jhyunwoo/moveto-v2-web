import { NextRequest, NextResponse } from 'next/server'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import getS3Client from '@/lib/server/get-s3-client'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import checkShareAuth from '@/lib/server/check-share-auth'

const expiresIn = 60 * 60 * 24 // 24 hours

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const filename = searchParams.get('filename')
  const contentType = searchParams.get('type')
  const path = searchParams.get('metadata[path]')

  if (!filename || !contentType || !path) {
    return NextResponse.json(
      {
        error: `filename=${filename} contentType=${contentType} path=${path} Some params missing`,
      },
      { status: 400 }
    )
  }

  if (!(await checkShareAuth(path))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = await getSignedUrl(
    getS3Client(),
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: `${path}/${filename}`,
      ContentType: contentType,
    }),
    { expiresIn }
  )

  return NextResponse.json({
    url,
    method: 'PUT',
  })
}
