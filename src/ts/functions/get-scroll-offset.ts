/**
 * 获取元素在滚动容器中的偏移量
 *
 * @param target - 目标元素
 * @param scroller - 滚动容器元素
 */
export const getScrollOffset = (
  target: HTMLElement,
  scroller: HTMLElement,
) => {
  const targetRect = target.getBoundingClientRect()
  const scrollerRect = scroller.getBoundingClientRect()
  const scrollerComputedStyle = getComputedStyle(scroller)

  return {
    top:
      targetRect.top -
      scrollerRect.top +
      scroller.scrollTop -
      parseInt(scrollerComputedStyle.paddingTop),
    left:
      targetRect.left -
      scrollerRect.left +
      scroller.scrollLeft -
      parseInt(scrollerComputedStyle.paddingLeft),
  }
}

/**
 * 获取元素在滚动容器中的顶部偏移量
 *
 * @param target - 目标元素
 * @param scroller - 滚动容器元素
 */
export const getScrollOffsetTop = (
  target: HTMLElement,
  scroller: HTMLElement,
) => {
  return (
    target.getBoundingClientRect().top -
    scroller.getBoundingClientRect().top +
    scroller.scrollTop -
    parseInt(getComputedStyle(scroller).paddingTop)
  )
}

/**
 * 获取元素在滚动容器中的左边偏移量
 *
 * @param target - 目标元素
 * @param scroller - 滚动容器元素
 */
export const getScrollOffsetLeft = (
  target: HTMLElement,
  scroller: HTMLElement,
) => {
  return (
    target.getBoundingClientRect().left -
    scroller.getBoundingClientRect().left +
    scroller.scrollLeft -
    parseInt(getComputedStyle(scroller).paddingLeft)
  )
}
