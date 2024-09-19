import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '웹사이트 이용약관 | Moveto',
}

export default function TermsPage() {
  return (
    <div className={'min-h-screen w-full p-4 text-white'}>
      <div>Terms Page</div>
    </div>
  )
}
