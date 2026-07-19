import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden', background: '#ffffff', color: '#171717', padding: '68px 76px' }}>
        <div style={{ position: 'absolute', width: 760, height: 520, right: -100, top: -190, borderRadius: 999, background: 'radial-gradient(circle, rgba(168,200,232,0.72) 0%, rgba(207,231,255,0.32) 46%, rgba(255,255,255,0) 74%)' }} />
        <div style={{ display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'space-between', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <BrandMark size={54} />
            <div style={{ fontSize: 34, fontWeight: 700 }}>Moveto</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 50 }}>
            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 650 }}>
              <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.14 }}>파일을 빠르게 옮기세요</div>
              <div style={{ marginTop: 22, fontSize: 26, lineHeight: 1.5, color: '#60646c' }}>로그인 없이 올리고, 기억하기 쉬운 한글 코드로 바로 공유하세요.</div>
            </div>
            <div style={{ display: 'flex', width: 300, height: 174, flexDirection: 'column', justifyContent: 'space-between', padding: 24, border: '1px solid rgba(255,255,255,0.9)', borderRadius: 8, background: 'rgba(255,255,255,0.62)', boxShadow: '0 18px 50px rgba(20,55,82,0.12)' }}>
              <div style={{ display: 'flex', fontSize: 17, fontWeight: 700 }}>공유 코드</div>
              <div style={{ display: 'flex', fontSize: 27, fontWeight: 700 }}>파란 여름 바다</div>
              <div style={{ display: 'flex', width: '100%', height: 8, overflow: 'hidden', borderRadius: 999, background: '#e7eef5' }}>
                <div style={{ display: 'flex', width: '72%', height: '100%', borderRadius: 999, background: '#0d74ce' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

function BrandMark({ size: markSize }: { size: number }) {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width={markSize} height={markSize}>
      <path d="M8 50V14c0-3.4 4-5.2 6.6-2.9L32 26.6l17.4-15.5C52 8.8 56 10.6 56 14v36h-9V25.1L35.2 35.7a4.8 4.8 0 0 1-6.4 0L17 25.1V50H8Z" fill="#171717" />
      <path d="m32 29 8 7.2-8 7.3-8-7.3 8-7.2Z" fill="#5eb5ff" fillOpacity="0.9" />
      <path d="m27.1 33.8 4.9-4.5 5 4.5-5 4.5-4.9-4.5Z" fill="#d9efff" fillOpacity="0.76" />
    </svg>
  )
}
