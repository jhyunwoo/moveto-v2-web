import { ChangeEvent, RefObject, useCallback, useEffect, useState } from 'react'
import fileToFileDataList from '@/lib/generate-file-info-array'
import { useFileData } from '@/lib/stores/file-data'
import { useFiles } from '@/lib/stores/files'

export default function useDragAndDropFile({
  inputRef,
  dragRef,
}: {
  inputRef: RefObject<HTMLInputElement>
  dragRef: RefObject<HTMLLabelElement>
}) {
  const { files, deleteFile: deleteFileStore, addFiles } = useFiles(store => store)

  const { fileData, addFileData, deleteFileData } = useFileData(store => store)
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const handleFileInput = useCallback(
    (fileList: FileList | null) => {
      if (fileList) {
        const fileArray = Array.from(fileList)
        const fileDataArray = fileToFileDataList(fileArray)

        const newFiles: File[] = []
        const newFileData: string[] = []

        for (let i = 0; i < fileArray.length; i += 1) {
          if (!fileData.includes(fileDataArray[i])) {
            newFiles.push(fileArray[i])
            newFileData.push(fileDataArray[i])
          }
        }

        // Update files and fileData
        addFiles(newFiles)
        addFileData(newFileData)

        if (inputRef.current) {
          inputRef.current.value = ''
        }
      }
    },
    [addFileData, addFiles, fileData, inputRef]
  )
  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      // 드래그 했을 때와 안했을 때 가리키는 파일 배열을 다르게 해줍니다.
      if (e.type === 'drop') {
        // 드래그 앤 드롭 했을때
        handleFileInput(e.dataTransfer.files)
      }
    },
    [handleFileInput]
  )

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer!.files) {
      setIsDragging(true)
    }
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault()
      e.stopPropagation()

      onChangeFiles(e)
      setIsDragging(false)
    },
    [onChangeFiles]
  )

  const initDragEvents = useCallback((): void => {
    // 앞서 말했던 4개의 이벤트에 Listener 를 등록합니다. (마운트 될때)

    if (dragRef.current !== null) {
      dragRef.current.addEventListener('dragenter', handleDragIn)
      dragRef.current.addEventListener('dragleave', handleDragOut)
      dragRef.current.addEventListener('dragover', handleDragOver)
      dragRef.current.addEventListener('drop', handleDrop)
    }
  }, [dragRef, handleDragIn, handleDragOut, handleDragOver, handleDrop])

  const resetDragEvents = useCallback((): void => {
    // 앞서 말했던 4개의 이벤트에 Listener 를 삭제합니다. (언마운트 될때)

    if (dragRef.current !== null) {
      dragRef.current.removeEventListener('dragenter', handleDragIn)
      dragRef.current.removeEventListener('dragleave', handleDragOut)
      dragRef.current.removeEventListener('dragover', handleDragOver)
      dragRef.current.removeEventListener('drop', handleDrop)
    }
  }, [dragRef, handleDragIn, handleDragOut, handleDragOver, handleDrop])

  useEffect(() => {
    initDragEvents()

    return () => resetDragEvents()
  }, [initDragEvents, resetDragEvents])

  /** click file input dom using ref */
  function clickFileInput() {
    inputRef.current?.click()
  }

  function deleteFile(index: number) {
    deleteFileStore(index)
    deleteFileData(index)
  }

  return {
    handleFileInput,
    clickFileInput,
    files,
    fileData,
    deleteFile,
    isDragging,
  }
}
