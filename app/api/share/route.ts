import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import db from '@/db'
import { share } from '@/db/schema'
import getIp from '@/lib/server/get-user-ip'
import getUserLimit from '@/lib/get-user-limit'
import getUsedStorage from '@/lib/get-used-storage'

export async function POST(request: NextRequest) {
  const session = await auth()
  const bodyData = (await request.json()) as {
    files: string[]
    storageSize: number
  }

  const userLimit = getUserLimit(session?.user.plan)
  const usedStorage = await getUsedStorage()

  if (userLimit.storage - usedStorage < bodyData.storageSize) {
    return NextResponse.json({ error: 'Not enough storage' }, { status: 400 })
  }

  const id = await db
    .insert(share)
    .values({
      userId: session?.user.id ? session.user.id : null,
      ip: await getIp(),
      file: bodyData.files,
      storageSize: bodyData.storageSize,
    })
    .returning({ shareId: share.id })

  return NextResponse.json(id[0])
}
