/**
 * 给数字添加万分位分隔符（每四位数字添加一个分隔符）
 */
export function addMyriadSeparator(num: number | string, separator = ',') {
  const [int, dec = ''] = String(num).split('.')
  const formatted = int.replace(/\B(?=(\d{4})+(?!\d))/g, separator)
  return dec ? `${formatted}.${dec}` : formatted
}
