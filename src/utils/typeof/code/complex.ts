import { isObject, isArray } from './base'

/**
 * 判断是否为空
 *
 * 可以判断空字符串、false、null、undefined、NaN、空对象、空数组
 */
export function isEmpty(value: unknown) {
  return (
    (!value && value !== 0) ||
    (isObject(value) && Object.keys(value).length === 0) ||
    (isArray(value) && value.length === 0)
  )
}
