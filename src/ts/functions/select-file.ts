interface SelectFileOptions {
  /**
   * 文件类型
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
 * selectFile({ accept: 'image/*', multiple: true }).then(files => {
 *     console.log(files)
 * })
 */
export const selectFile = (options?: SelectFileOptions) => {
  return new Promise<File[]>((resolve, reject) => {
    const { accept, multiple } = options || {}
    const input = document.createElement('input')
    input.type = 'file'
    if (accept) input.accept = accept
    if (multiple) input.multiple = multiple
    input.click()
    input.onchange = () => {
      const files: File[] = []
      for (let i = 0; i < input.files!.length; i++) {
        files.push(input.files![i])
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
  })
}
