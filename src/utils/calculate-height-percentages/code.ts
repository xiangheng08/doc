/**
 * 计算每个数据值对应的高度比例（范围 0-1）。
 *
 * @param arr 输入的数据数组。
 * @returns 返回每个数据值对应的高度比例数组，范围 0-1。
 */
export function calculateHeightPercentages(arr: number[]): number[] {
  /**
   * 确保浮点数计算的精度，忽略小的浮点数误差
   */
  function fixedNum(num: number) {
    if (('' + num).indexOf('.') >= 0) num = parseFloat(num.toFixed(8))
    return num
  }

  const magic = [10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100] // 魔数数组
  const splitNumber = 4 // 理想的刻度间隔段数
  const max = Math.max(...arr) // 获取数据中的最大值
  const min = Math.min(...arr) // 获取数据中的最小值

  // 计算初始刻度间隔的大小
  let tempGap = (max - min) / splitNumber
  // 计算缩放比例 multiple，使得 tempGap 落在魔数数组的区间内
  let multiple = Math.floor(Math.log10(tempGap) - 1)
  multiple = Math.pow(10, multiple)

  // 计算映射后的间隔大小 tempStep
  let tempStep = tempGap / multiple
  let estep: number = magic[magic.length - 1] * multiple // 默认取最大的魔数对应步长

  // 取出第一个大于 tempStep 的魔数，并乘以 multiple 作为期望得到的最佳间隔
  for (let i = 0; i < magic.length; i++) {
    if (magic[i] > tempStep) {
      estep = magic[i] * multiple
      break
    }
  }

  // 定义最大刻度和最小刻度
  let maxi = parseInt(String(max / estep + 1)) * estep
  let mini = parseInt(String(min / estep - 1)) * estep
  maxi = fixedNum(maxi)
  mini = fixedNum(mini)

  // 返回每个数据值对应的高度比例
  return arr.map((value) => (value - mini) / (maxi - mini))
}

// 测试用例
console.log(calculateHeightPercentages([128, 565, 35, 56]))
/*
[
  0.21333333333333335,
  0.9416666666666667,
  0.058333333333333334,
  0.09333333333333334
]
*/
