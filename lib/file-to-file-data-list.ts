/** Take file array and extract file data. Then, return list that contains string type of file data */
export default function fileToFileDataList(files: File[]): string[] {
  const fileData: string[] = []

  for (const file of files) {
    fileData.push(
      JSON.stringify({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      }),
    )
  }

  return fileData
}
