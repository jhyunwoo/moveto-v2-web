import db from '@/db'
import { and, eq, gte } from 'drizzle-orm'
import { share } from '@/db/schema'
import { NextResponse } from 'next/server'
import getIp from '@/lib/server/get-user-ip'
import { checkRateLimit } from '@/lib/server/rate-limit'

export async function GET(request: Request, { params }: { params: Promise<{ code: string }> }) {
  const userIp = await getIp()
  const rateLimit = checkRateLimit(`code_lookup:${userIp}`, 20, 60000)
  if (!rateLimit.success) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const rawCode = (await params).code
  if (!rawCode || typeof rawCode !== 'string') {
    return NextResponse.json({ error: 'Invalid access code' }, { status: 400 })
  }

  const decodedCode = decodeURIComponent(rawCode).trim()

  const findShare = await db.query.share.findFirst({
    where: and(eq(share.code, decodedCode), gte(share.expireAt, new Date()), eq(share.active, true)),
  })

  if (findShare) {
    return NextResponse.json(findShare)
  } else {
    return NextResponse.json({ error: 'Share not found' }, { status: 404 })
  }
}
