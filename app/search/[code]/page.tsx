import decodeKoCode from '@/lib/decode-uri-share-code'
import db from '@/db'
import { and, eq, gte } from 'drizzle-orm'
import { logs, share } from '@/db/schema'
import { CloudArrowDownIcon, FolderOpenIcon } from '@heroicons/react/24/outline'
import ShareButton from '@/components/share-button'
import HomePageButton from '@/components/homepage-button'
import getS3Client from '@/lib/r2/get-s3-client'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import DeleteShareButton from '@/components/delete-share-button'
import getIp from '@/lib/server/get-user-ip'
import { auth } from '@/auth'

export const dynamic = 'force-dynamic'

export default async function SearchPage({ params }: { params: { code: string } }) {
  const code = decodeKoCode(params.code)
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
    const session = await auth()
    await db.insert(logs).values({ ip: getIp(), shareId: shareData.id, userId: session ? session.user.id : null })

    return (
      <div className={'mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-2 p-4 pb-24 pt-24 text-white md:pb-28'}>
        <div className={'flex items-center justify-between gap-2 rounded-xl bg-neutral-900 p-2 px-3'}>
          <div className={'flex items-center gap-2'}>
            <FolderOpenIcon className={'size-8 text-white'} />
            <div className={'text-2xl font-bold'}>{code}</div>
          </div>
          <ShareButton
            title={`파일 공유 - ${code}`}
            url={`${process.env.NEXT_PUBLIC_SITE_URL}/search/${code.replaceAll(' ', '_')}`}
          />
        </div>
        <div className={'rounded-xl p-2'}>
          <div className={'text-xl font-semibold'}>파일</div>
          <div className={'flex flex-col gap-1'}>
            {shareData.file?.map((fileData, index) => (
              <div key={index} className={'flex items-center justify-between rounded-lg bg-neutral-900 p-2 px-4'}>
                <div className={'break-all'}>{fileData}</div>
                <a href={downloadUrl[index]} download={fileData}>
                  <CloudArrowDownIcon className={'size-8'} />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className={'fixed bottom-0 left-0 flex w-full p-4 md:pb-12'}>
          <div className={'mx-auto flex w-full max-w-4xl gap-2'}>
            <DeleteShareButton code={params.code} />
            <HomePageButton />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={'flex h-screen w-full flex-col items-center justify-center p-4 text-white'}>
      <div className={'p-4 text-2xl font-bold'}>
        404 Not Found <br />
        코드를 찾을 수 없습니다
      </div>
      <div className={'fixed bottom-0 left-0 flex w-full p-4 md:pb-12'}>
        <div className={'mx-auto flex w-full max-w-4xl gap-2'}>
          <HomePageButton />
        </div>
      </div>
    </div>
  )
}
