import db from '@/db'
import { share } from '@/db/schema'
import { and, eq, isNotNull, lt, or } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { connection } from 'next/server'
import { DeleteObjectsCommand } from '@aws-sdk/client-s3'
import getS3Client from '@/lib/server/get-s3-client'
import path from 'path'

import crypto from 'crypto'

export async function GET(request: Request) {
  await connection()
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || cronSecret.trim() === '') {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const authHeader = request.headers.get('authorization')
  const expectedHeader = `Bearer ${cronSecret}`

  if (
    !authHeader ||
    authHeader.length !== expectedHeader.length ||
    !crypto.timingSafeEqual(Buffer.from(authHeader), Buffer.from(expectedHeader))
  ) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const expiringShares = await db
    .update(share)
    .set({ code: null, active: false })
    .where(and(lt(share.expireAt, new Date()), or(isNotNull(share.code), eq(share.active, true))))
    .returning({ id: share.id, file: share.file })

  let result = []
  if (expiringShares.length > 0) {
    const files: { Key: string }[] = []
    for (const share of expiringShares) {
      if (share.file) {
        for (const file of share.file) {
          files.push({ Key: `${share.id}/${path.basename(file)}` })
        }
      }
    }

    const client = getS3Client()
    while (files.length > 0) {
      const chunk = files.splice(0, 1000)
      const command = new DeleteObjectsCommand({
        Bucket: process.env.R2_BUCKET!,
        Delete: { Objects: chunk },
      })
      result.push(await client.send(command))
    }
    console.log(result)
    return NextResponse.json({ expired: expiringShares.length })
  } else {
    return NextResponse.json({ expired: 0, result: 'No expired shares' })
  }
}
