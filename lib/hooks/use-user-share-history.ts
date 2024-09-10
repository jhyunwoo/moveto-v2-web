import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

export default function useUserShareHistory() {
  const { data, error, isLoading, mutate } = useSWR<
    {
      id: string
      userId: string | null
      code: string | null
      file: string[] | null
      storageSize: number
      expireAt: Date | null
      createdAt: Date
      ip: string
      active: boolean
    }[]
  >('/api/user/shares', fetcher)

  return {
    shares: data,
    sharesError: error,
    sharesLoading: isLoading,
    mutateShares: mutate,
  }
}
