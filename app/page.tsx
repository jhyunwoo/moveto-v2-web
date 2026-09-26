import type { CSSProperties } from 'react'
import FileUpload from '@/app/components/file-upload/file-upload'
import ReceivePanel from '@/app/components/receive-panel'
import JsonLd from '@/app/components/json-ld'

const steps = [
  { title: '파일 선택', description: '공유할 파일을 끌어다 놓거나 선택하세요.' },
  { title: '코드 생성', description: '업로드가 끝나면 한글 공유 코드가 만들어져요.' },
  { title: '코드로 받기', description: '받는 쪽에서 코드를 입력하면 바로 내려받아요.' },
]

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 pt-6 pb-20 sm:px-6 sm:pt-10">
      <JsonLd />
      <section
        id="upload"
        className="grid scroll-mt-20 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px]"
        aria-label="파일 전송 작업 영역"
      >
        <div className="fade-in" style={{ '--i': 1 } as CSSProperties}>
          <FileUpload />
        </div>
        <div className="fade-in" style={{ '--i': 2 } as CSSProperties}>
          <ReceivePanel />
        </div>
      </section>

      <section
        aria-labelledby="home-title"
        className="fade-in mt-16 max-w-2xl sm:mt-20"
        style={{ '--i': 3 } as CSSProperties}
      >
        <p className="mono-label">Moveto / File transfer</p>
        <h1
          id="home-title"
          className="font-800 text-text-primary mt-4 text-[clamp(2rem,6vw,3.5rem)] leading-[1.1] tracking-[-0.045em]"
        >
          파일이 움직이는
          <br />
          가장 아름다운 방법.
        </h1>
        <p className="text-text-secondary mt-4 text-base leading-7 sm:text-lg">
          로그인 없이 파일을 올리고, 기억하기 쉬운 한글 코드로 바로 공유하세요.
        </p>
      </section>

      <section
        aria-label="이용 절차"
        className="border-border-subtle mt-16 grid gap-px border-t pt-8 sm:grid-cols-3 sm:gap-8"
      >
        {steps.map((step, index) => (
          <div key={step.title} className="py-3 sm:py-0">
            <span className="mono-label">0{index + 1}</span>
            <h2 className="font-700 text-text-primary mt-2 text-base">{step.title}</h2>
            <p className="text-text-secondary mt-1 text-sm leading-6">{step.description}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
