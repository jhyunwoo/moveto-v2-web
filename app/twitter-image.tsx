import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#050505' }}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="256" height="256">
          <path d="M14 52 L26 12 L38 28 L28 52 Z" fill="#8B5CF6" />
          <path d="M50 52 L38 12 L26 28 L36 52 Z" fill="#06B6D4" />
          <path d="M18 32 L46 32 L36 44 L56 24 L36 12 L42 22 L18 22 Z" fill="#ffffff" opacity="0.8" />
        </svg>
        <div style={{ marginTop: 40, fontSize: 80, fontWeight: 800, color: 'white', letterSpacing: '-0.05em' }}>Moveto</div>
        <div style={{ marginTop: 20, fontSize: 40, color: '#a1a1aa' }}>초고속 파일 공유의 새로운 차원</div>
      </div>
    ),
    { ...size }
  )
}
