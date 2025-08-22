import type { Directive } from 'vue'

interface SlideInOptions {
  /**
   * 动画距离
   */
  distance?: number
  /**
   * 动画持续时间
   */
  duration?: number
  /**
   * 进入动画完成回调
   */
  onfinish?: () => void
}

interface SlideInMeta {
  animation: Animation
  onfinish: () => void
}

const map = new WeakMap<Element, SlideInMeta>()
const observer = new IntersectionObserver(async (entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const meta = map.get(entry.target)
      if (meta) {
        meta.animation.play()
        meta.animation.addEventListener(
          'finish',
          () => {
            // 完成后取消动画
            meta.animation.cancel()
            meta.onfinish()
          },
          { once: true },
        )
        unobserve(entry.target)
      }
    }
  }
})

const unobserve = (el: Element) => {
  observer.unobserve(el)
  map.delete(el)
}

const isBelowViewport = (el: Element) => {
  const rect = el.getBoundingClientRect()
  return rect.top > window.innerHeight
}

/**
 * 平滑进入指令
 */
export default {
  mounted(el, binging) {
    const {
      distance = 50,
      duration = 500,
      onfinish = () => {},
    } = binging.value || {}

    if (!isBelowViewport(el)) {
      return
    }

    const animation = el.animate(
      [
        {
          transform: `translateY(${distance}px)`,
          opacity: 0,
        },
        {
          transform: 'translateY(0)',
          opacity: 1,
        },
      ],
      {
        duration,
        easing: 'ease-out',
        fill: 'forwards',
      },
    )

    animation.pause()
    observer.observe(el)
    map.set(el, { animation, onfinish })
  },
  unmounted(el) {
    unobserve(el)
  },
} satisfies Directive<HTMLElement, SlideInOptions>
