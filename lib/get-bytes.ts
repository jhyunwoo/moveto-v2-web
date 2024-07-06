/**
 * storage size -> Bytes
 * input number and unit
 * return bytes
 */
const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

export default function getBytes(
  number: number,
  unit: 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB',
) {
  const index = units.indexOf(unit)
  if (index === -1) {
    throw new Error('Invalid unit')
  }
  return number * 1000 ** index
}
