import SearchBar from '@/app/components/search-bar'

export default function SearchAnimation() {
  return (
    <section className="glass-panel p-4 sm:p-5" aria-labelledby="receive-files-title">
      <div className="mb-3">
        <h2 id="receive-files-title" className="text-sm font-700 text-text-primary">
          공유 코드로 파일 받기
        </h2>
        <p className="mt-1 text-xs leading-5 text-text-secondary">전달받은 한글 코드를 입력하세요.</p>
      </div>
      <SearchBar />
    </section>
  )
}
