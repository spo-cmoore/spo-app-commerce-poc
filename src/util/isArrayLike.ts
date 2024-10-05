export function isArrayLike(input: unknown): input is Array<unknown> {
  if (typeof input !== 'undefined' && Reflect.has(input as object, 'length')) {
    const lengthVal = Reflect.get(input as object, 'length')
    if (typeof lengthVal === 'number' && lengthVal >= 0) {
      return true
    }
  }
  return false
}
