import FileUpload from '@/app/components/file-upload/file-upload'
import SearchAnimation from '@/app/components/search-animation'
import HomeEntrance from '@/app/components/home-entrance'
import JsonLd from '@/app/components/json-ld'
import { AdjustmentsHorizontalIcon, ChatBubbleLeftRightIcon, FolderPlusIcon } from '@heroicons/react/24/outline'

const steps = [
  {
    title: '파일 선택',
    description: '기기에서 고르거나 화면에 바로 놓으세요.',
    icon: FolderPlusIcon,
  },
  {
    title: '공유 설정',
    description: '필요한 보관 시간을 선택하세요.',
    icon: AdjustmentsHorizontalIcon,
  },
  {
    title: '한글 코드 전달',
    description: '생성된 코드나 링크를 상대에게 보내세요.',
    icon: ChatBubbleLeftRightIcon,
  },
]

export default function HomePage() {
  return (
    <div className="w-full px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
      <JsonLd />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-12">
          <HomeEntrance delay={0.02}>
            <div className="max-w-2xl">
              <h1 className="font-display text-4xl font-700 leading-[1.15] text-text-primary sm:text-5xl lg:text-[3.6rem]">
                파일을 빠르게 옮기세요
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
                로그인 없이 파일을 올리고, 기억하기 쉬운 한글 코드로 바로 공유하세요.
              </p>
            </div>
          </HomeEntrance>

          <HomeEntrance delay={0.06}>
            <SearchAnimation />
          </HomeEntrance>
        </section>

        <HomeEntrance delay={0.1}>
          <FileUpload />
        </HomeEntrance>

        <section className="border-y border-border-subtle py-7" aria-labelledby="share-flow-title">
          <h2 id="share-flow-title" className="sr-only">
            파일 공유 순서
          </h2>
          <ol className="grid gap-6 sm:grid-cols-3 sm:gap-0">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <li
                  key={step.title}
                  className="flex gap-4 sm:border-l sm:border-border-subtle sm:px-6 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-600 text-accent">0{index + 1}</span>
                      <h3 className="text-sm font-700 text-text-primary">{step.title}</h3>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-text-secondary">{step.description}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>
      </div>
    </div>
  )
}
