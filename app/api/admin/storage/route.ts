import db from '@/db'
import { share } from '@/db/schema'
import { and, eq, isNotNull, lt, or } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET() {
  const expiringShares = await db
    .update(share)
    .set({ code: null, active: false })
    .where(and(lt(share.expireAt, new Date()), or(isNotNull(share.code), eq(share.active, true))))
    .returning({ id: share.id })

  return NextResponse.json({ expired: expiringShares.length })
}
