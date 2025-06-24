/**
 * 选择文件
 * @param {object} [options]
 * @param {boolean} [options.accept]
 * @param {boolean} [options.multiple]
 * @returns {Promise<File[]>}
 *
 * @example
 * selectFile({ accept: 'image/*', multiple: true }).then(files => {
 *     console.log(files)
 * })
 */
export const selectFile = (options) => {
  return new Promise((resolve, reject) => {
    const { accept, multiple } = options || {}
    const input = document.createElement('input')
    input.type = 'file'
    if (accept) input.accept = accept
    if (multiple) input.multiple = multiple
    input.click()
    input.onchange = () => {
      const files = []
      for (let i = 0; i < input.files.length; i++) {
        files.push(input.files[i])
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
