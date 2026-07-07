import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/auth'
import db from '@/db'
import { share } from '@/db/schema'
import getIp from '@/lib/server/get-user-ip'
import getUserLimit from '@/lib/get-user-limit'
import getUsedStorage from '@/lib/get-used-storage'
import { addHours } from 'date-fns'
import path from 'path'

export async function POST(request: NextRequest) {
  const session = await getSession()
  const bodyData = (await request.json()) as {
    files: string[]
    storageSize: number
  }

  const userLimit = getUserLimit(session?.user.plan)
  const usedStorage = await getUsedStorage()

  if (userLimit.storage - usedStorage < bodyData.storageSize) {
    return NextResponse.json({ error: 'Not enough storage' }, { status: 400 })
  }

  const safeFiles = bodyData.files.map((file) => path.basename(file))

  const id = await db
    .insert(share)
    .values({
      userId: session?.user.id ? session.user.id : null,
      ip: await getIp(),
      file: safeFiles,
      storageSize: bodyData.storageSize,
      expireAt: addHours(new Date(), 24),
    })
    .returning({ shareId: share.id })

  // 익명 사용자인 경우 쿠키를 통해 임시 소유권 증명서 발급
  if (!session) {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    cookieStore.set(`owner_${id[0].shareId}`, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24시간
      path: '/',
      sameSite: 'lax',
    })
  }

  return NextResponse.json(id[0])
}
