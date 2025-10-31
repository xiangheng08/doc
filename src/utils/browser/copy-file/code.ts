/**
 * 复制图片到剪贴板
 */
export async function copyFileToClipboard(file: File | Blob) {
  if (!navigator.clipboard) {
    throw new Error('Clipboard API is not supported in current browser')
  }
  if (!file.type) {
    throw new Error('File type is empty')
  }
  const item = new ClipboardItem({ [file.type]: file })
  await navigator.clipboard.write([item])
}
