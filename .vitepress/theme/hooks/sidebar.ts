import { getScrollOffsetTop } from '../../utils/common'
import { onMounted, nextTick } from 'vue'
import { useAfterRouteChangeCallback } from './router'

export const useSidebarActiveIntoView = () => {
  const intoView = async () => {
    await nextTick() // 等待DOM更新

    const sidebar = document.querySelector<HTMLElement>('.VPSidebar')
    if (!sidebar) return

    const activeItem = sidebar.querySelector<HTMLElement>(
      '.VPSidebarItem.is-active',
    )
    if (!activeItem) return

    const scrollOffsetTop = getScrollOffsetTop(activeItem, sidebar)
    const computedStyle = getComputedStyle(sidebar)
    const paddingTop = parseInt(computedStyle.paddingTop)
    const paddingBottom = parseInt(computedStyle.paddingBottom)
    const contentHeight = sidebar.clientHeight - paddingTop - paddingBottom

    if (
      sidebar.scrollTop + paddingTop > scrollOffsetTop ||
      sidebar.scrollTop + paddingTop + contentHeight < scrollOffsetTop
    ) {
      activeItem.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  onMounted(intoView)

  useAfterRouteChangeCallback(intoView)
}
