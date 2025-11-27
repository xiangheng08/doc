/**
 * 去除 url 多余的斜杠(/)
 */
export function trimExtraSlashes(url: string) {
  return url.replace(/(?<!:)\/\/+/g, '/')
}
