'use client'

import { useRecoilState } from 'recoil'
import { codeState } from '@/lib/recoil'
import QRCode from 'react-qr-code'

export default function AccessCode() {
  const [code, setCode] = useRecoilState(codeState)

  function shareFileLink() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

    try {
      window.navigator
        .share({
          title: `${code} | 모베토 파일 공유`,
          url: `${siteUrl}/search/${code}`,
        })
        .then(data => console.log(data))
    } catch {
      window.navigator.clipboard.writeText(`${siteUrl}/search/${code}`)
    }
  }
  return (
    <div
      className={
        'fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-neutral-950/80 p-4 z-10 backdrop-blur-sm'
      }
    >
      <div className={'w-full max-w-xl p-4 rounded-xl bg-neutral-900 flex flex-col gap-4'}>
        <div>
          <div className={'text-sm text-neutral-200 mb-1'}>접근 코드</div>
          <div className={'text-3xl font-bold p-4 text-center bg-neutral-800 rounded-xl'}>{code}</div>
        </div>
        <div className={'w-full flex flex-col items-start justify-center'}>
          <div className={'text-sm text-neutral-200 mb-1'}>QR Code</div>
          <div className={'mx-auto p-4 rounded-xl bg-neutral-600'}>
            <QRCode
              value={`${process.env.NEXT_PUBLIC_SITE_URL}/search/${encodeURIComponent(code.replaceAll(' ', '_'))}`}
            />
          </div>
        </div>
        <div className={'w-full flex gap-2 items-center'}>
          <button
            onClick={shareFileLink}
            type={'button'}
            className={'px-4 p-2 rounded-full bg-neutral-950 text-neutral-50'}
          >
            공유
          </button>
          <button
            type={'button'}
            onClick={() => setCode('')}
            className={'grow p-2 px-4 font-semibold rounded-full bg-neutral-50 text-neutral-950'}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
