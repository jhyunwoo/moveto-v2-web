import db from '@/db'
import { and, eq, gte } from 'drizzle-orm'
import { share } from '@/db/schema'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { shareId: string } }) {
  const findShare = await db.query.share.findFirst({
    where: and(eq(share.code, params.shareId), gte(share.expireAt, new Date())),
  })
  if (findShare) {
    return NextResponse.json(findShare)
  } else {
    return NextResponse.json({ error: 'Share not found' }, { status: 404 })
  }
}
