import { headers } from 'next/headers'
import net from 'net'

/**
 * 사용자의 IP 주소를 가져옴 (Dokploy/Nginx 리버스 프록시 환경 지원 및 IP 파싱/검증)
 * @returns 사용자의 IP 주소
 */
export default async function getUserIp(): Promise<string> {
  const FALLBACK_IP_ADDRESS = '127.0.0.1'
  const headersList = await headers()

  // 리버스 프록시가 검증하여 덮어쓰는 x-real-ip 우선 확인
  const realIp = headersList.get('x-real-ip')?.trim()
  if (realIp && net.isIP(realIp)) {
    return realIp
  }

  const forwardedFor = headersList.get('x-forwarded-for')
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map((ip) => ip.trim())
    for (const ip of ips) {
      if (net.isIP(ip)) {
        return ip
      }
    }
  }

  return FALLBACK_IP_ADDRESS
}
