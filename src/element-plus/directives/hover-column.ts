import type { Directive } from 'vue'

type EventHandler = (e: MouseEvent) => void
type SetHoverColumn = (column: number | null) => void
type Position = DOMRect

const handlerMap = new WeakMap<
  HTMLElement,
  { handleMouseOver: EventHandler; handleMouseLeave: EventHandler }
>()

const directive: Directive<HTMLElement, SetHoverColumn> = {
  mounted(el, { value: setHoverColumn }) {
    let lastValue: number | null = null

    const innerSetHoverColumn = (value: number | null) => {
      if (lastValue === value) return
      lastValue = value
      setHoverColumn(value)
    }
    const handleMouseOver: EventHandler = (e) => {
      const dom = e.target as HTMLElement | null
      const cell = dom?.closest<HTMLTableCellElement>('td, th')
      if (!cell || (cell.tagName === 'TH' && cell.colSpan > 1)) {
        return innerSetHoverColumn(null)
      }
      const { left, width } = cell.getBoundingClientRect()
      const cellCenterX = left + width / 2
      const positions = getPositions(el)
      if (positions.length === 0) {
        return innerSetHoverColumn(null)
      }
      for (let i = 0; i < positions.length; i++) {
        const { left, right } = positions[i]
        if (cellCenterX >= left && cellCenterX <= right) {
          innerSetHoverColumn(i + 1)
          break
        }
      }
    }

    const handleMouseLeave: EventHandler = () => {
      innerSetHoverColumn(null)
    }

    el.addEventListener('mouseover', handleMouseOver)
    el.addEventListener('mouseleave', handleMouseLeave)

    // 保存处理函数以便卸载时移除
    handlerMap.set(el, { handleMouseOver, handleMouseLeave })
  },
  unmounted(el) {
    const handler = handlerMap.get(el)
    if (handler) {
      const { handleMouseOver, handleMouseLeave } = handler
      el.removeEventListener('mouseover', handleMouseOver)
      el.removeEventListener('mouseleave', handleMouseLeave)
      handlerMap.delete(el)
    }
  },
}

const getPositions = (el: HTMLElement) => {
  const colgroup = el.querySelector('colgroup')
  if (!colgroup) return []
  return Array.from(colgroup.children).map<Position>((col) =>
    col.getBoundingClientRect(),
  )
}

export default directive
