export default function objectToList(object: Record<string, any>) {
  const list = []

  for (const key in object) {
    list.push(object[key])
  }

  return list
}
