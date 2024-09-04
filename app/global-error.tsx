'use client' // GlobalError boundaries must be Client Components

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  console.error(error)

  return (
    // global-error must include html and body tags
    <html>
      <body className={'w-full bg-neutral-950 h-screen flex flex-col items-center justify-center text-neutral-50'}>
        <div className={'w-full max-w-lg flex flex-col gap-2 p-4'}>
          <h1 className={'text-4xl font-bold'}>Error!</h1>
          <button className={'p-2 px-4 rounded-xl bg-neutral-50 text-neutral-950 w-full'} onClick={() => reset()}>
            다시 시도
          </button>
        </div>
      </body>
    </html>
  )
}
