import { NextResponse } from 'next/server'
import db from '@/db'
import { adjectives, nouns } from '@/db/schema'
import { adjectiveList, nounList } from '@/app/api/admin/word/data'

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }

  await db.insert(nouns).values(nounList)
  await db.insert(adjectives).values(adjectiveList)
  return NextResponse.json({ message: 'Success' })
}
