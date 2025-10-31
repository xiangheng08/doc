/**
 * 去除 url 多余的斜杠(/)
 */
export const trimExtraSlashes = (url: string) => {
  return url.replace(/(?<!:)\/\/+/g, '/')
}
