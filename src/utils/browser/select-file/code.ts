export interface SelectFileOptions {
  /**
   * 文件类型
   *
   * @see [MDN Reference](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/accept)
   */
  accept?: string
  /**
   * 是否多选
   */
  multiple?: boolean
}

/**
 * 选择文件
 * @example
 * ```js
 * selectFile({ accept: 'image/*', multiple: true }).then(files => {
 *     console.log(files)
 * })
 * ```
 */
export function selectFile(options?: SelectFileOptions): Promise<File[]> {
  return new Promise<File[]>((resolve, reject) => {
    const { accept, multiple } = options || {}
    const input = document.createElement('input')
    input.type = 'file'
    if (accept) input.accept = accept
    if (multiple) input.multiple = multiple
    input.onchange = () => {
      const files: File[] = []
      if (input.files) {
        for (const file of input.files) {
          files.push(file)
        }
      }
      if (files.length > 0) {
        resolve(files)
      } else {
        reject(new Error('CANCEL'))
      }
    }
    input.onerror = (_event, _source, _lineno, _colno, error) => {
      reject(error || new Error('UNKNOWN_ERROR'))
    }
    input.oncancel = () => {
      reject(new Error('CANCEL'))
    }
    input.click()
  })
}
