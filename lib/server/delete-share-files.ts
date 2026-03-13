import db from '@/db'
import { share } from '@/db/schema'
import getS3Client from '@/lib/server/get-s3-client'
import { and, eq } from 'drizzle-orm'
import { DeleteObjectsCommand } from '@aws-sdk/client-s3'
import { getSession } from '@/auth'
import getIp from '@/lib/server/get-user-ip'

export default async function deleteShareFiles(shareId: string) {
  const session = await getSession()
  const shareData = await db.query.share.findFirst({
    where: and(eq(share.id, shareId), eq(share.active, true)),
    columns: {
      id: true,
      file: true,
      ip: true,
      userId: true,
    },
  })

  if (!shareData) {
    throw new Error('Share not found')
  }

  if (shareData.userId && session?.user?.id !== shareData.userId) {
    throw new Error('Unauthorized')
  }

  if (!shareData.userId && shareData.ip !== (await getIp())) {
    throw new Error('Unauthorized')
  }

  await db.update(share).set({ active: false }).where(eq(share.id, shareId))

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
      await r2Client.send(command)
    } catch (error) {
      throw error
    }
  }
}
