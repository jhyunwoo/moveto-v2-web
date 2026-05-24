import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '사용 방법 | 모베토 Moveto',
}

export default function HowToUsePage() {
  return (
    <div className="min-h-screen w-full p-4 py-20 text-text-primary">
      <div className="modern-card mx-auto max-w-3xl rounded-2xl p-6 md:p-10">
        <h1 className="font-display text-3xl font-800 tracking-tight">사용 방법</h1>
      </div>
    </div>
  )
}
