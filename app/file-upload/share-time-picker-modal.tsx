import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import FileUploadButton from '@/app/file-upload/file-upload-button'
import ModalLayout from '@/components/modal-layout'
import getShareTimeOptionsForPlan from '@/lib/get-share-time-options-for-plan'
import { useShareTimePopUp } from '@/lib/stores/share-time-pop-up'
import { useShareTime } from '@/lib/stores/share-time'

export default function ShareTimePickerModal() {
  const { shareTimePopUp, setShareTimePopUp } = useShareTimePopUp(store => store)
  const { shareTime, setShareTime } = useShareTime(store => store)
  const session = useSession()

  const planShareTime = getShareTimeOptionsForPlan(session.data?.user.plan)

  useEffect(() => {
    setShareTime(planShareTime[0]?.value)
  }, [planShareTime, setShareTime])

  return (
    <ModalLayout isOpen={shareTimePopUp} closeModal={() => setShareTimePopUp(false)}>
      <div className={'py-2 text-2xl font-semibold'}>공유 시간</div>
      <div className={'grid grid-cols-3 grid-rows-3 gap-2'}>
        {planShareTime.map(data => (
          <button
            onClick={() => setShareTime(data.value)}
            key={data.text}
            className={`rounded-lg p-3 ${shareTime === data.value ? 'bg-neutral-100 text-black' : 'bg-neutral-800 text-neutral-50'} flex items-center justify-center transition-colors`}
          >
            <div>{data.text}</div>
          </button>
        ))}
      </div>
      <div className={'mt-4 flex w-full items-center gap-2'}>
        <button
          className={'w-auto rounded-full border-2 border-red-600 p-2 px-4 text-red-500'}
          type={'button'}
          onClick={() => setShareTimePopUp(false)}
        >
          취소
        </button>
        <FileUploadButton />
      </div>
    </ModalLayout>
  )
}
