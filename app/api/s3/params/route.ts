import { NextRequest, NextResponse } from 'next/server'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import getS3Client from '@/lib/server/get-s3-client'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import checkShareAuth from '@/lib/server/check-share-auth'
import path from 'path'

const expiresIn = 60 * 60 * 24 // 24 hours

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const filename = searchParams.get('filename')
  const contentType = searchParams.get('type')
  const pathVal = searchParams.get('metadata[path]')

  if (!filename || !contentType || !pathVal) {
    return NextResponse.json(
      {
        error: `filename=${filename} contentType=${contentType} path=${pathVal} Some params missing`,
      },
      { status: 400 }
    )
  }

  if (!(await checkShareAuth(pathVal))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Path Traversal 방지를 위해 파일명만 추출
  const safeFilename = path.basename(filename)

  const url = await getSignedUrl(
    getS3Client(),
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: `${pathVal}/${safeFilename}`,
      ContentType: contentType,
    }),
    { expiresIn }
  )

  return NextResponse.json({
    url,
    method: 'PUT',
  })
}
