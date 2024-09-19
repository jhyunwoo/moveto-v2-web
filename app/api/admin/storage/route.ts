import db from '@/db'
import { share } from '@/db/schema'
import { and, eq, isNotNull, lt, or } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { DeleteObjectsCommand } from '@aws-sdk/client-s3'
import getS3Client from '@/lib/server/get-s3-client'

export const dynamic = 'force-dynamic'

export async function GET() {
  const expiringShares = await db
    .update(share)
    .set({ code: null })
    .where(and(lt(share.expireAt, new Date()), or(isNotNull(share.code), eq(share.active, true))))
    .returning({ id: share.id, file: share.file })

  if (expiringShares.length > 0) {
    const files: { Key: string }[] = []
    for (const share of expiringShares) {
      if (share.file) {
        for (const file of share.file) {
          files.push({ Key: `${share.id}/${file}` })
        }
      }
    }
    const client = getS3Client()
    const command = new DeleteObjectsCommand({
      Bucket: process.env.R2_BUCKET!,
      Delete: { Objects: files },
    })
    const result = await client.send(command)

    return NextResponse.json({ expired: expiringShares.length, result })
  } else {
    return NextResponse.json({ expired: 0, result: 'No expired shares' })
  }
}
