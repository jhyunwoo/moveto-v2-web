import { useEffect } from 'react'

export default function useMetadataTitle(title: string) {
  useEffect(() => {
    if (title) {
      document.title = title
    }
  }, [title])
}
