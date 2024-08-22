'use client';

import { useSetRecoilState } from 'recoil';
import { uploadState } from '@/lib/recoil';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const planShareTime = {
  Free: [
    { value: 5, text: '5분' },
    { value: 10, text: '10분' },
    { value: 20, text: '20분' },
    { value: 30, text: '30분' },
  ],
  Pro: [
    { value: 5, text: '5분' },
    { value: 10, text: '10분' },
    { value: 20, text: '20분' },
    { value: 30, text: '30분' },
    { value: 60, text: '1시간' },
    { value: 180, text: '3시간' },
    { value: 360, text: '6시간' },
    { value: 720, text: '12시간' },
    { value: 1440, text: '1일' },
  ],
  Unauthorized: [
    { value: 5, text: '5분' },
    { value: 10, text: '10분' },
  ],
};

function shareTimeOption(userPlan: string | null | undefined) {
  switch (userPlan) {
    case 'Free':
      return planShareTime.Free;
    case 'Pro':
      return planShareTime.Pro;
    default:
      return planShareTime.Unauthorized;
  }
}

export default function ShareTimeController() {
  const setUploadState = useSetRecoilState(uploadState);
  const [selected, setSelected] = useState(0);
  const session = useSession();

  return (
    <div
      className={
        'fixed top-0 left-0 w-full h-screen z-10 bg-neutral-950/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm'
      }
    >
      <div className={'w-full max-w-3xl flex flex-col bg-neutral-900 rounded-xl relative p-4'}>
        <button onClick={() => setUploadState(false)} className={'absolute right-2 top-2'}>
          <XCircleIcon className={'size-8 text-white'} />
        </button>
        <div className={'text-2xl font-semibold py-2'}>공유 시간</div>
        <div className={'grid grid-cols-3 grid-rows-3 gap-2'}>
          {shareTimeOption(session.data?.user.plan).map((data, index) => (
            <button
              onClick={() => setSelected(index)}
              key={index}
              className={`p-3 rounded-lg ${index === selected ? 'bg-neutral-300 text-black hover:bg-neutral-400' : 'bg-neutral-700 hover:bg-neutral-800'} flex items-center justify-center transition-colors`}
            >
              <div>{data.text}</div>
            </button>
          ))}
        </div>
        <button
          type={'button'}
          className={
            'bg-white text-lg font-semibold p-2 rounded-full text-black mt-8 hover:bg-neutral-200 transition-colors'
          }
        >
          공유
        </button>
      </div>
    </div>
  );
}
