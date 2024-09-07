const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
/**
 * Get Number and Unit and convert it to bytes
 * @param number - Number of data size
 * @param unit - Unit of data size
 * @returns Number in bytes
 */
export default function convertToBytes(
  number: number,
  unit: 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB'
) {
  const index = units.indexOf(unit)
  if (index === -1) {
    throw new Error('Invalid unit')
  }
  return number * 1000 ** index
}
