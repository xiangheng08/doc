/**
 * @description: 格式化字节
 * @param bytes 字节数
 * @param decimals 小数位数
 * @returns 格式化后的字节数
 */
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes <= 0) return '0B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + units[i] + 'B'
}

// 测试用例
console.log(formatBytes(0)) // "0B"
console.log(formatBytes(-100)) // "0B"
console.log(formatBytes(512)) // "512B"
console.log(formatBytes(1024)) // "1KB"
console.log(formatBytes(1536)) // "1.5KB"
console.log(formatBytes(12345)) // "12.06KB"
console.log(formatBytes(1048576)) // "1MB"
console.log(formatBytes(1073741824)) // "1GB"
console.log(formatBytes(1234567890)) // "1.15GB"

// 测试不同的小数位数
console.log(formatBytes(1500, 0)) // "1KB"
console.log(formatBytes(1500, 1)) // "1.5KB"
console.log(formatBytes(1500, 3)) // "1.465KB"
console.log(formatBytes(1500, 5)) // "1.46484KB"
console.log(formatBytes(1000000, 3)) // "976.563KB"

// 测试负小数位数（会被视为0）
console.log(formatBytes(1500, -1)) // "1KB"
console.log(formatBytes(1500, -2)) // "1KB"
