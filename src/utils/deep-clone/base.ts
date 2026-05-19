import { isPlainObject } from '../typeof/code/base'

// #region code
/**
 * 深度克隆
 *
 * @description 支持循环引用，但不支持二进制数据类型（ArrayBuffer, Blob等），以及函数、RegExp等特殊对象
 */
export function deepClone<T = any>(value: T): T {
  // 如果是 null 或者不是对象，直接返回
  if (value === null || typeof value !== 'object') {
    return value
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
  if (isPlainObject(value)) {
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
// #endregion code
