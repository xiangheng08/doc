import './loading.css'
import LoadingContainer from './LoadingContainer.vue'
import LoadingContent from './LoadingContent.vue'
import { createVNode, render } from 'vue'
import type {
  AppContext,
  Directive,
  UnwrapRef,
  Plugin,
  DirectiveBinding,
} from 'vue'

interface LoadingOptions {
  target?: HTMLElement | string
  fullscreen?: boolean
  lock?: boolean
  background?: string
  className?: string
  zIndex?: number
  appContext?: AppContext
  beforeClose?: () => void | false
  onClosed?: () => void
}

type ResolvedLoadingOptions = LoadingOptions & { target: HTMLElement }

export interface LoadingMeta {
  close: () => void
}

export type LoadingBinding = boolean | UnwrapRef<LoadingOptions>

class LoadingService {
  private readonly map = new WeakMap<HTMLElement, LoadingMeta>()
  appContext?: AppContext

  create(options?: LoadingOptions) {
    const resolved = resolveOptions(options)

    const _meta = this.map.get(resolved.target)
    if (_meta) {
      _meta.close()
    }

    let container: HTMLDivElement | null = document.createElement('div')
    container.dataset.loading = ''

    const props = {
      background: resolved.background,
      className: resolved.className,
      zIndex: resolved.zIndex,
      onClosed: () => {
        resolved.onClosed?.()
        if (!this.map.has(resolved.target)) {
          resolved.target.classList.remove('loading-target', 'scroll-lock')
        }
        render(null, container!)
        container = null
      },
    }

    const vnode = createVNode(LoadingContainer, props, {
      default: () => createVNode(LoadingContent),
    })
    vnode.appContext = resolved.appContext || this.appContext || null

    render(vnode, container)

    resolved.target.appendChild(container.firstElementChild!)
    addClassName(resolved)

    const vc = vnode.component!

    const meta = {
      close: () => {
        if (resolved.beforeClose && !resolved.beforeClose()) return
        vc.exposed!.visible.value = false
        this.map.delete(resolved.target)
      },
    }

    this.map.set(resolved.target, meta)

    return meta
  }

  createFromBinding(
    el: HTMLElement,
    binding: DirectiveBinding<LoadingBinding, string, string>,
  ) {
    const options = isObject(binding.value) ? binding.value : {}
    binding.modifiers.fullscreen && (options.fullscreen = true)
    binding.modifiers.lock && (options.lock = true)
    options.target = el
    service.create(options)
  }

  update(el: HTMLElement, options: LoadingOptions) {
    // TODO: implement update
  }

  close(target?: HTMLElement | string) {
    if (typeof target === 'string') {
      const el = document.querySelector<HTMLElement>(target)
      if (!el) return
      target = el
    } else if (!target) {
      target = document.body
    }

    this.map.get(target)?.close()
  }
}

const isObject = (val: any): val is Record<any, any> =>
  val !== null && typeof val === 'object'

const resolveOptions = (options: LoadingOptions = {}) => {
  if (options.fullscreen) {
    options.target = document.body
  } else if (typeof options.target === 'string') {
    const el = document.querySelector<HTMLElement>(options.target)
    if (!el) {
      throw new Error(`[Loading] target ${options.target} not found`)
    }
    options.target = el
  } else if (!options.target) {
    options.target = document.body
  }

  const { loadingBackground, loadingClassName } = options.target.dataset

  if (loadingBackground && !options.background) {
    options.background = loadingBackground
  }

  if (loadingClassName && !options.className) {
    options.className = loadingClassName
  }

  return options as ResolvedLoadingOptions
}

const addClassName = (resolved: ResolvedLoadingOptions) => {
  resolved.target.classList.remove('loading-target', 'scroll-lock')
  resolved.target.classList.add('loading-target')
  resolved.lock && resolved.target.classList.add('scroll-lock')
}

export const service = new LoadingService()

export const vLoading: Directive<HTMLElement, LoadingBinding> = {
  mounted(el, binding) {
    if (!binding.value) return
    service.createFromBinding(el, binding)
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      if (binding.value && !binding.oldValue) {
        service.createFromBinding(el, binding)
      } else if (binding.value && binding.oldValue) {
        if (isObject(binding.value)) {
          service.update(el, binding.value)
        }
      } else {
        service.close(el)
      }
    }
  },
  unmounted(el) {
    service.close(el)
  },
}

export const loadingPlugin: Plugin = {
  install(app) {
    app.directive('loading', vLoading)
    service.appContext = app._context
  },
}
