import SearchBar from '@/app/components/search-bar'

export default function ReceivePanel() {
  return (
    <section className="panel p-5 sm:p-6" aria-labelledby="receive-files-title">
      <p className="mono-label">Receive</p>
      <h2 id="receive-files-title" className="font-700 text-text-primary mt-2 text-lg">
        공유 코드로 파일 받기
      </h2>
      <p className="text-text-secondary mt-1 text-sm leading-6">전달받은 한글 코드를 입력하세요.</p>
      <SearchBar className="mt-5" />
    </section>
  )
}
