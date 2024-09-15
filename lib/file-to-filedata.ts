export default function fileToFileData(file: File) {
  return JSON.stringify({
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
  })
}
