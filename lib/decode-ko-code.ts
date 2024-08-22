export default function decodeKoCode(code: string) {
  return decodeURIComponent(code).replaceAll('_', ' ');
}
