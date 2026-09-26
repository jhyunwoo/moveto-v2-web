export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-4xl animate-pulse flex-col px-4 py-12 sm:px-6 sm:py-16">
      <div className="bg-surface-subtle h-4 w-20 rounded" />
      <div className="bg-surface-subtle mt-3 h-10 w-56 rounded" />
      <div className="panel mt-8 overflow-hidden">
        <div className="border-border-subtle bg-surface-subtle/50 h-12 border-b" />
        <div className="border-border-subtle bg-surface-subtle/30 h-16 border-b" />
        <div className="bg-surface-subtle/30 h-16" />
      </div>
    </div>
  )
}
