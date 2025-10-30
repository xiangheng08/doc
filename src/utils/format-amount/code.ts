export interface FormatAmountOptions {
  /**
   * 货币符号
   */
  currency?: string
  /**
   * 小数位数
   */
  decimal?: number
  /**
   * NaN 的显示值
   */
  nanValue?: string
  /**
   * 0 的显示值
   */
  zeroValue?: string
  /**
   * 是否显示千分位
   */
  thousand?: boolean
  /**
   * 是否四舍五入（默认false）
   */
  rounding?: boolean
  /**
   * 是否优先使用真实小数位（默认true）
   */
  keepOriginalDecimal?: boolean
}

/**
 * 格式化金额
 */
export const formatAmount = (
  amount: unknown,
  {
    currency = '',
    decimal = 2,
    nanValue = '--',
    zeroValue,
    thousand = true,
    rounding = false,
    keepOriginalDecimal = true,
  }: FormatAmountOptions = {},
): string => {
  // 类型转换和清理
  const numericValue = convertToNumber(amount)

  if (isNaN(numericValue)) return nanValue
  if (numericValue === 0 && zeroValue !== undefined) return zeroValue

  // 处理小数位
  const actualDecimal = calculateActualDecimal(
    numericValue,
    decimal,
    keepOriginalDecimal,
  )
  let formatted = processDecimal(numericValue, actualDecimal, rounding)

  // 千分位处理
  if (thousand) {
    formatted = addThousandSeparator(formatted, actualDecimal)
  }

  return currency ? `${currency}${formatted}` : formatted
}

// 辅助函数分解
const convertToNumber = (amount: unknown): number => {
  if (typeof amount === 'string') {
    // 处理科学计数法
    if (/e/i.test(amount)) return Number(Number(amount).toFixed(20))
    return Number(amount.replace(/,/g, ''))
  }
  return Number(amount)
}

const calculateActualDecimal = (
  num: number,
  decimal: number,
  keepOriginal: boolean,
): number => {
  if (!keepOriginal) return decimal

  const str = num.toString()
  const decimalIndex = str.indexOf('.')
  const originalDecimals =
    decimalIndex === -1 ? 0 : str.length - decimalIndex - 1

  return originalDecimals > decimal ? originalDecimals : decimal
}

const processDecimal = (
  num: number,
  decimal: number,
  rounding: boolean,
): string => {
  const factor = 10 ** decimal
  const fixed = rounding
    ? Math.round(num * factor) / factor
    : Math.floor(num * factor) / factor

  return fixed.toLocaleString('en-US', {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
    useGrouping: false,
  })
}

const addThousandSeparator = (numStr: string, decimal: number): string => {
  const [integerPart, decimalPart] = numStr.split('.')
  const formattedInteger = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ',',
  )
  return decimal > 0
    ? `${formattedInteger}.${decimalPart || '0'.repeat(decimal)}`
    : formattedInteger
}
