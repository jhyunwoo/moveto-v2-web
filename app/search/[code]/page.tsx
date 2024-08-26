import decodeKoCode from '@/lib/decode-ko-code'
import db from '@/db'
import { eq } from 'drizzle-orm'
import { share } from '@/db/schema'
import { CloudArrowDownIcon, FolderOpenIcon, TrashIcon } from '@heroicons/react/24/outline'
import ShareButton from '@/components/share-button'
import HomePageButton from '@/components/homepage-button'
import getS3Client from '@/lib/r2/get-s3-client'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export default async function SearchPage({ params }: { params: { code: string } }) {
  const code = decodeKoCode(params.code)
  const shareData = await db.query.share.findFirst({
    where: eq(share.code, code),
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
    return (
      <div className={'w-full min-h-screen md:pb-28 text-white p-4 flex flex-col gap-2 max-w-4xl mx-auto pt-24'}>
        <div className={'flex gap-2 items-center justify-between p-2 px-3 bg-neutral-900 rounded-xl'}>
          <div className={'flex gap-2 items-center'}>
            <FolderOpenIcon className={'size-8 text-white'} />
            <div className={'text-2xl font-bold'}> {code}</div>
          </div>
          <ShareButton
            title={`파일 공유 - ${code}`}
            url={`${process.env.SITE_URL}/search/${code.replaceAll(' ', '_')}`}
          />
        </div>
        <div className={'p-2 rounded-xl'}>
          <div className={'text-xl font-semibold'}>Files</div>
          <div className={'flex flex-col gap-1'}>
            {shareData.file?.map((fileData, index) => (
              <div key={index} className={'flex items-center justify-between bg-neutral-900 p-2 px-4 rounded-lg'}>
                <div className={'break-all'}>{fileData}</div>
                <a href={downloadUrl[index]} download={fileData}>
                  <CloudArrowDownIcon className={'size-8'} />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className={'w-full p-4 md:pb-12 fixed bottom-0 left-0 flex'}>
          <div className={'flex gap-2 max-w-4xl w-full mx-auto'}>
            <button
              className={
                'border-2 border-red-600 bg-neutral-900 p-3 px-4 items-center rounded-full flex gap-1 text-red-600'
              }
            >
              <TrashIcon className={'size-6'} />
              <div className={'text-lg font-semibold'}>삭제...</div>
            </button>
            <HomePageButton />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={'w-full h-screen flex flex-col items-center justify-center p-4 text-white'}>
      <div className={'text-2xl font-bold p-4'}>
        404 Not Found <br />
        코드를 찾을 수 없습니다
      </div>
      <HomePageButton />
    </div>
  )
}
