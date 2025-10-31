/**
 * 格式化字节
 */
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes <= 0) return '0B'
  const dm = decimals < 0 ? 0 : decimals
  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
  let i = 0
  while (bytes > 1024) {
    bytes = bytes / 1024
    i++
  }
  return `${bytes.toFixed(dm).replace(/\.?0+$/, '')}${units[i]}B`
}
