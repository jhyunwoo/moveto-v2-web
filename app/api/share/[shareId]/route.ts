import { NextResponse } from 'next/server'
import deleteShareFiles from '@/lib/server/delete-share-files'

export async function DELETE(request: Request, { params }: { params: Promise<{ shareId: string }> }) {
  try {
    await deleteShareFiles((await params).shareId)
    return NextResponse.json({ message: 'Success' }, { status: 200 })
  } catch {
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}
