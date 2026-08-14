import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { SwapDrag } from '../../../utils/browser/swap-drag/code'
import type { SwapDragOptions } from '../../../utils/browser/swap-drag/code'

export interface UseSwapOptions extends SwapDragOptions {
  autoInit?: boolean
}

export function useSwap(
  el: Ref<HTMLElement | undefined>,
  options: UseSwapOptions = {},
) {
  const { autoInit = true, ...restOptions } = options

  const instance = ref<SwapDrag>()
  const isDragging = ref(false)

  const init = () => {
    if (!el.value) return
    instance.value = new SwapDrag(el.value, {
      ...restOptions,
      onStart(e) {
        isDragging.value = true
        restOptions.onStart?.(e)
      },
      onEnd() {
        isDragging.value = false
        restOptions.onEnd?.()
      },
    })
  }

  const destroy = () => instance.value?.destroy()

  const reinitialize = () => {
    destroy()
    init()
  }

  if (autoInit) onMounted(init)
  onUnmounted(destroy)

  return { instance, isDragging, init, destroy, reinitialize }
}
