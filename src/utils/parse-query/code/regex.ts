/**
 * 解析 URL 查询参数
 * @param url - URL 字符串
 * @returns 解析后的查询参数对象
 */
export function parseQuery(url: string): Record<string, string> {
  const result: Record<string, string> = {}

  url.replace(
    /([^?&=]+)=([^&]+)/g,
    (_, key, value) =>
      (result[decodeURIComponent(key)] = decodeURIComponent(value)),
  )

  return result
}

// 测试用例
console.log(parseQuery('https://example.com?a=1&b=2')) // { a: '1', b: '2' }
console.log(parseQuery('a=1&b=2')) // { a: '1', b: '2' }
console.log(parseQuery('https://example.com?a=1')) // { a: '1' }
console.log(parseQuery('https://example.com')) // {}
console.log(parseQuery('https://example.com?')) // {}
console.log(parseQuery('https://example.com?name=%E4%B8%AD%E6%96%87&city=New%20York')) // { name: '中文', city: 'New York' }
console.log(parseQuery('https://example.com?formula=a%2Bb%3Dc&email=user%40example.com')) // { formula: 'a+b=c', email: 'user@example.com' }
console.log(parseQuery('https://example.com?url=https%3A%2F%2Fexample.com%3Fparam%3Dvalue&other=test')) // { url: 'https://example.com?param=value', other: 'test' }
console.log(parseQuery('https://example.com?param=first&param=second')) // { param: 'second' }
console.log(parseQuery('https://example.com?param1=&param2=test')) // { param2: 'test' }
