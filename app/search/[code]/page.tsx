export default function SearchPage({ params }: { params: { code: string } }) {
  return (
    <div className={'w-full min-h-screen text-white'}>
      <div>Search Page {decodeURIComponent(params.code).replaceAll('_', ' ')}</div>
    </div>
  )
}
