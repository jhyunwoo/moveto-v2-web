export default async function fetchJson<T>(
  url: string,
  init?: RequestInit,
  handleError?: (res: Response) => void
): Promise<T> {
  return fetch(url, init).then(res => {
    if (!res.ok) {
      if (handleError) {
        handleError(res)
      } else {
        throw new Error(res.statusText)
      }
    }
    return res.json()
  })
}
