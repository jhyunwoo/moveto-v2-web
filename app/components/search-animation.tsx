import SearchBar from '@/app/components/search-bar'

export default function SearchAnimation() {
  return (
    <section
      className="glass-panel border-border-subtle bg-surface/84 dark:bg-surface-alt/80 p-5 shadow-[0_24px_70px_rgba(20,55,82,0.06)] sm:p-6 lg:min-h-[20rem] lg:p-7"
      aria-labelledby="receive-files-title"
    >
      <div>
        <h2
          id="receive-files-title"
          className="font-display font-750 text-text-primary text-xl tracking-[-0.035em] sm:text-2xl"
        >
          공유 코드로 파일 받기
        </h2>
        <p className="text-text-secondary mt-2 text-sm leading-6">전달받은 한글 코드를 입력하세요.</p>
      </div>
      <SearchBar className="mt-7" />
    </section>
  )
}
