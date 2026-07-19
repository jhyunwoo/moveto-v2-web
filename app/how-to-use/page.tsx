import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRightIcon, ChatBubbleLeftRightIcon, ClockIcon, CloudArrowDownIcon, FolderPlusIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: '사용 방법 | 모베토 Moveto',
}

const steps = [
  {
    number: '01',
    title: '파일을 선택하세요',
    description: '홈 화면의 파일 영역을 누르거나 파일을 끌어다 놓습니다. 여러 파일도 한 번에 선택할 수 있습니다.',
    icon: FolderPlusIcon,
  },
  {
    number: '02',
    title: '만료 시간을 정하세요',
    description: '파일을 받을 수 있는 시간을 선택한 뒤 공유 시작을 누릅니다. 시간이 지나면 파일은 자동 삭제됩니다.',
    icon: ClockIcon,
  },
  {
    number: '03',
    title: '코드를 전달하세요',
    description: '업로드가 끝나면 한글 공유 코드와 링크가 생성됩니다. 필요한 방식으로 상대에게 전달합니다.',
    icon: ChatBubbleLeftRightIcon,
  },
]

export default function HowToUsePage() {
  return (
    <div className="w-full px-4 py-14 text-text-primary sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-700 sm:text-5xl">파일을 보내고 받는 방법</h1>
          <p className="mt-4 text-base leading-7 text-text-secondary">별도 설치 없이 세 단계로 파일을 공유할 수 있습니다.</p>
        </div>

        <ol className="mt-12 border-y border-border-subtle">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <li key={step.number} className="grid gap-4 border-b border-border-subtle py-7 last:border-b-0 sm:grid-cols-[72px_48px_minmax(0,1fr)] sm:items-start sm:gap-6 sm:py-9">
                <span className="text-sm font-600 text-accent">{step.number}</span>
                <span className="flex size-11 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h2 className="text-xl font-700">{step.title}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-text-secondary">{step.description}</p>
                </div>
              </li>
            )
          })}
        </ol>

        <section className="glass-panel mt-10 grid gap-6 p-6 sm:grid-cols-[48px_minmax(0,1fr)_auto] sm:items-center sm:p-8" aria-labelledby="receive-title">
          <span className="flex size-12 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <CloudArrowDownIcon className="size-6" />
          </span>
          <div>
            <h2 id="receive-title" className="text-xl font-700">파일을 받을 때</h2>
            <p className="mt-2 text-sm leading-6 text-text-secondary">홈에서 전달받은 한글 코드를 입력하면 파일 목록과 다운로드 버튼이 열립니다.</p>
          </div>
          <Link href="/" className="btn-primary w-fit px-5">
            홈에서 시작
            <ArrowRightIcon className="size-4" />
          </Link>
        </section>
      </div>
    </div>
  )
}
