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

export default async function SearchPage({ params }: { params: Promise<{ code: string }> }) {
  const code = decodeKoCode((await params).code)
  const shareData = await db.query.share.findFirst({
    where: and(eq(share.code, code), gte(share.expireAt, new Date()), eq(share.active, true)),
  })

  const r2client = getS3Client()
  const urlRequests = []
  if (shareData?.file) {
    for (const file of shareData?.file) {
      const downloadCommand = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: `${shareData.id}/${file}`,
        ResponseContentDisposition: `attachment; filename="${file}"`,
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
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-3xl flex-col gap-3 p-4 pt-20 pb-24 text-text-primary sm:pt-24 md:pb-28">
        <HomeEntrance delay={0}>
          <div className="modern-card flex items-center justify-between gap-2 rounded-xl p-3 px-4">
            <div className="flex min-w-0 items-center gap-2">
              <FolderOpenIcon className="size-6 shrink-0 sm:size-7" />
              <div className="truncate font-display text-xl font-800 tracking-tight sm:text-2xl">{code}</div>
            </div>
            <ShareButton url={`${process.env.NEXT_PUBLIC_SITE_URL}/search/${code.replaceAll(' ', '_')}`} />
          </div>
        </HomeEntrance>
        <HomeEntrance delay={0.05}>
          <div className="p-2">
            <div className="font-display text-lg font-700 uppercase tracking-wider">파일</div>
            <div className="mt-2 flex flex-col gap-2">
              {shareData.file?.map((fileData, index) => (
                <HomeEntrance key={index} delay={0.08 + index * 0.04}>
                  <div className="modern-card flex items-center justify-between gap-2 rounded-xl p-3 px-4">
                    <div className="min-w-0 break-all font-display text-sm font-600 sm:text-base">{fileData}</div>
                    <a
                      href={downloadUrl[index]}
                      download={fileData}
                      className="shrink-0 rounded-lg border-2 border-transparent p-1 transition-colors hover:border-accent hover:bg-accent-soft"
                      aria-label={`${fileData} 다운로드`}
                    >
                      <CloudArrowDownIcon className="size-7 text-accent sm:size-8" />
                    </a>
                  </div>
                </HomeEntrance>
              ))}
            </div>
          </div>
        </HomeEntrance>
        <div className="fixed bottom-0 left-0 flex w-full border-t-2 border-border-subtle bg-surface/80 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-3xl gap-2">
            <DeleteShareButton shareId={shareData?.id} />
            <HomePageButton />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center p-4 text-text-primary">
      <HomeEntrance>
        <div className="modern-card rounded-2xl p-8 text-center">
          <div className="font-display text-4xl font-800">404</div>
          <div className="mt-2 text-text-secondary">코드를 찾을 수 없습니다</div>
        </div>
      </HomeEntrance>
      <div className="fixed bottom-0 left-0 flex w-full border-t-2 border-border-subtle bg-surface/80 p-4 backdrop-blur-md md:pb-12">
        <div className="mx-auto flex w-full max-w-3xl gap-2">
          <HomePageButton />
        </div>
      </div>
    </div>
  )
}
