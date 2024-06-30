import db from '@/db'
import { eq } from 'drizzle-orm'
import { share } from '@/db/schema'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { shareId: string } }) {
  const findShare = await db.query.share.findFirst({
    where: eq(share.code, params.shareId),
  })
  if (findShare) {
    return NextResponse.json(findShare)
  } else {
    return NextResponse.json({ error: 'Share not found' }, { status: 404 })
  }
}
