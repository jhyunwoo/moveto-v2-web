import { useSession } from 'next-auth/react'

export default function useUserPlan() {
  const session = useSession()
  return session.data?.user.plan ? `${session.data.user.plan} Plan` : '미인증 사용자'
}
