'use client'

import QRCode from 'react-qr-code'
import { CheckCircleIcon, ClipboardDocumentIcon, LinkIcon } from '@heroicons/react/24/outline'
import ModalLayout from '@/app/components/modal-layout'
import { useCode } from '@/lib/stores/code'
import { useToastStore } from '@/lib/stores/toast'

export default function AccessCodeModal() {
  const { code, setCode } = useCode((store) => store)
  const addToast = useToastStore((store) => store.addToast)
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/search/${encodeURIComponent(code.replaceAll(' ', '_'))}`

  async function copyText(value: string, message: string) {
    await window.navigator.clipboard.writeText(value)
    addToast(message)
  }

  return (
    <ModalLayout isOpen={code !== ''} closeModal={() => setCode('')} ariaLabel="공유 완료">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
          <CheckCircleIcon className="size-6" />
        </span>
        <div>
          <h2 className="text-xl font-700 text-text-primary">공유가 준비됐어요</h2>
          <p className="mt-1 text-sm leading-6 text-text-secondary">코드나 링크를 상대에게 전달하세요.</p>
        </div>
      </div>

      <div className="mt-6 grid items-center gap-5 sm:grid-cols-[minmax(0,1fr)_160px]">
        <div className="min-w-0">
          <span className="section-label mb-2 block">공유 코드</span>
          <div className="flex items-center gap-2 rounded-lg border border-border-primary bg-surface/82 p-2 pl-4">
            <strong className="min-w-0 grow break-keep text-xl font-700 text-text-primary sm:text-2xl">{code}</strong>
            <button
              type="button"
              className="icon-button"
              onClick={() => copyText(code, '공유 코드가 복사되었습니다.')}
              aria-label="공유 코드 복사"
              title="공유 코드 복사"
            >
              <ClipboardDocumentIcon className="size-5" />
            </button>
          </div>
          <p className="mt-2 text-xs leading-5 text-text-muted">선택한 만료 시간이 지나면 파일은 자동으로 삭제됩니다.</p>
        </div>

        <div className="mx-auto rounded-lg border border-border-primary bg-white p-3">
          <QRCode title="공유 링크 QR 코드" value={shareUrl} size={132} />
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button type="button" onClick={() => copyText(shareUrl, '공유 링크가 복사되었습니다.')} className="btn-secondary px-4">
          <LinkIcon className="size-[18px]" />
          링크 복사
        </button>
        <button type="button" onClick={() => setCode('')} className="btn-primary px-6">
          완료
        </button>
      </div>
    </ModalLayout>
  )
}
