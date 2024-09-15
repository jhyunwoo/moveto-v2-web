import fileToFileData from '@/lib/file-to-filedata'

/**
 * 파일 리스트 안에 중복을 확인하기 위해 파일 리스트에서 파일 정보로 구성된 리스트를 생성하는 함수
 * @param files - 파일 리스트
 * @returns 문자로 stringify 된 파일 정보로 구성된 리스트
 */
export default function generateFileInfoArray(files: File[]): string[] {
  const fileData: string[] = []

  for (const file of files) {
    fileData.push(fileToFileData(file))
  }

  return fileData
}
