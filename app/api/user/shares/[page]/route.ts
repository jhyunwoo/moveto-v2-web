import { getSession } from '@/auth'
import { NextResponse } from 'next/server'
import getUserShareHistory from '@/lib/server/get-user-share-history'

export const dynamic = 'force-dynamic'

export async function GET(request: Request, { params }: { params: Promise<{ page: string }> }) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const paramsData = await params
  const { shareList, pageLimit, currentPage } = await getUserShareHistory(session.user.id, Number(paramsData.page))

  return NextResponse.json({ shareList, pageLimit, currentPage })
}
