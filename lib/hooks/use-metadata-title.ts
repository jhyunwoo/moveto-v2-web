import { useEffect } from 'react'

export default function useMetadataTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
