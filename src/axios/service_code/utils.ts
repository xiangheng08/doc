export function isObject(
  val: any,
): val is Record<string | number | symbol, any> {
  return val !== null && typeof val === 'object'
}

export function isNumber(val: any): val is number {
  return typeof val === 'number'
}

export function isFunction(val: any): val is Function {
  return typeof val === 'function'
}

export function sleep(ms?: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function deepClone<T = any>(value: T): T {
  // 如果是 null 或者不是对象，直接返回
  if (value === null || typeof value !== 'object') {
    return value
  }

  // 检查是否为二进制数据类型（ArrayBuffer, Blob等）
  if (
    value instanceof ArrayBuffer ||
    (typeof Blob !== 'undefined' && value instanceof Blob)
  ) {
    throw new Error('Binary data is not supported')
  }

  // 处理 Array 类型
  if (Array.isArray(value)) {
    const clonedArray: any[] = []
    for (let i = 0; i < value.length; i++) {
      clonedArray[i] = deepClone(value[i])
    }
    return clonedArray as any
  }

  // 处理普通对象
  if (isObject(value)) {
    const clonedObj: Record<string | number | symbol, any> = {}
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        clonedObj[key] = deepClone(value[key])
      }
    }
    return clonedObj as any
  }

  // 其他情况直接返回原值
  return value
}
