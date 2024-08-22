'use client';

import { useRecoilState, useRecoilValue } from 'recoil';
import { totalFileSizeState, uploadState } from '@/lib/recoil';
import { ArrowUpOnSquareStackIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import getUserLimit from '@/lib/get-user-limit';
import ShareTimeController from '@/components/share-time-controller';

export default function FileUploadButton() {
  const totalSize = useRecoilValue(totalFileSizeState);
  const session = useSession();
  const [disabled, setDisabled] = useState(false);
  const [upload, setUpload] = useRecoilState(uploadState);

  useEffect(() => {
    if (getUserLimit(session.data?.user.plan).storage < totalSize) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [session.data?.user.plan, totalSize]);

  if (totalSize > 0) {
    return (
      <>
        {upload && <ShareTimeController />}
        <button
          type={'button'}
          disabled={disabled}
          onClick={() => setUpload(true)}
          className={
            'p-1 rounded-lg bg-white text-black group text-lg font-semibold flex items-center justify-center hover:bg-neutral-300 transition-colors disabled:bg-red-800 disabled:text-white'
          }
        >
          {!disabled ? (
            <div className={'flex items-center justify-center gap-1'}>
              <ArrowUpOnSquareStackIcon className={'size-6'} />
              <div>공유</div>
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
