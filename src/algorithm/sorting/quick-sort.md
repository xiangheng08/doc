# 快速排序

快速排序（Quick Sort）是一种高效的排序算法，采用分治法策略来把一个序列分为较小和较大的两个子序列，然后递归地排序两个子序列。它是目前应用最广泛的排序算法之一。

## 算法原理

快速排序的基本思想是：
1. 从数列中挑出一个元素，称为"基准"（pivot）
2. 重新排序数列，所有比基准值小的元素摆放在基准前面，所有比基准值大的元素摆在基准后面（相同的数可以到任一边）。在这个分割结束之后，该基准就处于数列的中间位置。这个称为分割（partition）操作
3. 递归地把小于基准值元素的子数列和大于基准值元素的子数列排序

## JavaScript 实现

```js
/**
 * 快速排序实现
 * @param {Array} array - 待排序的数组
 * @returns {Array} 排序后的新数组
 */
function quickSort(array) {
  // 创建数组副本以避免修改原数组
  const sorted = [...array];
  
  /**
   * 分区函数
   * @param {Array} arr - 待分区数组
   * @param {number} low - 起始索引
   * @param {number} high - 结束索引
   * @returns {number} 基准元素的最终位置
   */
  function partition(arr, low, high) {
    // 选择最后一个元素作为基准
    const pivot = arr[high];
    let i = low - 1; // 较小元素的索引
    
    for (let j = low; j < high; j++) {
      // 如果当前元素小于或等于基准
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]]; // 交换元素
      }
    }
    
    // 将基准元素放到正确位置
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }
  
  /**
   * 快速排序递归函数
   * @param {Array} arr - 待排序数组
   * @param {number} low - 起始索引
   * @param {number} high - 结束索引
   */
  function quickSortRecursive(arr, low, high) {
    if (low < high) {
      // 获取分区索引
      const pi = partition(arr, low, high);
      
      // 分别对基准元素前后两部分进行排序
      quickSortRecursive(arr, low, pi - 1);
      quickSortRecursive(arr, pi + 1, high);
    }
  }
  
  // 调用递归排序函数
  quickSortRecursive(sorted, 0, sorted.length - 1);
  return sorted;
}

// 使用示例
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = quickSort(numbers);
console.log('原数组:', numbers);
console.log('排序后:', sortedNumbers);
```

## 算法特点

- **时间复杂度**:
  - 最坏情况: O(n²) (每次选的基准都是最大或最小元素)
  - 最好情况: O(n log n) (每次选的基准都是中位数)
  - 平均情况: O(n log n)
- **空间复杂度**: O(log n) (递归调用栈)
- **稳定性**: 不稳定排序 (相等元素的相对位置可能会改变)
- **适应性**: 不是适应性排序算法

## 优缺点

### 优点
1. 平均时间复杂度为O(n log n)，效率高
2. 原地排序，空间复杂度较低
3. 实际应用中通常比其他O(n log n)算法更快
4. 是一种分治算法，易于理解和实现

### 缺点
1. 最坏情况下时间复杂度为O(n²)
2. 不是稳定排序算法
3. 对于小规模数据，性能不如插入排序等简单算法
4. 性能依赖于基准元素的选择

## 应用场景

1. 大规模数据排序
2. 对平均性能有要求的场景
3. 内存使用受限的场景（原地排序）
4. 一般用途的排序需求

快速排序是实践中最常用的排序算法之一，大多数编程语言的内置排序函数都基于快速排序或其变种实现。