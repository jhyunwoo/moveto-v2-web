import { getSession } from '@/auth'
import getIp from '@/lib/server/get-user-ip'
import db from '@/db'
import { share } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { verifyOwnerToken } from '@/lib/server/owner-token'

export default async function checkShareAuth(shareId: string): Promise<boolean> {
  if (!shareId) return false
  
  const shareRecord = await db.query.share.findFirst({ where: eq(share.id, shareId) })
  if (!shareRecord || !shareRecord.active) return false

  const session = await getSession()
  if (shareRecord.userId) {
    return session?.user?.id === shareRecord.userId
  } else {
    // 하위 호환성: 배포 시점 이전에 생성된 기존 공유는 IP 검증만 수행
    const DEPLOYMENT_TIME = new Date('2026-07-07T17:00:00+09:00')
    if (shareRecord.createdAt < DEPLOYMENT_TIME) {
      return shareRecord.ip === (await getIp())
    }

    const cookieStore = await cookies()
    const ownerToken = cookieStore.get(`owner_${shareId}`)?.value
    const isOwner = verifyOwnerToken(shareId, ownerToken)
    return isOwner && shareRecord.ip === (await getIp())
  }
}
