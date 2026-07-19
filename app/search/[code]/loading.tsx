export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-4xl animate-pulse flex-col px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="h-4 w-20 rounded bg-surface-subtle" />
      <div className="mt-3 h-10 w-56 rounded bg-surface-subtle" />
      <div className="document-panel mt-8 overflow-hidden">
        <div className="h-12 border-b border-border-subtle bg-surface-subtle/50" />
        <div className="h-16 border-b border-border-subtle bg-surface-subtle/30" />
        <div className="h-16 bg-surface-subtle/30" />
      </div>
    </div>
  )
}
