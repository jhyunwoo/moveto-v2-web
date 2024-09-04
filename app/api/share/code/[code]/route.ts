import db from '@/db'
import { and, eq, gte } from 'drizzle-orm'
import { share } from '@/db/schema'
import { NextResponse } from 'next/server'
import getS3Client from '@/lib/r2/get-s3-client'
import { DeleteObjectsCommand } from '@aws-sdk/client-s3'

export async function GET(request: Request, { params }: { params: { code: string } }) {
  const findShare = await db.query.share.findFirst({
    where: and(eq(share.code, params.code), gte(share.expireAt, new Date()), eq(share.active, true)),
  })

  if (findShare) {
    return NextResponse.json(findShare)
  } else {
    return NextResponse.json({ error: 'Share not found' }, { status: 404 })
  }
}

export async function DELETE(request: Request, { params }: { params: { code: string } }) {
  try {
    const shareData = (
      await db
        .update(share)
        .set({ active: false })
        .where(eq(share.code, decodeURIComponent(params.code).replaceAll('_', ' ')))
        .returning({
          id: share.id,
          file: share.file,
        })
    )[0]

    if (shareData.file?.length) {
      const r2Client = getS3Client()
      const objects = shareData.file.map(file => ({ Key: `${shareData.id}/${file}` }))
      const command = new DeleteObjectsCommand({
        Bucket: process.env.R2_BUCKET,
        Delete: {
          Objects: objects,
        },
      })
      try {
        await r2Client.send(command)
        return NextResponse.json({ message: 'Success' })
      } catch (e) {
        console.error(e)
        return NextResponse.json({ message: 'Delete file error' }, { status: 500 })
      }
    }
  } catch {
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}
