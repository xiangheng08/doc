export function hasDecimal(num: number) {
  // 使用 % 运算符获取余数，如果余数不等于 0，则说明是小数
  return num % 1 !== 0
}
