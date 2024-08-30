import { NextResponse } from 'next/server'
import getUsedStorage from '@/lib/get-used-storage'

export async function GET() {
  return NextResponse.json({ storageSize: await getUsedStorage() })
}
