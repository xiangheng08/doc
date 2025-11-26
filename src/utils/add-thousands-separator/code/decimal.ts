/**
 * 给数字添加千位分隔符
 */
export function addThousandsSeparator(
  num: number | string,
  decimal = 0,
  separator = ',',
) {
  const [int, dec = ''] = String(num).split('.')
  const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  if (decimal > 0) {
    return `${formatted}.${dec.slice(0, decimal).padEnd(decimal, '0')}`
  } else {
    return formatted
  }
}

// 测试用例
console.log(addThousandsSeparator(1234567)) // "1,234,567"
console.log(addThousandsSeparator(1234567.89)) // "1,234,567"
console.log(addThousandsSeparator(1234567.89, 2)) // "1,234,567.89"
console.log(addThousandsSeparator(1000)) // "1,000"
console.log(addThousandsSeparator(0)) // "0"
console.log(addThousandsSeparator(0, 2)) // "0.00"
console.log(addThousandsSeparator(1234.5, 3)) // "1,234.500" (小数位不足补0)
console.log(addThousandsSeparator(1234.56789, 2)) // "1,234.56" (小数位超长截断)
console.log(addThousandsSeparator(999)) // "999" (不满千位不加分隔符)
console.log(addThousandsSeparator(-1234567)) // "-1,234,567" (负数处理)
console.log(addThousandsSeparator('987654321')) // "987,654,321" (字符串输入)
console.log(addThousandsSeparator('12345.678', 1)) // "12,345.6" (字符串+小数位)
console.log(addThousandsSeparator('1234567890123456')) // "1,234,567,890,123,456" (大数字)
