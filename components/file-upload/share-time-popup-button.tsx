'use client';

import { useRecoilState, useRecoilValue } from 'recoil';
import { totalFileSizeState, shareTimePopUpState } from '@/lib/recoil';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import getUserLimit from '@/lib/get-user-limit';
import ShareTimeController from '@/components/file-upload/share-time-controller';
import { useSession } from 'next-auth/react';

export default function ShareTimePopupButton() {
  const totalSize = useRecoilValue(totalFileSizeState);
  const [disabled, setDisabled] = useState(false);
  const [shareTimePopUp, setShareTimePopUp] = useRecoilState(shareTimePopUpState);
  const { data: session } = useSession();

  useEffect(() => {
    if (getUserLimit(session?.user.plan).storage < totalSize) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [session, totalSize]);

  if (totalSize > 0) {
    return (
      <>
        {shareTimePopUp && <ShareTimeController />}
        <button
          type={'button'}
          disabled={disabled}
          onClick={() => setShareTimePopUp(true)}
          className={
            'p-1 rounded-lg bg-white text-black group text-lg font-semibold flex items-center justify-center hover:bg-neutral-300 transition-colors disabled:bg-red-800 disabled:text-white'
          }
        >
          {!disabled ? (
            <div className={'flex items-center justify-center gap-1'}>
              <div>공유...</div>
            </div>
          ) : (
            <div className={'flex items-center justify-center gap-1'}>
              <ExclamationTriangleIcon className={'size-6'} />
              <div>저장공간 부족</div>
            </div>
          )}
        </button>
      </>
    );
  } else {
    return <></>;
  }
}
