import { NextResponse } from 'next/server'
import { connection } from 'next/server'
import getUsedStorage from '@/lib/get-used-storage'

export async function GET() {
  await connection()
  return NextResponse.json({ storageSize: await getUsedStorage() })
}
