import { auth } from '@/auth'
import db from '@/db'
import { share } from '@/db/schema'
import { NextResponse } from 'next/server'
import { and, desc, eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const shareList = await db
    .select()
    .from(share)
    .where(and(eq(share.userId, session?.user.id!), eq(share.active, true)))
    .orderBy(desc(share.createdAt))

  return NextResponse.json(shareList)
}
