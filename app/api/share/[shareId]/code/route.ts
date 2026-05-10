import { NextRequest, NextResponse } from 'next/server'
import getS3Client from '@/lib/server/get-s3-client'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import db from '@/db'
import { adjectives, nouns, share } from '@/db/schema'
import { count, eq } from 'drizzle-orm'
import { getSession } from '@/auth'
import getUserLimit from '@/lib/get-user-limit'
import getUsedStorage from '@/lib/get-used-storage'
import { addMinutes } from 'date-fns'
import deleteShareFiles from '@/lib/server/delete-share-files'
import checkShareAuth from '@/lib/server/check-share-auth'
import crypto from 'crypto'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ shareId: string }> }) {
  const client = getS3Client()
  const paramsData = await params

  if (!(await checkShareAuth(paramsData.shareId))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const command = new ListObjectsV2Command({
    Bucket: process.env.R2_BUCKET,
    Prefix: paramsData.shareId,
  })
  const result = await client.send(command)

  // Get total size of files
  let totalSize = 0
  if (result.Contents) {
    const shareData = (await db.select({ file: share.file }).from(share).where(eq(share.id, paramsData.shareId)))[0]
    if (shareData.file?.length === result.Contents.length) {
      for (const content of result.Contents) {
        totalSize += Number(content.Size)
      }
    }
  }
  // Check if totalSize is within user limit
  const session = await getSession()
  const limit = getUserLimit(session?.user.plan)

  const usedStorage = await getUsedStorage()

  if (usedStorage + totalSize > limit.storage) {
    await deleteShareFiles(paramsData.shareId)
    return NextResponse.json({ error: 'Exceeded storage limit' }, { status: 403 })
  }

  // Create access code of files
  const nounLength = (await db.select({ count: count() }).from(nouns))[0].count
  const adjectiveLength = (await db.select({ count: count() }).from(adjectives))[0].count
  const randomNounId = crypto.randomInt(1, nounLength + 1)
  const randomAdjectiveId = crypto.randomInt(1, adjectiveLength + 1)
  const randomNoun = (await db.select().from(nouns).where(eq(nouns.id, randomNounId)))[0].word
  const randomAdjective = (await db.select().from(adjectives).where(eq(adjectives.id, randomAdjectiveId)))[0].word

  const randomAccessCode = `${randomAdjective} ${randomNoun}`

  const body = await request.json()
  const shareTime = body.shareTime
  const currentTime = new Date()
  const expireTime = addMinutes(currentTime, shareTime)

  if (totalSize > 0) {
    await db
      .update(share)
      .set({
        storageSize: totalSize,
        code: randomAccessCode,
        expireAt: expireTime,
      })
      .where(eq(share.id, paramsData.shareId))
  } else {
    await db.update(share).set({ code: randomAccessCode, expireAt: expireTime }).where(eq(share.id, paramsData.shareId))
  }

  return NextResponse.json({ code: randomAccessCode })
}
