/**
 * 使用原生 URL 对象解析 URL 查询参数
 * @param url - URL 字符串
 * @returns 解析后的查询参数对象
 */
export function parseQuery(url: string): Record<string, string> {
  // 如果输入不是完整 URL，添加基础域名使其成为有效 URL
  const fullUrl = url.includes('://') ? url : `http://example.com/${url}`

  const urlObj = new URL(fullUrl)
  const result: Record<string, string> = {}

  // 遍历所有查询参数
  for (const [key, value] of urlObj.searchParams.entries()) {
    result[key] = value
  }

  return result
}
