import { NextRequest, NextResponse } from 'next/server'
import getS3Client from '@/lib/server/get-s3-client'
import { ListPartsCommand, Part } from '@aws-sdk/client-s3'
import checkShareAuth from '@/lib/server/check-share-auth'

export async function GET(request: NextRequest, { params }: { params: Promise<{ uploadId: string }> }) {
  const client = getS3Client()
  const searchParams = request.nextUrl.searchParams
  const key = searchParams.get('key')

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

  const parts: Part[] = []

  async function listPartsPage(startsAt?: string) {
    const data = await client.send(
      new ListPartsCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key!,
        UploadId: (await params).uploadId,
        PartNumberMarker: startsAt,
      })
    )
    if (data.Parts) {
      parts.push(...data.Parts)
    }
    if (data.IsTruncated) {
      await listPartsPage(data.NextPartNumberMarker)
    }
  }

  try {
    await listPartsPage()
    return NextResponse.json(parts)
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ uploadId: string }> }) {
  const client = getS3Client()
  const searchParams = request.nextUrl.searchParams
  const key = searchParams.get('key')

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

  try {
    const { AbortMultipartUploadCommand } = await import('@aws-sdk/client-s3')
    await client.send(
      new AbortMultipartUploadCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
        UploadId: (await params).uploadId,
      })
    )
    
    // Also delete the share record from the database if needed,
    // but the client-side worker handles calling `DELETE /api/share/[id]` explicitly on cancel,
    // so just aborting the multipart upload here is sufficient for S3 cleanup.

    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
