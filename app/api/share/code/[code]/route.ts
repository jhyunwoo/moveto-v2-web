import db from '@/db'
import { and, eq, gte } from 'drizzle-orm'
import { share } from '@/db/schema'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { code: string } }) {
  const findShare = await db.query.share.findFirst({
    where: and(eq(share.code, params.code), gte(share.expireAt, new Date()), eq(share.active, true)),
  })

  if (findShare) {
    return NextResponse.json(findShare)
  } else {
    return NextResponse.json({ error: 'Share not found' }, { status: 404 })
  }
}
