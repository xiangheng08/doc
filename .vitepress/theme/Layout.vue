<script lang="ts" setup>
import { useData, useRouter } from 'vitepress'
import { nextTick, provide, onMounted } from 'vue'
import mediumZoom from 'medium-zoom'
import DefaultTheme from 'vitepress/theme'
import ScrollToTop from './components/scroll-to-top.vue'
import type { Zoom } from 'medium-zoom'

const { isDark } = useData()

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide(
  'toggle-appearance',
  async ({ clientX: x, clientY: y }: MouseEvent) => {
    if (!enableTransitions()) {
      isDark.value = !isDark.value
      return
    }

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
      )}px at ${x}px ${y}px)`,
    ]

    await document.startViewTransition(async () => {
      isDark.value = !isDark.value
      await nextTick()
    }).ready

    document.documentElement.animate(
      { clipPath: isDark.value ? clipPath.reverse() : clipPath },
      {
        duration: 300,
        easing: 'ease-in',
        pseudoElement: `::view-transition-${
          isDark.value ? 'old' : 'new'
        }(root)`,
      },
    )
  },
)

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

onMounted(setupMediumZoom)

const router = useRouter()

router.onAfterRouteChange = setupMediumZoom
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-bottom>
      <ScrollToTop />
    </template>
  </DefaultTheme.Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
