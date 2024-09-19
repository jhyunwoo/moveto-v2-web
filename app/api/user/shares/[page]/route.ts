import { auth } from '@/auth'
import db from '@/db'
import { share } from '@/db/schema'
import { NextResponse } from 'next/server'
import { and, count, desc, eq, isNotNull } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: Request, { params }: { params: { page: string } }) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const pageLimit = Math.ceil(
    (
      await db
        .select({ count: count() })
        .from(share)
        .where(and(eq(share.userId, session?.user.id!), eq(share.active, true), isNotNull(share.expireAt)))
    )[0].count / 10
  )
  if (Number(params.page) > pageLimit) {
    params.page = String(pageLimit)
  }

  const shareList = await db
    .select()
    .from(share)
    .where(and(eq(share.userId, session?.user.id!), eq(share.active, true), isNotNull(share.expireAt)))
    .orderBy(desc(share.createdAt))
    .limit(10)
    .offset((parseInt(params.page) - 1) * 10)

  return NextResponse.json({ shareList: shareList, pageLimit: pageLimit })
}
