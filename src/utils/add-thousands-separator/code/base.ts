/**
 * 给数字添加千位分隔符
 */
export const addThousandsSeparator = (num: number | string) => {
  const [int, dec = ''] = String(num).split('.')
  const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return dec ? `${formatted}.${dec}` : formatted
}
