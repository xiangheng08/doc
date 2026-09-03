import { sleep } from '../../sleep/code'
import { getElementIndex } from '../get-element-index/code'

export type SwapAnimator = () => Promise<void>

export interface SwapDragOptions {
  /**
   * 拖拽开始前的延迟时间（毫秒）
   *
   * @default 0
   */
  delay?: number
  /**
   * 拖动动画持续时间（毫秒），设为0则无动画
   *
   * @default 300
   */
  animation?: number
  /**
   * 拖动动画的缓动函数
   *
   * @default 'ease'
   * @values 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string
   * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect#easing
   */
  easing?: string
  /**
   * 容器选择器；若指定则在传入的 `el` 内查找该元素作为容器
   */
  selector?: string
  /**
   * 拖拽手柄选择器；若指定，则只有从该选择器命中的元素上按下才能开始拖拽
   */
  handle?: string
  /**
   * 可以被拖拽的子项
   */
  draggable?: string
  /**
   * 不能被拖拽的子项
   */
  filter?: string
  /**
   * 是否禁用拖拽
   *
   * @default false
   */
  disabled?: boolean
  /**
   * 选中时的类名
   *
   * @default 'swap-chosen'
   */
  chosenClass?: string
  /**
   * 阴影时的类名
   *
   * @default 'swap-ghost'
   */
  ghostClass?: string
  /**
   * 拖动悬停时添加到目标元素的高亮类名
   *
   * @default 'swap-highlight'
   */
  highlightClass?: string
  /**
   * 拖动的元素位于目标元素之前时添加的类名
   *
   * @default 'swap-before'
   */
  beforeClass?: string
  /**
   * 拖动的元素位于目标元素之后时添加的类名
   *
   * @default 'swap-after'
   */
  afterClass?: string
  /**
   * 拖拽开始时的回调函数
   */
  onStart?: (e: DragEvent) => void
  /**
   * 拖动经过某个目标元素时触发。
   * 返回 `false` 表示禁止拖入该元素（不会添加高亮，也不会触发 drop）。
   */
  onMove?: (evt: SwapEvent, event: DragEvent) => boolean | void
  /**
   * 松手并完成排序（顺序有变化时触发）。
   * 第二个参数 `swap` 为交换动画函数，调用后播放各元素移动到新位置的动画。
   */
  onSort?: (evt: SwapEvent, swap: SwapAnimator) => any | Promise<any>
  /**
   * 拖动结束（无论是否完成排序）时触发
   */
  onEnd?: () => void
}

export interface SwapEvent {
  /**
   * 当前正在拖拽的元素
   */
  dragged: HTMLElement
  /**
   * 当前拖入的目标元素（即要与之交换位置的元素）
   */
  target: HTMLElement
  /**
   * 当前正在拖拽的元素在容器中的索引
   */
  draggedIndex: number
  /**
   * 当前拖入的目标元素（即要与之交换位置的元素）在容器中的索引
   */
  targetIndex: number
}

export class SwapDrag {
  private readonly container: HTMLElement
  private delayTimer?: ReturnType<typeof setTimeout>
  delay: number
  animation: number
  easing: string
  disabled: boolean
  handle?: string
  draggable?: string
  filter?: string
  chosenClass: string
  ghostClass: string
  highlightClass: string
  beforeClass: string
  afterClass: string
  private onStart: (e: DragEvent) => void
  private onMove: (evt: SwapEvent, event: DragEvent) => boolean | void
  private onSort: (
    evt: SwapEvent,
    swap: SwapAnimator,
  ) => any | Promise<any>
  private onEnd: () => void
  /**
   * 当前正在拖拽的元素
   */
  dragged: HTMLElement | null = null
  /**
   * 当前拖入的目标元素（即要与之交换位置的元素）
   */
  target: HTMLElement | null = null

  private handlePointerDown = (e: PointerEvent) => {
    if (this.disabled) return
    const dragged = this.resolveTarget(e.target, this.handle)
    if (!dragged) return
    if (this.draggable && !dragged.matches(this.draggable)) return
    if (this.filter && dragged.matches(this.filter)) return

    this.dragged = dragged
    if (this.delay > 0) {
      this.delayTimer = setTimeout(() => this.activateDrag(), this.delay)
    } else {
      this.activateDrag()
    }
  }

  private handlePointerUp = () => {
    this.clearDragged()
  }

  private handleDragStart = (e: DragEvent) => {
    if (!this.dragged) return
    this.dragged.classList.add(this.ghostClass)

    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move'
      // Firefox 需要设置数据才能触发拖拽
      e.dataTransfer.setData('text/plain', 'swap')
    }

    this.onStart(e)
  }

  private handleDragOver = (e: DragEvent) => {
    if (this.disabled || !this.dragged) return
    const target = this.resolveTarget(e.target)
    // 拖到容器空隙时清理残留高亮（与 dragleave 互补）
    if (!target) return this.clearTarget()

    // 只要命中容器内元素，就始终取消默认行为，确保 drop 能触发
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
    e.preventDefault()

    if (target === this.target) return
    if (target === this.dragged) return this.clearTarget()

    const evt = this.createSwapEvent(target)
    // 拖到容器空隙时清理残留高亮（与 dragleave 互补）
    if (this.onMove(evt, e) === false) return this.clearTarget()

    this.clearTargetClasses()
    target.classList.add(
      this.highlightClass,
      evt.targetIndex > evt.draggedIndex
        ? this.afterClass
        : this.beforeClass,
    )
    this.target = target
  }

  private handleDragLeave = (e: DragEvent) => {
    if (!this.dragged || !this.target) return
    // relatedTarget 为 null 或不在容器内部，说明真的离开了容器
    const related = e.relatedTarget as Node | null
    if (related && this.container.contains(related)) return
    this.clearTarget()
  }

  private handleDrop = async (e: DragEvent) => {
    if (this.disabled || !this.dragged || !this.target) return
    e.preventDefault()
    const evt = this.createSwapEvent(this.target)
    const rects = this.recordPositions()
    try {
      await this.onSort(evt, this.createSwap(rects))
    } finally {
      rects.clear() // 清理元素，避免内存泄漏
    }
  }

  private handleDragEnd = () => {
    this.clearDragged()
    this.clearTarget()
    this.onEnd()
  }

  /**
   * 事件名 → 处理函数映射，用于统一注册/销毁
   */
  private readonly listeners: Array<[string, (...e: any[]) => void]> = [
    ['pointerdown', this.handlePointerDown],
    ['pointerup', this.handlePointerUp],
    ['dragstart', this.handleDragStart],
    ['dragover', this.handleDragOver],
    ['dragleave', this.handleDragLeave],
    ['drop', this.handleDrop],
    ['dragend', this.handleDragEnd],
  ]

  constructor(el: HTMLElement, options: SwapDragOptions = {}) {
    const { selector } = options
    this.delay = options.delay ?? 0
    this.animation = options.animation ?? 300
    this.easing = options.easing ?? 'ease'
    this.disabled = options.disabled ?? false
    this.handle = options.handle
    this.draggable = options.draggable
    this.filter = options.filter
    this.chosenClass = options.chosenClass ?? 'swap-chosen'
    this.ghostClass = options.ghostClass ?? 'swap-ghost'
    this.highlightClass = options.highlightClass ?? 'swap-highlight'
    this.beforeClass = options.beforeClass ?? 'swap-before'
    this.afterClass = options.afterClass ?? 'swap-after'
    this.onStart = options.onStart ?? (() => {})
    this.onMove = options.onMove ?? (() => {})
    this.onSort = options.onSort ?? (() => {})
    this.onEnd = options.onEnd ?? (() => {})

    const container = selector
      ? el.querySelector<HTMLElement>(selector)
      : el
    if (!container) {
      throw new Error('Container element not found')
    }
    this.container = container

    this.listeners.forEach(([type, handler]) =>
      container.addEventListener(type, handler),
    )
  }

  /**
   * 销毁拖拽实例
   * 请在组件卸载时调用此方法，以避免内存泄漏
   */
  destroy() {
    this.listeners.forEach(([type, handler]) =>
      this.container.removeEventListener(type, handler),
    )
  }

  /**
   * 从 event.target 中解析出容器内的目标元素
   */
  private resolveTarget(
    eventTarget: EventTarget | null,
    handle?: string,
  ): HTMLElement | null {
    if (!eventTarget || !(eventTarget instanceof HTMLElement)) return null

    // 指定 handle 时，目标或其祖先需匹配该选择器
    if (handle) {
      let current: HTMLElement | null = eventTarget
      let matched = false
      while (current && current !== this.container) {
        if (current.matches(handle)) {
          matched = true
          break
        }
        current = current.parentElement
      }
      if (!matched) return null
    }

    // 向上查找，直到找到父元素为 container 为止
    let el: HTMLElement | null = eventTarget
    while (el && el.parentElement && el.parentElement !== this.container) {
      // 若父元素为 document.documentElement，视为超出容器范围，返回 null
      if (el.parentElement === document.documentElement) {
        return null
      }
      el = el.parentElement
    }

    return el && el.parentElement === this.container ? el : null
  }

  /**
   * 激活拖拽：使元素可拖拽，并添加选中态类名
   */
  private activateDrag() {
    if (!this.dragged) return
    this.dragged.draggable = true
    this.dragged.classList.add(this.chosenClass)
  }

  /**
   * 移除目标元素上的高亮 / 前后置类名
   */
  private clearTargetClasses() {
    this.target?.classList.remove(
      this.highlightClass,
      this.afterClass,
      this.beforeClass,
    )
  }

  /**
   * 清除当前目标及其高亮状态
   */
  private clearTarget() {
    this.clearTargetClasses()
    this.target = null
  }

  /**
   * 清理拖拽状态：清除延时定时器、恢复 draggable、移除相关类名
   */
  private clearDragged() {
    clearTimeout(this.delayTimer)
    if (!this.dragged) return
    this.dragged.classList.remove(this.chosenClass, this.ghostClass)
    this.dragged.draggable = false
    this.dragged = null
  }

  /**
   * 构造一次交换事件的描述对象（拖拽元素与目标元素的索引）
   */
  private createSwapEvent(target: HTMLElement): SwapEvent {
    const draggedIndex = getElementIndex(this.dragged)
    const targetIndex = getElementIndex(target)
    return { dragged: this.dragged!, target, draggedIndex, targetIndex }
  }

  /**
   * 记录容器内所有子元素当前的位置，供交换动画计算位移
   */
  recordPositions() {
    const rects = new Map<HTMLElement, DOMRect>()
    Array.from(this.container.children).forEach((el) => {
      rects.set(el as HTMLElement, el.getBoundingClientRect())
    })
    return rects
  }

  /**
   * 生成交换动画函数：播放各元素从记录位置移动到当前位置的过渡动画
   */
  createSwap(rects: Map<HTMLElement, DOMRect>): SwapAnimator {
    return async () => {
      const animations: Animation[] = []
      for (const [el, prev] of rects) {
        if (!el.isConnected) continue // 元素已被移除，跳过
        const now = el.getBoundingClientRect()
        const dx = prev.left - now.left
        const dy = prev.top - now.top
        if (dx === 0 && dy === 0) continue // 无需位移，跳过
        // 为发生位移的元素创建过渡动画
        const animation = el.animate(
          [
            { transform: `translate(${dx}px, ${dy}px)` },
            { transform: 'translate(0, 0)' },
          ],
          { duration: this.animation, easing: this.easing },
        )
        animations.push(animation)
      }

      // 全部动画结束后 resolve（加超时兜底，防止个别元素被移除导致无法结束）
      const finished = Promise.all(
        animations.map((anim) => anim.finished.catch(() => {})),
      )
      const timeout = sleep(this.animation + 50)
      return Promise.race([finished, timeout]).then(() => {})
    }
  }

  /**
   * 在受控作用域内执行重排，确保 `rects` 用完即清，避免 DOM 引用残留导致内存泄漏
   *
   * @param fn 变更回调，接收 `swap` 动画函数
   */
  async withSwap(fn: (swap: SwapAnimator) => any) {
    const rects = this.recordPositions()
    const swap = this.createSwap(rects)
    try {
      await fn(swap)
    } finally {
      rects.clear()
    }
  }
}
