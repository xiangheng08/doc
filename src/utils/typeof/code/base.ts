export function isString(value: any): value is string {
  return typeof value === 'string'
}

export function isNumber(value: any): value is number {
  return typeof value === 'number'
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}

export function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined'
}

export function isNull(value: any): value is null {
  return value === null
}

export function isSymbol(value: any): value is symbol {
  return typeof value === 'symbol'
}

export function isBigInt(value: any): value is bigint {
  return typeof value === 'bigint'
}

export function isFunction(value: any): value is Function {
  return typeof value === 'function'
}

export function isObject(value: any): value is Record<string, any> {
  return typeof value === 'object' && value !== null
}

export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}

/**
 * 检查值是否为普通对象（由 Object 构造函数创建的对象）
 */
export function isPlainObject(value: any): value is Record<string, any> {
  return isObject(value) && value.constructor === Object
}

export function isRegExp(value: any): value is RegExp {
  return value instanceof RegExp
}

export function isDate(value: any): value is Date {
  return value instanceof Date
}

export function isMap(value: any): value is Map<any, any> {
  return value instanceof Map
}

export function isSet(value: any): value is Set<any> {
  return value instanceof Set
}

export function isPromise(value: any): value is Promise<any> {
  return value instanceof Promise
}

/**
 * 是否为 null 或者 undefined
 */
export function isNullOrUndefined(value: any): value is null | undefined {
  return value === null || value === undefined
}

/**
 * 是否为原始类型
 */
export function isPrimitive(
  value: any,
): value is
  | string
  | number
  | boolean
  | symbol
  | bigint
  | null
  | undefined {
  return typeof value !== 'object' || value === null
}
