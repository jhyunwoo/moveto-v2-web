import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '웹사이트 이용약관 | 모베토 Moveto',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen w-full p-4 py-20 text-text-primary">
      <div className="brutalist-card mx-auto max-w-3xl rounded-2xl p-6 md:p-10">
        <h1 className="font-display text-3xl font-800 tracking-tight">웹사이트 이용약관</h1>
      </div>
    </div>
  )
}
