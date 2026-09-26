export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center py-24" role="status" aria-label="불러오는 중">
      <span className="border-border-primary border-t-text-primary size-5 animate-spin rounded-full border-2" />
    </div>
  )
}
