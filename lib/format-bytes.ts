/**
 * Byte를 적절한 단위의 데이터 표기료 변환
 * @param bytes - Byte로 된 데이터 크기
 * @param decimals - 표기할 소수점 자리수
 */
export default function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1000
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / k ** i).toFixed(dm)) + sizes[i]
}
