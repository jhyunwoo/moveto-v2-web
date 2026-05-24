import FileUpload from '@/app/components/file-upload/file-upload'
import SearchAnimation from '@/app/components/search-animation'
import HomeEntrance from '@/app/components/home-entrance'
import JsonLd from '@/app/components/json-ld'

export default function HomePage() {
  return (
    <div className="flex w-full flex-col items-center p-4">
      <JsonLd />
      <div className="h-[4vh] w-full md:h-[12vh]" />
      <div className="relative flex w-full max-w-3xl flex-col gap-8 text-text-primary">
        
        {/* Typography Hero Section */}
        <HomeEntrance delay={0.05}>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-block rounded-full border border-accent-soft bg-accent-soft/30 px-3 py-1 font-display text-xs font-600 text-accent-hover backdrop-blur-md">
              로그인 없이 1초만에
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-800 tracking-tight text-text-primary drop-shadow-sm dark:text-white dark:drop-shadow-lg transition-colors">
              안전하고 빠른 <span className="text-gradient-neon">파일 공유</span>
            </h1>
            <p className="text-text-secondary text-sm sm:text-base max-w-xl font-400 transition-colors">
              어떤 파일이든 드래그해서 바로 공유하세요. 생성된 한글 코드만 입력하면 어디서든 다운로드할 수 있습니다.
            </p>
          </div>
        </HomeEntrance>

        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-end md:gap-3">
          <div className="flex w-full items-center justify-center md:w-auto md:justify-end z-20">
            <HomeEntrance delay={0.1} className="w-full md:w-auto">
              <SearchAnimation />
            </HomeEntrance>
          </div>
        </div>
        
        <HomeEntrance delay={0.15}>
          <div className="relative">
            {/* Ambient Glow behind the card */}
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-violet-400 to-cyan-400 opacity-40 blur-xl transition-all duration-500 dark:from-violet-600 dark:to-cyan-600 dark:opacity-20" />
            <div className="relative">
              <FileUpload />
            </div>
          </div>
        </HomeEntrance>
      </div>
    </div>
  )
}
