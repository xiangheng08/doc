/**
 * 给数字添加千位分隔符
 */
export function addThousandsSeparator(
  num: number | string,
  separator = ',',
) {
  const [int, dec = ''] = String(num).split('.')
  const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  return dec ? `${formatted}.${dec}` : formatted
}
