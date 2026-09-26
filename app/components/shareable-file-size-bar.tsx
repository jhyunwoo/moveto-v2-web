export default function ShareableFileSizeBar({
  totalStorage,
  usedStorage,
}: {
  totalStorage: number
  usedStorage: number
}) {
  const leftStorage = totalStorage - usedStorage

  return (
    <div
      className={`my-1 h-1 w-full overflow-hidden rounded-full ${leftStorage < 0 ? 'bg-danger/20' : 'bg-border-subtle'}`}
      role="progressbar"
      aria-label="남은 저장 공간"
      aria-valuemin={0}
      aria-valuemax={totalStorage}
      aria-valuenow={Math.max(0, leftStorage)}
    >
      <div
        style={{ transform: `scaleX(${Math.max(0, leftStorage / totalStorage)})` }}
        className={`bg-text-primary h-full w-full origin-left rounded-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${leftStorage < 0 ? 'opacity-0' : ''}`}
      />
    </div>
  )
}
