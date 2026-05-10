import db from '@/db'
import { share } from '@/db/schema'
import { and, eq, isNotNull, lt, or } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { DeleteObjectsCommand } from '@aws-sdk/client-s3'
import getS3Client from '@/lib/server/get-s3-client'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const expiringShares = await db
    .update(share)
    .set({ code: null })
    .where(and(lt(share.expireAt, new Date()), or(isNotNull(share.code), eq(share.active, true))))
    .returning({ id: share.id, file: share.file })

  let result = []
  if (expiringShares.length > 0) {
    const files: { Key: string }[] = []
    for (const share of expiringShares) {
      if (share.file) {
        for (const file of share.file) {
          files.push({ Key: `${share.id}/${file}` })
        }
      }
    }

    for (let i = 0; i < Math.ceil(files.length / 1000); i += 1) {
      const chunk = files.splice(i * 1000, 1000)
      const client = getS3Client()
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
