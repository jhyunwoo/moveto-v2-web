'use client' // GlobalError boundaries must be Client Components

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  console.error(error)

  return (
    // global-error must include html and body tags
    <html>
      <body className={'flex h-screen w-full flex-col items-center justify-center bg-neutral-950 text-neutral-50'}>
        <div className={'flex w-full max-w-lg flex-col gap-2 p-4'}>
          <h1 className={'text-4xl font-bold'}>Error!</h1>
          <button className={'w-full rounded-xl bg-neutral-50 p-2 px-4 text-neutral-950'} onClick={() => reset()}>
            다시 시도
          </button>
        </div>
      </body>
    </html>
  )
}
