import formatBytes from '@/lib/format-bytes'

export default function SharableFileSizeInfo({
  totalStorage,
  usedStorage,
  className,
  isLoading,
}: {
  totalStorage: number
  usedStorage: number
  className?: string
  isLoading?: boolean
}) {
  const leftStorage = totalStorage - usedStorage
  return (
    <div className={className ? className : 'flex items-center justify-between py-1 text-xs font-500'}>
      {isLoading ? (
        <div className="h-4 w-16 animate-pulse rounded-lg bg-border-subtle" />
      ) : (
        <div className={leftStorage < 0 ? 'font-600 text-danger' : ''}>
          {leftStorage >= 0 ? `${formatBytes(leftStorage)} 남음` : `${formatBytes(-leftStorage)} 부족`}
        </div>
      )}
      {isLoading ? (
        <div className="h-4 w-8 animate-pulse rounded-lg bg-border-subtle" />
      ) : (
        <div className="text-text-muted">{formatBytes(totalStorage)}</div>
      )}
    </div>
  )
}
