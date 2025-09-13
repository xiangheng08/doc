import mediumZoom from 'medium-zoom'
import { onMounted, onUnmounted } from 'vue'
import { useAfterRouteChangeCallback } from './router'
import type { Zoom } from 'medium-zoom'

// 判断祖先元素是否有 data-no-zoom 属性
const hasNoZoom = (element: HTMLElement) => {
  while (element.parentElement) {
    if ('noZoom' in element.dataset) {
      return true
    }
    element = element.parentElement
  }
  return false
}

export const useImageZoom = () => {
  let latestZoom: Zoom | null = null

  const setupMediumZoom = () => {
    if (latestZoom) {
      latestZoom.detach()
      latestZoom = null
    }

    const images: HTMLImageElement[] = []

    document
      .querySelectorAll<HTMLImageElement>('.main img:not([data-no-zoom])')
      .forEach((image) => {
        if (!hasNoZoom(image)) {
          images.push(image)
        }
      })

    if (images.length === 0) return

    // 图片预览
    latestZoom = mediumZoom(images, { background: 'rgba(0, 0, 0, 0.7)' })
  }

  useAfterRouteChangeCallback(setupMediumZoom)

  onMounted(setupMediumZoom)

  onUnmounted(() => {
    if (latestZoom) {
      latestZoom.detach()
      latestZoom = null
    }
  })
}
