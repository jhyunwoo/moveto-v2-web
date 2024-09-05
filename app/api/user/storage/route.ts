import { NextResponse } from 'next/server'
import getUsedStorage from '@/lib/get-used-storage'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({ storageSize: await getUsedStorage() })
}
