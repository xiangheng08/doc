import { onUnmounted } from 'vue'
import { useRouter } from 'vitepress'

type CallBackType =
  | 'onBeforeRouteChange'
  | 'onBeforePageLoad'
  | 'onAfterPageLoad'
  | 'onAfterRouteChange'

const callbacks: Record<CallBackType, Set<() => void>> = {
  onBeforeRouteChange: new Set(),
  onBeforePageLoad: new Set(),
  onAfterPageLoad: new Set(),
  onAfterRouteChange: new Set(),
}

export const useRouterCallback = (
  type: CallBackType,
  callback: () => void,
) => {
  callbacks[type].add(callback)

  const router = useRouter()

  if (!router[type]) {
    router[type] = () => {
      callbacks[type].forEach((callback) => {
        try {
          callback()
        } catch (error) {
          console.error(`Error handling ${type} event:`, error)
        }
      })
    }
  }

  onUnmounted(() => {
    callbacks[type].delete(callback)
  })
}

export const useBeforeRouteChangeCallback = (callback: () => void) => {
  return useRouterCallback('onBeforeRouteChange', callback)
}

export const useBeforePageLoadCallback = (callback: () => void) => {
  return useRouterCallback('onBeforePageLoad', callback)
}

export const useAfterPageLoadCallback = (callback: () => void) => {
  return useRouterCallback('onAfterPageLoad', callback)
}

export const useAfterRouteChangeCallback = (callback: () => void) => {
  return useRouterCallback('onAfterRouteChange', callback)
}
