import db from '@/db'
import { share } from '@/db/schema'
import getS3Client from '@/lib/server/get-s3-client'
import { and, eq } from 'drizzle-orm'
import { DeleteObjectsCommand } from '@aws-sdk/client-s3'
import { getSession } from '@/auth'
import getIp from '@/lib/server/get-user-ip'
import path from 'path'

export default async function deleteShareFiles(shareId: string) {
  const session = await getSession()
  const shareData = await db.query.share.findFirst({
    where: and(eq(share.id, shareId), eq(share.active, true)),
    columns: {
      id: true,
      file: true,
      ip: true,
      userId: true,
      createdAt: true,
    },
  })

  if (!shareData) {
    throw new Error('Share not found')
  }

  if (shareData.userId && session?.user?.id !== shareData.userId) {
    throw new Error('Unauthorized')
  }

  if (!shareData.userId) {
    // 하위 호환성: 배포 시점 이전에 생성된 기존 공유는 IP 검증만 수행
    const DEPLOYMENT_TIME = new Date('2026-07-07T17:00:00+09:00')
    if (shareData.createdAt < DEPLOYMENT_TIME) {
      if (shareData.ip !== (await getIp())) {
        throw new Error('Unauthorized')
      }
    } else {
      const { cookies } = await import('next/headers')
      const cookieStore = await cookies()
      const isOwner = cookieStore.get(`owner_${shareId}`)?.value === 'true'
      if (!isOwner || shareData.ip !== (await getIp())) {
        throw new Error('Unauthorized')
      }
    }
  }

  await db.update(share).set({ active: false }).where(eq(share.id, shareId))

  if (shareData.file?.length) {
    const r2Client = getS3Client()
    const objects = shareData.file.map(file => ({
      Key: `${shareData.id}/${path.basename(file)}`,
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
