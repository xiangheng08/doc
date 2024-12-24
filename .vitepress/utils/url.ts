/**
 * 去除 url 多余的斜杠(/)
 */
export const trimExtraSlashes = (url: string) => {
  return url.replace(/(?<!:)\/\/+/g, '/')
}

/**
 * 去除 url 前缀
 */
export const withBase = (path: string) => {
  let base = process.env.BASE_URL || ''

  if (!base.startsWith('/')) {
    base = '/' + base
  }

  if (!path.startsWith('/')) {
    path = '/' + path
  }

  return trimExtraSlashes(base + path)
}
