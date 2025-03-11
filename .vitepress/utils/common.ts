export function debounce<T extends any[], R, THIS>(
  this: THIS,
  fn: (...args: T) => R,
  wait?: number,
): (...args: T) => void {
  let timeout: NodeJS.Timeout | null = null
  return function (this: THIS, ...args: T) {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

export const copyText = async (text: string) => {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text)
  } else {
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}
