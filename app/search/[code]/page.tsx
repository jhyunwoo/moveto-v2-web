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
import ShareExpiryCountdown from '@/app/components/share-expiry-countdown'
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
    // Best-effort download log. Bound it so a stalled D1 write can never hold the
    // response until the ~50s runtime limit (which surfaces as a 500). Kept inline
    // rather than after()/waitUntil, which on Cloudflare gates the streamed response.
    try {
      await Promise.race([
        db.insert(logs).values({
          ip: await getIp(),
          shareId: shareData.id,
          userId: session ? session.user.id : null,
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('log insert timed out')), 5000)),
      ])
    } catch (error) {
      console.error('Failed to record download log', error)
    }

    const serverNow = new Date().getTime()

    return (
      <div className="text-text-primary mx-auto flex w-full max-w-4xl flex-col px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <HomeEntrance delay={0}>
          <div className="mb-8">
            <p className="font-600 text-text-secondary text-sm">공유된 파일</p>
            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <h1 className="font-700 flex min-w-0 items-center gap-3 text-3xl sm:text-4xl">
                  <FolderOpenIcon className="text-accent size-8 shrink-0" />
                  <span className="truncate">{code}</span>
                </h1>
                <ShareExpiryCountdown expiresAt={shareData.expireAt!.getTime()} serverNow={serverNow} />
              </div>
              <ShareButton url={`${process.env.NEXT_PUBLIC_SITE_URL}/search/${code.replaceAll(' ', '_')}`} />
            </div>
          </div>
        </HomeEntrance>

        <HomeEntrance delay={0.04}>
          <section className="document-panel overflow-hidden" aria-labelledby="file-list-title">
            <div className="border-border-subtle border-b px-4 py-3 sm:px-5">
              <h2 id="file-list-title" className="font-700 text-sm">
                다운로드할 파일
              </h2>
            </div>
            {shareData.file?.map((fileData, index) => (
              <div
                key={fileData}
                className="border-border-subtle flex min-h-16 items-center justify-between gap-4 border-b px-4 py-3 last:border-b-0 sm:px-5"
              >
                <div className="font-600 min-w-0 text-sm break-all sm:text-base">{fileData}</div>
                <a
                  href={downloadUrl[index]}
                  download={fileData}
                  className="btn-primary shrink-0 px-3 sm:px-4"
                  aria-label={`${fileData} 다운로드`}
                >
                  <CloudArrowDownIcon className="size-[18px]" />
                  <span className="hidden sm:inline">다운로드</span>
                </a>
              </div>
            ))}
          </section>
        </HomeEntrance>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <DeleteShareButton shareId={shareData.id} />
          <div>
            <HomePageButton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-text-primary flex min-h-[calc(100dvh-4rem)] w-full items-center justify-center px-4 py-16">
      <HomeEntrance className="w-full max-w-md">
        <div className="document-panel p-7 text-center sm:p-9">
          <div className="font-700 text-5xl">404</div>
          <h1 className="font-700 mt-4 text-xl">공유 코드를 찾을 수 없습니다</h1>
          <p className="text-text-secondary mt-2 text-sm leading-6">
            코드가 정확한지, 공유 시간이 만료되지 않았는지 확인해주세요.
          </p>
          <div className="mt-7">
            <HomePageButton />
          </div>
        </div>
      </HomeEntrance>
    </div>
  )
}
