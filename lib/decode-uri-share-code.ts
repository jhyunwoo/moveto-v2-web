/**
 * URL에 있는 한글 코드를 디코딩 한 후 _를 공백으로 변경하는 함수
 * @param code - URL에 있는 한글 코드
 * @returns 디코딩 된 한국어 코드
 */
export default function decodeURIShareCode(code: string) {
  return decodeURIComponent(code).replaceAll('_', ' ')
}
