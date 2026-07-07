'use client'

import { ReactNode, useMemo } from 'react'
import {
  DocumentTextIcon,
  PhotoIcon,
  FilmIcon,
  MusicalNoteIcon,
  CodeBracketIcon,
  TableCellsIcon,
  PresentationChartBarIcon,
  ArchiveBoxIcon,
  DocumentChartBarIcon,
  DocumentIcon,
  CubeIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

const IMAGE_EXTENSIONS = new Set([
  'jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'avif', 'ico', 'tiff', 'tif', 'heic', 'heif',
])

const iconClass = 'size-6 shrink-0 text-text-secondary'

function getExtension(fileName: string) {
  return fileName.split('.').pop()?.toLowerCase() ?? ''
}

function getIconElement(ext: string): ReactNode {
  // 문서
  if (ext === 'pdf') return <DocumentChartBarIcon className={iconClass} />
  if (['doc', 'docx', 'txt', 'rtf', 'odt', 'md', 'pages', 'hwp', 'hwpx'].includes(ext))
    return <DocumentTextIcon className={iconClass} />

  // 스프레드시트
  if (['xls', 'xlsx', 'csv', 'tsv', 'ods', 'numbers'].includes(ext))
    return <TableCellsIcon className={iconClass} />

  // 프레젠테이션
  if (['ppt', 'pptx', 'key', 'odp'].includes(ext))
    return <PresentationChartBarIcon className={iconClass} />

  // 동영상
  if (['mp4', 'mov', 'avi', 'mkv', 'wmv', 'flv', 'webm', 'm4v'].includes(ext))
    return <FilmIcon className={iconClass} />

  // 오디오
  if (['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma', 'm4a', 'aiff'].includes(ext))
    return <MusicalNoteIcon className={iconClass} />

  // 코드
  if (
    [
      'js', 'jsx', 'ts', 'tsx', 'py', 'java', 'c', 'cpp', 'cs', 'go', 'rs', 'rb', 'php', 'swift', 'kt', 'dart', 'r',
      'sql', 'sh', 'json', 'xml', 'yaml', 'yml', 'toml',
    ].includes(ext)
  )
    return <CodeBracketIcon className={iconClass} />

  // 웹
  if (['html', 'htm', 'css', 'scss', 'less'].includes(ext)) return <GlobeAltIcon className={iconClass} />

  // 압축
  if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'dmg', 'iso'].includes(ext))
    return <ArchiveBoxIcon className={iconClass} />

  // 3D
  if (['obj', 'fbx', 'stl', 'gltf', 'glb'].includes(ext)) return <CubeIcon className={iconClass} />

  // 이미지 (프리뷰 미지원 포맷 fallback)
  if (IMAGE_EXTENSIONS.has(ext)) return <PhotoIcon className={iconClass} />

  return <DocumentIcon className={iconClass} />
}

export default function FileItemIcon({ file }: { file: File }) {
  const ext = getExtension(file.name)
  const isImage = IMAGE_EXTENSIONS.has(ext)
  const src = useMemo(() => (isImage ? URL.createObjectURL(file) : null), [file]) // eslint-disable-line react-hooks/exhaustive-deps

  if (src) {
    return (
      <img
        src={src}
        alt={file.name}
        className="size-10 shrink-0 rounded-lg border-2 border-border-subtle object-cover"
      />
    )
  }

  return getIconElement(ext)
}
