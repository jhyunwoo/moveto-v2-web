import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/auth'
import db from '@/db'
import { share } from '@/db/schema'
import getIp from '@/lib/server/get-user-ip'
import getUserLimit from '@/lib/get-user-limit'
import getUsedStorage from '@/lib/get-used-storage'
import { addHours } from 'date-fns'
import path from 'path'
import { generateOwnerToken } from '@/lib/server/owner-token'

export async function POST(request: NextRequest) {
  const session = await getSession()
  let bodyData: { files?: unknown; storageSize?: unknown }
  try {
    bodyData = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
  }

  if (
    !Array.isArray(bodyData.files) ||
    bodyData.files.length === 0 ||
    !bodyData.files.every((file) => typeof file === 'string' && file.trim().length > 0)
  ) {
    return NextResponse.json({ error: 'Invalid files list' }, { status: 400 })
  }

  if (
    typeof bodyData.storageSize !== 'number' ||
    !Number.isFinite(bodyData.storageSize) ||
    bodyData.storageSize <= 0
  ) {
    return NextResponse.json({ error: 'Invalid storage size' }, { status: 400 })
  }

  const userLimit = getUserLimit(session?.user?.plan)
  const usedStorage = await getUsedStorage()

  if (userLimit.storage - usedStorage < bodyData.storageSize) {
    return NextResponse.json({ error: 'Not enough storage' }, { status: 400 })
  }

  const safeFiles = (bodyData.files as string[]).map((file) => path.basename(file))

  const id = await db
    .insert(share)
    .values({
      userId: session?.user?.id ? session.user.id : null,
      ip: await getIp(),
      file: safeFiles,
      storageSize: bodyData.storageSize,
      expireAt: addHours(new Date(), 24),
    })
    .returning({ shareId: share.id })

  // 익명 사용자인 경우 HMAC 기반 소유권 토큰 발급
  if (!session) {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const ownerToken = generateOwnerToken(id[0].shareId)
    cookieStore.set(`owner_${id[0].shareId}`, ownerToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24시간
      path: '/',
      sameSite: 'lax',
    })
  }

  return NextResponse.json(id[0])
}
