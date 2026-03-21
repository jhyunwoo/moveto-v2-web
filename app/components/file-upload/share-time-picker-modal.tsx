import { useSession } from '@/lib/auth-client'
import { useEffect } from 'react'
import FileUploadButton from '@/app/components/file-upload/file-upload-button'
import ModalLayout from '@/app/components/modal-layout'
import getShareTimeOptionsForPlan from '@/lib/get-share-time-options-for-plan'
import { useShareTimePopUp } from '@/lib/stores/share-time-pop-up'
import { useShareTime } from '@/lib/stores/share-time'

export default function ShareTimePickerModal({ upload }: { upload: () => void }) {
  const { shareTimePopUp, setShareTimePopUp } = useShareTimePopUp((store) => store)
  const { shareTime, setShareTime } = useShareTime((store) => store)
  const session = useSession()

  const planShareTime = getShareTimeOptionsForPlan(session.data?.user.plan)

  useEffect(() => {
    setShareTime(planShareTime[0]?.value)
  }, [planShareTime, setShareTime])

  return (
    <ModalLayout isOpen={shareTimePopUp} closeModal={() => setShareTimePopUp(false)}>
      <div className="pb-3 font-display text-xl font-700 sm:text-2xl">공유 시간</div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {planShareTime.map((data) => (
          <button
            onClick={() => setShareTime(data.value)}
            key={data.text}
            className={`cursor-pointer rounded-xl border-2 p-2.5 font-display text-sm font-600 transition-colors sm:p-3 sm:text-base ${shareTime === data.value ? 'border-accent bg-accent text-white' : 'border-border-primary bg-surface-elevated text-text-primary hover:border-accent hover:bg-accent-soft'} flex items-center justify-center`}
          >
            <div>{data.text}</div>
          </button>
        ))}
      </div>
      <div className="mt-4 flex w-full items-center gap-2">
        <button
          className="w-auto cursor-pointer rounded-xl border-2 border-danger p-2.5 px-4 font-display font-600 text-danger transition-colors hover:bg-danger hover:text-white"
          type="button"
          onClick={() => setShareTimePopUp(false)}
        >
          취소
        </button>
        <FileUploadButton upload={upload} />
      </div>
    </ModalLayout>
  )
}
