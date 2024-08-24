import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import db from '@/db'
import { share } from '@/db/schema'
import getIp from '@/lib/get-ip'

export async function POST(request: NextRequest) {
  const session = await auth()
  const bodyData = (await request.json()) as { files: string[]; storageSize: number }

  const id = await db
    .insert(share)
    .values({
      userId: session?.user.id ? session.user.id : null,
      ip: getIp(),
      file: bodyData.files,
      storageSize: bodyData.storageSize,
    })
    .returning({ shareId: share.id })

  return NextResponse.json(id[0])
}
