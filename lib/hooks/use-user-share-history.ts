import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

export default function useUserShareHistory(page: number = 1) {
  const { data, error, isLoading, mutate } = useSWR<{
    shareList: {
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
    pageLimit: number
  }>(`/api/user/shares/${page}`, fetcher)

  return {
    shares: data?.shareList,
    pageLimit: data?.pageLimit,
    sharesError: error,
    sharesLoading: isLoading,
    mutateShares: mutate,
  }
}
