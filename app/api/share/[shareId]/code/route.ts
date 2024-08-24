import { NextRequest, NextResponse } from 'next/server'
import getS3Client from '@/lib/r2/get-s3-client'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import db from '@/db'
import { adjectives, nouns, share } from '@/db/schema'
import { count, eq } from 'drizzle-orm'
import { auth } from '@/auth'
import getUserLimit from '@/lib/get-user-limit'
import getUsedStorage from '@/lib/get-used-storage'
import { addMinutes } from 'date-fns'

export async function PUT(request: NextRequest, { params }: { params: { shareId: string } }) {
  const client = getS3Client()
  const command = new ListObjectsV2Command({
    Bucket: process.env.R2_BUCKET,
    Prefix: params.shareId,
  })
  const result = await client.send(command)

  if (!result.Contents) {
    return NextResponse.json({ error: 'No contents found' }, { status: 404 })
  }
  // Get total size of files
  let totalSize = 0
  for (const content of result.Contents) {
    totalSize += Number(content.Size)
  }
  // Check if totalSize is within user limit
  const session = await auth()
  const limit = getUserLimit(session?.user.plan)

  const usedStorage = await getUsedStorage(session?.user.id)

  if (usedStorage + totalSize > limit.storage) {
    return NextResponse.json({ error: 'Exceeded storage limit' }, { status: 403 })
  }

  // Create access code of files
  const nounLength = (await db.select({ count: count() }).from(nouns))[0].count
  const adjectiveLength = (await db.select({ count: count() }).from(adjectives))[0].count
  const randomNounId = Math.floor(Math.random() * nounLength) + 1
  const randomAdjectiveId = Math.floor(Math.random() * adjectiveLength) + 1
  const randomNoun = (await db.select().from(nouns).where(eq(nouns.id, randomNounId)))[0].word
  const randomAdjective = (await db.select().from(adjectives).where(eq(adjectives.id, randomAdjectiveId)))[0].word

  const randomAccessCode = `${randomAdjective} ${randomNoun}`

  const body = await request.json()
  const shareTime = body.shareTime
  const currentTime = new Date()
  const expireTime = addMinutes(currentTime, shareTime)

  await db
    .update(share)
    .set({ storageSize: totalSize, code: randomAccessCode, expireAt: expireTime })
    .where(eq(share.id, params.shareId))

  return NextResponse.json({ code: randomAccessCode })
}
