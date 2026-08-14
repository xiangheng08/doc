/**
 * 获取指定元素在其父元素中的索引位置（仅计算元素节点，忽略文本/注释节点）
 *
 * @param el - 目标 DOM 元素（允许传入 null 或 undefined，便于安全调用）
 * @returns 从 0 开始的索引值；若元素无效、无父元素或不在 DOM 树中，返回 -1
 */
export function getElementIndex(el: Element | null | undefined): number {
  if (!el) return -1
  const parent = el.parentElement
  if (!parent) return -1
  return Array.from(parent.children).indexOf(el)
}
