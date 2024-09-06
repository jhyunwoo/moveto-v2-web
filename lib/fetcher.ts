/**
 * SWR에서 사용하는 fetcher 함수
 * fetch to the given endpoint and return the JSON response
 *
 * @param input - RequestInfo from SWR
 * @param init - RequestInit from SWR
 * @returns JSON response
 */
export default async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
}
