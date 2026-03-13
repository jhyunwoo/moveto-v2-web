import db from '@/db'
import { share } from '@/db/schema'
import { and, eq, gte, isNull } from 'drizzle-orm'
import getIp from '@/lib/server/get-user-ip'
import { getSession } from '@/auth'

export default async function getUsedStorage() {
  const session = await getSession()

  let activeShares

  if (session?.user.id) {
    activeShares = await db
      .select({ storage: share.storageSize })
      .from(share)
      .where(and(eq(share.userId, session.user.id), eq(share.active, true), gte(share.expireAt, new Date())))
  } else {
    activeShares = await db
      .select({ storage: share.storageSize })
      .from(share)
      .where(
        and(eq(share.ip, await getIp()), eq(share.active, true), gte(share.expireAt, new Date()), isNull(share.userId))
      )
  }

  let storageSize = 0
  for (const share of activeShares) {
    storageSize += share.storage
  }
  return storageSize
}
