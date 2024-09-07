/**
 * 파일 리스트에서 전체 파일 크기를 구함
 * @param files - 파일 리스트
 * @returns 전체 파일 크기
 */
export default function getTotalFileSize(files: File[]): number {
  return files.reduce((acc, file) => acc + file.size, 0)
}
