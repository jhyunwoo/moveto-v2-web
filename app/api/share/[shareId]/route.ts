import db from '@/db'
import { share } from '@/db/schema'
import getS3Client from '@/lib/server/get-s3-client'
import { DeleteObjectsCommand } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

export async function DELETE(request: Request, { params }: { params: { shareId: string } }) {
  try {
    const shareData = (
      await db.update(share).set({ active: false }).where(eq(share.id, params.shareId)).returning({
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
