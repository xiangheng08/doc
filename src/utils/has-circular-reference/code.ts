/**
 * 检查对象是否包含循环引用
 */
export function hasCircularReference(obj: object) {
  const seen = new WeakSet()

  function detect(obj: object) {
    if (typeof obj === 'object' && obj !== null) {
      if (seen.has(obj)) {
        return true
      }
      seen.add(obj)
      const values = Object.values(obj)
      for (let i = 0; i < values.length; i++) {
        if (detect(values[i])) return true
      }
    }
    return false
  }

  return detect(obj)
}
