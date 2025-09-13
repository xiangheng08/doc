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

// from https://github.com/vuejs/vitepress/blob/v1.6.3/src/client/theme-default/support/utils.ts
export const throttleAndDebounce = (
  fn: () => void,
  delay: number,
): (() => void) => {
  let timer: ReturnType<typeof setTimeout>
  let called = false

  return () => {
    if (timer) clearTimeout(timer)

    if (!called) {
      fn()
      ;(called = true) && setTimeout(() => (called = false), delay)
    } else timer = setTimeout(fn, delay)
  }
}

// 获取元素在滚动容器中的顶部偏移量
export const getScrollOffsetTop = (target: HTMLElement, scroller: HTMLElement) => {
  return (
    target.getBoundingClientRect().top -
    scroller.getBoundingClientRect().top +
    scroller.scrollTop -
    parseInt(getComputedStyle(scroller).paddingTop)
  )
}

