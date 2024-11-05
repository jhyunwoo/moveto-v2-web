import { NextRequest, NextResponse } from 'next/server'
import getS3Client from '@/lib/server/get-s3-client'
import { CompleteMultipartUploadCommand, Part } from '@aws-sdk/client-s3'

function isValidPart(part: Part) {
  return part && typeof part === 'object' && Number(part.PartNumber)
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ uploadId: string }> }) {
  const client = getS3Client()
  const searchParams = request.nextUrl.searchParams
  const body = (await request.json()) as { key: string; parts: Part }
  const key = searchParams.get('key')
  const parts = body.parts

  if (!key) {
    return NextResponse.json(
      {
        error: 's3: the object key must be passed as a query parameter. For example: "?key=abc.jpg"',
      },
      { status: 400 }
    )
  }
  if (!Array.isArray(parts) || !parts.every(isValidPart)) {
    return NextResponse.json(
      {
        error: 's3: `parts` must be an array of {ETag, PartNumber} objects.',
      },
      { status: 400 }
    )
  }

  try {
    const result = await client.send(
      new CompleteMultipartUploadCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
        UploadId: (await params).uploadId,
        MultipartUpload: {
          Parts: parts,
        },
      })
    )
    return NextResponse.json({ location: result.Location })
  } catch (e) {
    return NextResponse.json(e, { status: 500 })
  }
}
