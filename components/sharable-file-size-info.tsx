import formatBytes from '@/lib/format-bytes'

export default function SharableFileSizeInfo({
  totalStorage,
  usedStorage,
  className,
}: {
  totalStorage: number
  usedStorage: number
  className?: string
}) {
  const leftStorage = totalStorage - usedStorage
  return (
    <div className={className ? className : 'flex items-center justify-between text-xs'}>
      <div>{leftStorage >= 0 ? `${formatBytes(leftStorage)} 남음` : `${formatBytes(-leftStorage)} 부족`}</div>
      <div>{formatBytes(totalStorage)}</div>
    </div>
  )
}
