import db from '@/db'
import { share } from '@/db/schema'
import getS3Client from '@/lib/server/get-s3-client'
import { eq } from 'drizzle-orm'
import { DeleteObjectsCommand } from '@aws-sdk/client-s3'

export default async function deleteShareFiles(shareId: string) {
  const shareData = (
    await db.update(share).set({ active: false }).where(eq(share.id, shareId)).returning({
      id: share.id,
      file: share.file,
    })
  )[0]

  if (shareData.file?.length) {
    const r2Client = getS3Client()
    const objects = shareData.file.map(file => ({
      Key: `${shareData.id}/${file}`,
    }))
    const command = new DeleteObjectsCommand({
      Bucket: process.env.R2_BUCKET,
      Delete: {
        Objects: objects,
      },
    })

    try {
      return r2Client.send(command)
    } catch (e) {
      return e
    }
  }
}
