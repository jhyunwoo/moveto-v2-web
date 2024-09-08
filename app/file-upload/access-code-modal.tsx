'use client'

import { useRecoilState } from 'recoil'
import { codeState } from '@/lib/client/recoil'
import QRCode from 'react-qr-code'
import { KeyIcon, QrCodeIcon, ShareIcon } from '@heroicons/react/24/outline'
import ModalLayout from '@/components/modal-layout'

export default function AccessCodeModal() {
  const [code, setCode] = useRecoilState(codeState)

  function shareFileLink() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

    try {
      window.navigator
        .share({
          title: `${code} | 모베토 파일 공유`,
          url: `${siteUrl}/search/${code.replaceAll(' ', '_')}`,
        })
        .then(data => console.log(data))
    } catch {
      window.navigator.clipboard.writeText(`${siteUrl}/search/${code.replaceAll(' ', '_')}`)
    }
  }

  return (
    <ModalLayout isOpen={code !== ''} closeModal={() => setCode('')}>
      <div className={'flex flex-col gap-4'}>
        <div>
          <div className={'mb-1 flex items-center gap-1 text-sm text-neutral-200'}>
            <KeyIcon className={'size-5'} />
            <div>접근 코드</div>
          </div>
          <div className={'rounded-xl bg-neutral-800 p-4 text-center text-3xl font-bold'}>{code}</div>
        </div>
        <div className={'flex w-full flex-col items-start justify-center'}>
          <div className={'mb-1 flex items-center gap-1 text-sm text-neutral-200'}>
            <QrCodeIcon className={'size-6'} />
            <div>QR Code</div>
          </div>
          <div className={'mx-auto rounded-xl bg-neutral-600 p-4'}>
            <QRCode
              value={`${process.env.NEXT_PUBLIC_SITE_URL}/search/${encodeURIComponent(code.replaceAll(' ', '_'))}`}
            />
          </div>
        </div>
        <div className={'flex w-full items-center gap-2'}>
          <button
            onClick={shareFileLink}
            type={'button'}
            className={
              'flex items-center gap-1 rounded-full border-2 border-neutral-200 bg-neutral-950 p-2 px-4 pr-5 text-neutral-50'
            }
          >
            <ShareIcon className={'size-5'} />
            <div>공유</div>
          </button>
          <button
            type={'button'}
            onClick={() => setCode('')}
            className={'grow rounded-full bg-neutral-50 p-2 px-4 font-semibold text-neutral-950'}
          >
            확인
          </button>
        </div>
      </div>
    </ModalLayout>
  )
}
