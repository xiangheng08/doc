const formatDuration = (ms: number) => {
  // 边界情况
  if (ms === 0) return '0ms'
  if (ms < 0.001) return `${ms * 1000}μs`

  let minus = false

  if (ms < 0) {
    minus = true
    ms = Math.abs(ms)
  }

  type UnitScale = [number, string]
  type TimePart = [number, string]

  const TIME_UNITS: UnitScale[] = [
    [3600000000, 'h'],
    [60000000, 'm'],
    [1000000, 's'],
    [1000, 'ms'],
    [1, 'μs'],
  ]

  const parts: TimePart[] = []
  let remainder = Math.floor(ms * 1000)

  for (const [radix, unit] of TIME_UNITS) {
    const n = Math.floor(remainder / radix)
    if (n > 0) {
      parts.push([n, unit])
    }
    remainder %= radix
    if (remainder <= 0) {
      break
    }
  }

  let text = parts.map(([n, unit]) => `${n}${unit}`).join(' ')

  if (minus) {
    // 处理负数
    text = '-' + text
  }

  return text
}

// ========================= 测试 =========================

console.log('0ms 场景:', formatDuration(0)) // 0ms
console.log('负值场景:', formatDuration(-1234.567)) // -1234567μs
console.log('微秒边界:', formatDuration(0.001)) // 1μs
console.log('毫秒边界:', formatDuration(999)) // 999ms
console.log('秒边界:', formatDuration(1000)) // 1s
console.log('分钟边界:', formatDuration(60000)) // 1m
console.log('小时边界:', formatDuration(3600000)) // 34h 17m 36s 789ms
console.log('复合单位:', formatDuration(123456789)) // 1s 999μs
console.log('浮点精度:', formatDuration(1000.999)) // 毫秒+微秒
console.log('极小值:', formatDuration(0.0005)) // 0.5μs
console.log('极大值:', formatDuration(1e12)) // 277777h 46m 40s
console.log('跳过零值单位:', formatDuration(3600001)) // 1h 1ms
