import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505' }}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="120">
          <path d="M14 52 L26 12 L38 28 L28 52 Z" fill="#8B5CF6" />
          <path d="M50 52 L38 12 L26 28 L36 52 Z" fill="#06B6D4" />
          <path d="M18 32 L46 32 L36 44 L56 24 L36 12 L42 22 L18 22 Z" fill="#ffffff" opacity="0.8" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
