import { getSession } from '@/auth'
import getIp from '@/lib/server/get-user-ip'
import db from '@/db'
import { share } from '@/db/schema'
import { eq } from 'drizzle-orm'

export default async function checkShareAuth(shareId: string): Promise<boolean> {
  if (!shareId) return false
  
  const shareRecord = await db.query.share.findFirst({ where: eq(share.id, shareId) })
  if (!shareRecord || !shareRecord.active) return false

  const session = await getSession()
  if (shareRecord.userId) {
    return session?.user?.id === shareRecord.userId
  } else {
    return shareRecord.ip === await getIp()
  }
}
