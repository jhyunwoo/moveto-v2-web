import db from '@/db'
import { share } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import getS3Client from '@/lib/r2/get-s3-client'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export async function PUT(request: NextRequest, { params }: { params: { shareId: string } }) {
  const bodyData = (await request.json()) as { file: string }
  const fileData = (
    await db.select({ id: share.id, files: share.file }).from(share).where(eq(share.code, params.shareId))
  )[0]
  if (!fileData.files?.includes(bodyData.file)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
  const r2client = getS3Client()
  const downloadCommand = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: `${params.shareId}/${bodyData.file}`,
  })
  const downloadUrl = await getSignedUrl(r2client, downloadCommand, { expiresIn: 60 * 60 * 24 })
  return NextResponse.json({ downloadUrl })
}
