import { isObject } from '../typeof/code/base'

// #region code
/**
 * 深度只读工具类型
 */
export type DeepReadonly<T> = T extends Function
  ? T // 函数类型保持不变
  : T extends object
    ? T extends (infer U)[]
      ? readonly DeepReadonly<U>[] // 处理数组
      : { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T

/**
 * 深度只读
 */
export function deepFreeze<T>(obj: T): DeepReadonly<T> {
  Object.freeze(obj)
  Object.getOwnPropertyNames(obj).forEach((name) => {
    const prop = obj[name as keyof T]
    if (isObject(prop) && !Object.isFrozen(prop)) {
      deepFreeze(prop)
    }
  })
  return obj as DeepReadonly<T>
}
// #endregion code
