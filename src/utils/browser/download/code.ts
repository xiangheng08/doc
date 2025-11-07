/**
 * 下载
 */
export function download(url: string, filename = '') {
  const a = document.createElement('a')
  a.download = filename
  a.href = url
  a.click() // 触发a标签的click事件
}

/**
 * 下载文件
 */
export function downloadFile(file: File | Blob, filename?: string) {
  const url = URL.createObjectURL(file)
  download(url, filename || (file instanceof File ? file.name : void 0))
  URL.revokeObjectURL(url)
}
