import db from '@/db'
import { share } from '@/db/schema'
import { and, count, desc, eq, isNotNull } from 'drizzle-orm'

const PAGE_SIZE = 10

export default async function getUserShareHistory(userId: string, requestedPage: number) {
  const safePage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1
  const totalShares = (
    await db
      .select({ count: count() })
      .from(share)
      .where(and(eq(share.userId, userId), eq(share.active, true), isNotNull(share.expireAt)))
  )[0].count

  const pageLimit = Math.max(1, Math.ceil(totalShares / PAGE_SIZE))
  const currentPage = Math.min(Math.max(safePage, 1), pageLimit)

  const shareList = await db
    .select()
    .from(share)
    .where(and(eq(share.userId, userId), eq(share.active, true), isNotNull(share.expireAt)))
    .orderBy(desc(share.createdAt))
    .limit(PAGE_SIZE)
    .offset((currentPage - 1) * PAGE_SIZE)

  return {
    shareList,
    pageLimit,
    currentPage,
  }
}
