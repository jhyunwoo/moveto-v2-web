import { NextResponse } from 'next/server'
import deleteShareFiles from '@/lib/server/delete-share-files'

export async function DELETE(request: Request, { params }: { params: Promise<{ shareId: string }> }) {
  try {
    await deleteShareFiles((await params).shareId)
    return NextResponse.json({ message: 'Success' }, { status: 200 })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'Share not found') {
      return NextResponse.json({ message: 'Not Found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}
