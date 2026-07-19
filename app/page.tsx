import FileUpload from '@/app/components/file-upload/file-upload'
import SearchAnimation from '@/app/components/search-animation'
import HomeEntrance from '@/app/components/home-entrance'
import JsonLd from '@/app/components/json-ld'
import HeroTransferFlight from '@/app/components/hero-transfer-flight'
import TransferJourney from '@/app/components/transfer-journey'

export default function HomePage() {
  return (
    <div className="home-page relative w-full overflow-hidden">
      <JsonLd />
      <section
        className="relative mx-auto w-full max-w-[1504px] px-4 pt-[clamp(3.5rem,5vw,4rem)] pb-0 sm:px-6 lg:px-10"
        aria-labelledby="home-title"
      >
        <HeroTransferFlight />

        <HomeEntrance delay={0.02} className="relative z-10 max-w-[790px]">
          <h1
            id="home-title"
            className="font-display font-850 text-text-primary text-[clamp(2.55rem,5.4vw,5rem)] leading-[0.94] tracking-[-0.065em]"
          >
            파일이 움직이는
            <br />
            가장 아름다운 방법.
          </h1>
          <p className="text-text-secondary mt-7 max-w-[640px] text-base leading-7 break-keep sm:text-xl sm:leading-8">
            로그인 없이 파일을 올리고, 기억하기 쉬운 한글 코드로 바로 공유하세요.
          </p>
        </HomeEntrance>

        <div
          id="upload"
          className="relative z-20 mt-10 grid scroll-mt-28 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(330px,0.48fr)] lg:gap-6"
        >
          <HomeEntrance delay={0.12}>
            <FileUpload />
          </HomeEntrance>
          <HomeEntrance delay={0.2} className="lg:pt-8">
            <SearchAnimation />
          </HomeEntrance>
        </div>
      </section>

      <TransferJourney />
    </div>
  )
}
