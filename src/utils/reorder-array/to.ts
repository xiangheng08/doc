import { reorderArray } from './base'

// #region code
/**
 * 重新排列数组（返回新数组）
 * @param arr 目标数组
 * @param order 新的顺序（下标数组）
 */
export function toReorderArray<T>(arr: T[], order: number[]): T[] {
  const copied = [...arr]
  reorderArray(copied, order)
  return copied
}
// #endregion code
