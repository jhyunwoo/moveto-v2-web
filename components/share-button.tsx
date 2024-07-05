'use client'

export default function ShareButton({ title, url }: { title: string; url: string }) {
  return (
    <button
      type={'button'}
      className={
        'p-1 px-3 text-sm font-semibold rounded-lg bg-white text-black hover:bg-neutral-200 transition-colors'
      }
      onClick={async () => {
        try {
          await window?.navigator?.share({
            title,
            url,
          })
        } catch {
          await window.navigator.clipboard.writeText(url)
          alert('링크가 복사되었습니다')
        }
      }}
    >
      공유
    </button>
  )
}
