/**
 * params: files: File[]
 *
 * return: number
 *
 * 파일 리스트를 받아서 전체 파일 크기 반환
 */
export default function getTotalFileSize(files: File[]): number {
  return files.reduce((acc, file) => acc + file.size, 0);
}
