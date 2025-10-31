interface FormatBytesOptions {
  /**
   * 小数位数
   * @default 2
   */
  decimals?: number
  /**
   * 后缀
   * @default 'B'
   */
  suffix?: string
  /**
   * 去除结尾多余的 0（1.00KB -> 1KB  1.50KB -> 1.5KB）
   * @default false
   */
  trim?: boolean
  /**
   * 进制基数
   * @default 1024
   */
  radix?: number
  /**
   * 以比特为单位计算 (1b = 8bit)
   * @default false
   */
  bits?: boolean
}

/**
 * 格式化字节数
 * @param bytes 字节数
 * @param options 格式化选项
 * @returns 格式化后的字节数
 *
 * @example
 * formatBytes(12345) // 12.06KB
 * formatBytes(12345, { decimals: 0 }) // 12KB
 * formatBytes(1048576, { suffix: 'bps/s', trim: true, bits: true }) // 8Mbps/s
 */
export function formatBytes(bytes: number, options?: FormatBytesOptions) {
  const {
    decimals = 2,
    suffix = 'B',
    trim = false,
    radix = 1024,
    bits = false,
  } = options || {}

  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
  const trimRegex = /\.?0+$/

  const dm = decimals < 0 ? 0 : decimals

  let text: string
  let unit = ''

  if (bits) {
    bytes = bytes * 8
  }

  if (bytes > 0) {
    const i = Math.floor(Math.log(bytes) / Math.log(radix))
    text = (bytes / Math.pow(radix, i)).toFixed(dm)
    unit = units[i]
  } else {
    text = bytes.toFixed(dm)
  }

  if (trim) {
    text = text.replace(trimRegex, '')
  }

  return text + unit + suffix
}

// ========================= 测试 =========================

formatBytes(12345) // 12.06KB
formatBytes(-12345) // -12345.00B
formatBytes(0) // 0.00B
formatBytes(1024) // 1.00KB
formatBytes(12345, { decimals: 0 }) // 12KB
formatBytes(12345, { decimals: 4 }) // 12.0557KB
formatBytes(1024, { trim: true }) // 1KB
formatBytes(1536, { trim: true }) // 1.5KB
formatBytes(1048576, { suffix: 'B/s', trim: true }) // 1MB/s
formatBytes(1048576, { suffix: 'bps/s', trim: true, bits: true }) // 8Mbps/s
formatBytes(1048576, { radix: 1000 }) // 1.05MB
