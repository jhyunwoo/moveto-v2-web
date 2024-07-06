import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import db from '@/db'
import { eq } from 'drizzle-orm'
import { share } from '@/db/schema'

export async function GET(request: NextResponse) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const userShare = await db.query.share.findMany({
    where: eq(share.userId, session.user.id as string),
  })
  let usedStorage = 0
  userShare.forEach((share) => {
    usedStorage += share.storageSize
  })
  return NextResponse.json({ usedStorage })
}
