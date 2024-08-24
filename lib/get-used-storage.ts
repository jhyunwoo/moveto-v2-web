import db from '@/db'
import { share } from '@/db/schema'
import { and, eq, isNull } from 'drizzle-orm'
import getIp from '@/lib/get-ip'

export default async function getUsedStorage(userId: string | undefined | null) {
  let usedStorage = 0
  if (userId) {
    const userShareList = await db
      .select({ storageSize: share.storageSize })
      .from(share)
      .where(eq(share.userId, userId))

    for (const userShare of userShareList) {
      usedStorage += userShare.storageSize
    }
  } else {
    const publicShareList = await db
      .select({ storageSize: share.storageSize })
      .from(share)
      .where(and(eq(share.id, getIp()), isNull(share.userId)))

    for (const publicShare of publicShareList) {
      usedStorage += publicShare.storageSize
    }
  }
  return usedStorage
}
