import { throttleAndDebounce } from '../../utils/common'
import { onMounted, onUnmounted, ref } from 'vue'

// 底边距（底部阴影区域的高度）
const PADDING_BOTTOM = 32

// 获取 Aside 容器的内容区域高度
const getAsideContainerContentHeight = (el: HTMLElement) => {
  const paddingTop = parseInt(getComputedStyle(el).paddingTop)
  return el.clientHeight - paddingTop - PADDING_BOTTOM
}

// 获取元素在滚动容器中的顶部偏移量
const getScrollOffsetTop = (el: HTMLElement, scroller: HTMLElement) => {
  return (
    el.getBoundingClientRect().top -
    scroller.getBoundingClientRect().top +
    scroller.scrollTop -
    parseInt(getComputedStyle(scroller).paddingTop)
  )
}

export const useOutlineAutoScroll = (): void => {
  const asideContainerRef = ref<HTMLElement>()

  // 使用 throttleAndDebounce，保持和 vitepress 更新激活的 outline link 的行为一致，并减少计算开销
  const autoScroll = throttleAndDebounce(() => {
    if (!asideContainerRef.value) return

    // 获取当前激活的的 outline link
    const activeLink = asideContainerRef.value.querySelector<HTMLElement>(
      '.outline-link.active',
    )

    if (!activeLink) return

    // 滚动容器的内容区域高度
    const contentHeight = getAsideContainerContentHeight(
      asideContainerRef.value,
    )
    if (Number.isNaN(contentHeight)) return

    // 获取当前激活的 link 相对于滚动容器的顶部偏移
    const linkScrollOffsetTop = getScrollOffsetTop(
      activeLink,
      asideContainerRef.value,
    )
    if (Number.isNaN(linkScrollOffsetTop)) return

    const containerScrollTop = asideContainerRef.value.scrollTop
    const linkHeight = activeLink.offsetHeight

    if (linkScrollOffsetTop < containerScrollTop) {
      asideContainerRef.value.scrollTo({
        top: linkScrollOffsetTop,
        behavior: 'smooth',
      })
    } else if (
      linkScrollOffsetTop + linkHeight >
      containerScrollTop + contentHeight
    ) {
      asideContainerRef.value.scrollTo({
        top: linkScrollOffsetTop - contentHeight + linkHeight,
        behavior: 'smooth',
      })
    }
  }, 100)

  const handleScroll = (): void => {
    autoScroll()
  }

  onMounted(() => {
    // 滚动容器
    const el = document.querySelector<HTMLElement>(
      '.Layout .VPContent .aside .aside-container',
    )

    if (!el) return

    asideContainerRef.value = el

    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
}
