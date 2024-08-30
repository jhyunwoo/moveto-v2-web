import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

export default function useUsedStorage() {
  const { data, error, isLoading, mutate } = useSWR<{ storageSize: number }>('/api/user/storage', fetcher)
  return {
    usedStorage: data?.storageSize ? data.storageSize : 0,
    usedStorageError: error,
    usedStorageLoading: isLoading,
    mutateUsedStorage: mutate,
  }
}
