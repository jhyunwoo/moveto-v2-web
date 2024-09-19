import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개인정보처리방침 | Moveto',
}

export default function PrivacyPage() {
  return (
    <div className={'min-h-screen w-full p-4 text-white'}>
      <div>Privacy Page</div>
    </div>
  )
}
