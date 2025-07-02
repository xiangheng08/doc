/**
 * 给数字添加千位分隔符
 * @param num 输入的数字（支持 number 或 string 类型）
 * @returns 添加千位分隔符后的字符串
 */
export const addThousandsSeparator = (num: number | string): string => {
  // 转换为字符串并分割整数与小数部分
  const [integerPart, decimalPart] = String(num).split('.')

  // 处理整数部分：从右向左每3位添加逗号
  const formattedInteger = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ',',
  )

  // 拼接小数部分（如果存在）
  return decimalPart
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger
}
