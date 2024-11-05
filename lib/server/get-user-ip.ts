import { headers } from 'next/headers'

/**
 * 사용자의 IP 주소를 가져옴
 * @returns 사용자의 IP 주소
 */
export default async function getUserIp(): Promise<string> {
  const FALLBACK_IP_ADDRESS = '0.0.0.0'
  const headersList = await headers()
  const forwardedFor = headersList.get('x-forwarded-for')

  if (forwardedFor) {
    return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS
  }

  return headersList.get('x-real-ip') ?? FALLBACK_IP_ADDRESS
}
