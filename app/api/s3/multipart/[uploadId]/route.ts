import { NextRequest, NextResponse } from 'next/server'
import getS3Client from '@/lib/r2/get-s3-client'
import { ListPartsCommand, Part } from '@aws-sdk/client-s3'

export async function GET(request: NextRequest, { params }: { params: { uploadId: string } }) {
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

  const parts: Part[] = []

  async function listPartsPage(startsAt: undefined | string = undefined) {
    try {
      const data = await client.send(
        new ListPartsCommand({
          Bucket: process.env.R2_BUCKET,
          Key: key as string,
          UploadId: params.uploadId,
          PartNumberMarker: startsAt,
        })
      )
      if (data.Parts) {
        parts.push(...data.Parts)
      }
      // continue to get list of all uploaded parts until the IsTruncated flag is false
      if (data.IsTruncated) {
        await listPartsPage(data.NextPartNumberMarker)
      } else {
        return NextResponse.json(parts)
      }
    } catch (e) {
      return NextResponse.json(e, { status: 500 })
    }
  }
  await listPartsPage()
}
