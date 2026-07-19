import decodeKoCode from '@/lib/decode-uri-share-code'
import db from '@/db'
import { and, eq, gte } from 'drizzle-orm'
import { logs, share } from '@/db/schema'
import { CloudArrowDownIcon, FolderOpenIcon } from '@heroicons/react/24/outline'
import ShareButton from '@/app/components/share-button'
import HomePageButton from '@/app/components/homepage-button'
import getS3Client from '@/lib/server/get-s3-client'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import DeleteShareButton from '@/app/components/delete-share-button'
import getIp from '@/lib/server/get-user-ip'
import { getSession } from '@/auth'
import HomeEntrance from '@/app/components/home-entrance'
import path from 'path'

export default async function SearchPage({ params }: { params: Promise<{ code: string }> }) {
  const code = decodeKoCode((await params).code)
  const shareData = await db.query.share.findFirst({
    where: and(eq(share.code, code), gte(share.expireAt, new Date()), eq(share.active, true)),
  })

  const r2client = getS3Client()
  const urlRequests = []
  if (shareData?.file) {
    for (const file of shareData.file) {
      const downloadCommand = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: `${shareData.id}/${path.basename(file)}`,
        ResponseContentDisposition: `attachment; filename="${path.basename(file)}"`,
      })
      urlRequests.push(getSignedUrl(r2client, downloadCommand, { expiresIn: 60 * 60 * 24 }))
    }
  }
  const downloadUrl = await Promise.all(urlRequests)

  if (shareData) {
    const session = await getSession()
    await db.insert(logs).values({
      ip: await getIp(),
      shareId: shareData.id,
      userId: session ? session.user.id : null,
    })

    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-12 text-text-primary sm:px-6 sm:py-16 lg:px-8">
        <HomeEntrance delay={0}>
          <div className="mb-8">
            <p className="text-sm font-600 text-text-secondary">공유된 파일</p>
            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h1 className="flex min-w-0 items-center gap-3 text-3xl font-700 sm:text-4xl">
                <FolderOpenIcon className="size-8 shrink-0 text-accent" />
                <span className="truncate">{code}</span>
              </h1>
              <ShareButton url={`${process.env.NEXT_PUBLIC_SITE_URL}/search/${code.replaceAll(' ', '_')}`} />
            </div>
          </div>
        </HomeEntrance>

        <HomeEntrance delay={0.04}>
          <section className="document-panel overflow-hidden" aria-labelledby="file-list-title">
            <div className="border-b border-border-subtle px-4 py-3 sm:px-5">
              <h2 id="file-list-title" className="text-sm font-700">다운로드할 파일</h2>
            </div>
            {shareData.file?.map((fileData, index) => (
              <div key={fileData} className="flex min-h-16 items-center justify-between gap-4 border-b border-border-subtle px-4 py-3 last:border-b-0 sm:px-5">
                <div className="min-w-0 break-all text-sm font-600 sm:text-base">{fileData}</div>
                <a href={downloadUrl[index]} download={fileData} className="btn-primary shrink-0 px-3 sm:px-4" aria-label={`${fileData} 다운로드`}>
                  <CloudArrowDownIcon className="size-[18px]" />
                  <span className="hidden sm:inline">다운로드</span>
                </a>
              </div>
            ))}
          </section>
        </HomeEntrance>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <DeleteShareButton shareId={shareData.id} />
          <div className="mt-6"><HomePageButton /></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] w-full items-center justify-center px-4 py-16 text-text-primary">
      <HomeEntrance className="w-full max-w-md">
        <div className="document-panel p-7 text-center sm:p-9">
          <div className="text-5xl font-700">404</div>
          <h1 className="mt-4 text-xl font-700">공유 코드를 찾을 수 없습니다</h1>
          <p className="mt-2 text-sm leading-6 text-text-secondary">코드가 정확한지, 공유 시간이 만료되지 않았는지 확인해주세요.</p>
          <HomePageButton />
        </div>
      </HomeEntrance>
    </div>
  )
}
