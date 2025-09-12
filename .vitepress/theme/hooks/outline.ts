import { debounce } from '../../utils/common'
import { onMounted, onUnmounted, ref } from 'vue'

const PADDING_BOTTOM = 32

const getAsideContainerContentHeight = (el: HTMLElement) => {
  const paddingTop = parseInt(getComputedStyle(el).paddingTop)
  if (Number.isNaN(paddingTop)) return null
  return el.clientHeight - paddingTop - PADDING_BOTTOM
}

export const useOutlineAutoScroll = (): void => {
  const asideContainerRef = ref<HTMLElement>()

  const autoScroll = debounce(() => {
    if (!asideContainerRef.value) return

    const activeLink = asideContainerRef.value.querySelector<HTMLElement>(
      '.outline-link.active',
    )

    if (!activeLink) return

    const contentHeight = getAsideContainerContentHeight(
      asideContainerRef.value,
    )
    if (contentHeight === null) return

    console.log('contentHeight', contentHeight)

    const containerScrollTop = asideContainerRef.value.scrollTop
    const linkOffsetTop = activeLink.offsetTop
    const linkHeight = activeLink.offsetHeight

    console.log('containerScrollTop', containerScrollTop)
    console.log('linkOffsetTop', linkOffsetTop)
    console.log('linkHeight', linkHeight)

    console.log(linkOffsetTop + linkHeight , containerScrollTop + contentHeight);



    if (linkOffsetTop < containerScrollTop) {
      console.log('down')

      asideContainerRef.value.scrollTo({
        top: linkOffsetTop,
        behavior: 'smooth',
      })
    } else if (linkOffsetTop + linkHeight > containerScrollTop + contentHeight) {
      const diff = linkOffsetTop + linkHeight - (containerScrollTop + contentHeight)
      const top = containerScrollTop + diff + linkHeight
      console.log('up', top)

      asideContainerRef.value.scrollTo({
        top,
        behavior: 'smooth',
      })
    }
  }, 100)

  const handleScroll = (): void => {
    autoScroll()
  }

  onMounted(() => {
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
