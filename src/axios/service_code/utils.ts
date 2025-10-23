export const isObject = (
  val: any,
): val is Record<string | number | symbol, any> => {
  return val !== null && typeof val === 'object'
}

export const isNumber = (val: any): val is number => {
  return typeof val === 'number'
}

export const isFunction = (val: any): val is Function => {
  return typeof val === 'function'
}

export const sleep = (ms?: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
