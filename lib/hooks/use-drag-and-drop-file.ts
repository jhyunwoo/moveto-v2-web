import { ChangeEvent, RefObject, useCallback, useEffect, useRef, useState } from 'react'
import fileToFileDataList from '@/lib/generate-file-info-array'
import { useFileData } from '@/lib/stores/file-data'
import { useFiles } from '@/lib/stores/files'

export default function useDragAndDropFile({
  inputRef,
  dragRef,
}: {
  inputRef: RefObject<HTMLInputElement | null>
  dragRef: RefObject<HTMLLabelElement | null>
}) {
  const { files, deleteFile: deleteFileStore, addFiles } = useFiles(store => store)

  const { fileData, addFileData, deleteFileData } = useFileData(store => store)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const dragDepth = useRef(0)

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
    (e: ChangeEvent<HTMLInputElement> | DragEvent): void => {
      if (e.type === 'drop' && 'dataTransfer' in e) {
        handleFileInput(e.dataTransfer?.files ?? null)
      }
    },
    [handleFileInput]
  )

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    dragDepth.current += 1
    if (e.dataTransfer?.types.includes('Files')) {
      setIsDragging(true)
    }
  }, [])

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    dragDepth.current = Math.max(0, dragDepth.current - 1)
    if (dragDepth.current === 0) {
      setIsDragging(false)
    }
  }, [])

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault()
      e.stopPropagation()

      dragDepth.current = 0
      onChangeFiles(e)
      setIsDragging(false)
    },
    [onChangeFiles]
  )

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener('dragenter', handleDragIn)
      dragRef.current.addEventListener('dragleave', handleDragOut)
      dragRef.current.addEventListener('dragover', handleDragOver)
      dragRef.current.addEventListener('drop', handleDrop)
    }
  }, [dragRef, handleDragIn, handleDragOut, handleDragOver, handleDrop])

  const resetDragEvents = useCallback((): void => {
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
