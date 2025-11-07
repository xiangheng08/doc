/**
 * 挑选属性
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  ...keys: K[]
) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keys.includes(key as K)),
  )
}
