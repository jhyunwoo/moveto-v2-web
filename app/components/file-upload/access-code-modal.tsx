'use client'

import QRCode from 'react-qr-code'
import { KeyIcon, QrCodeIcon, ShareIcon } from '@heroicons/react/24/outline'
import ModalLayout from '@/app/components/modal-layout'
import { useCode } from '@/lib/stores/code'
import { useToastStore } from '@/lib/stores/toast'

export default function AccessCodeModal() {
  const { code, setCode } = useCode((store) => store)
  const addToast = useToastStore((s) => s.addToast)

  async function shareFileLink() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

    await window.navigator.clipboard.writeText(`${siteUrl}/search/${code.replaceAll(' ', '_')}`)
    addToast('링크가 복사되었습니다.')
  }

  return (
    <ModalLayout isOpen={code !== ''} closeModal={() => setCode('')}>
      <div className="flex flex-col gap-5">
        <div>
          <div className="mb-2 flex items-center gap-1.5 font-display text-sm font-600 uppercase tracking-wider text-text-secondary">
            <KeyIcon className="size-4" />
            <div>접근 코드</div>
          </div>
          <div className="rounded-xl border-2 border-border-primary bg-surface p-3 text-center font-display text-2xl font-800 tracking-tight sm:p-4 sm:text-3xl">
            {code}
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-center">
          <div className="mb-2 flex items-center gap-1.5 font-display text-sm font-600 uppercase tracking-wider text-text-secondary">
            <QrCodeIcon className="size-4" />
            <div>QR Code</div>
          </div>
          <div className="mx-auto rounded-xl border-2 border-border-primary bg-white p-3 sm:p-4">
            <QRCode
              title="Access Code"
              value={`${process.env.NEXT_PUBLIC_SITE_URL}/search/${encodeURIComponent(code.replaceAll(' ', '_'))}`}
              size={192}
              style={{ width: '100%', maxWidth: 256, height: 'auto' }}
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-2">
          <button
            onClick={shareFileLink}
            type="button"
            className="modern-card flex cursor-pointer items-center gap-1.5 rounded-xl p-2.5 px-4 font-display font-600 text-text-primary transition-colors hover:bg-accent-soft"
          >
            <ShareIcon className="size-5" />
            <div>링크 복사</div>
          </button>
          <button
            type="button"
            onClick={() => setCode('')}
            className="grow cursor-pointer rounded-xl border-2 border-accent bg-accent p-2.5 px-4 font-display font-700 text-white transition-colors hover:bg-accent-hover hover:border-accent-hover"
          >
            확인
          </button>
        </div>
      </div>
    </ModalLayout>
  )
}
