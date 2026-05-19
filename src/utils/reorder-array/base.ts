/**
 * 重新排列数组
 * @param arr 目标数组
 * @param order 新的顺序（下标数组）
 */
export function reorderArray<T>(arr: T[], order: number[]) {
  if (arr.length !== order.length) {
    throw new Error(
      'The length of the array and the order array must be the same.',
    )
  }

  // 创建原数组的副本
  const temp = [...arr]

  // 按照 order 更新原数组
  for (let i = 0; i < order.length; i++) {
    arr[i] = temp[order[i]]
  }
}
