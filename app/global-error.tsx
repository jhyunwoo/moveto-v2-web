'use client'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  console.error(error)

  return (
    <html>
      <body className="flex h-screen w-full flex-col items-center justify-center bg-[#f5f0e8] text-[#1a1715] dark:bg-[#141210] dark:text-[#f0ebe3]">
        <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl border-2 border-[#1a1715] bg-white p-8 shadow-sm dark:border-white/15 dark:bg-[#1e1c19]">
          <h1 className="text-4xl font-bold">오류 발생</h1>
          <p className="text-sm text-[#6b655b] dark:text-[#a09a90]">문제가 발생했습니다. 다시 시도해주세요.</p>
          <button
            className="w-full rounded-xl border-2 border-[#ff5d3b] bg-[#ff5d3b] p-3 font-semibold text-white transition-colors hover:bg-[#e5452a]"
            onClick={() => reset()}
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  )
}
