# 希尔排序

希尔排序（Shell Sort）是一种改进的插入排序算法，也称为缩小增量排序。它通过将原始数组分割成若干个子序列来进行排序，每个子序列使用插入排序算法，随着算法的进行，增量逐渐减小，直到为1时，整个数组成为一个序列，进行最后一次插入排序。

## 算法原理

希尔排序的基本思想是：
1. 选择一个增量序列 t1, t2, ..., tk，其中 ti > tj, tk = 1
2. 按增量序列个数k，对序列进行k趟排序
3. 每趟排序，根据对应的增量ti，将待排序列分割成若干个长度为ti的子序列，分别对各子序列进行插入排序
4. 当增量因子为1时，整个序列作为一个表来处理，表长度即为整个序列的长度

## JavaScript 实现

```js
/**
 * 希尔排序实现
 * @param {Array} array - 待排序的数组
 * @returns {Array} 排序后的新数组
 */
function shellSort(array) {
  // 创建数组副本以避免修改原数组
  const sorted = [...array];
  const len = sorted.length;
  
  // 初始增量为数组长度的一半
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // 对各个子序列进行插入排序
    for (let i = gap; i < len; i++) {
      const current = sorted[i];
      let j = i;
      
      // 在子序列中进行插入排序
      while (j >= gap && sorted[j - gap] > current) {
        sorted[j] = sorted[j - gap];
        j -= gap;
      }
      
      sorted[j] = current;
    }
  }
  
  return sorted;
}

// 使用示例
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = shellSort(numbers);
console.log('原数组:', numbers);
console.log('排序后:', sortedNumbers);
```

## 算法特点

- **时间复杂度**:
  - 最坏情况: O(n²) (取决于增量序列的选择)
  - 最好情况: O(n log n)
  - 平均情况: O(n^1.3) (根据经验得出)
- **空间复杂度**: O(1) (原地排序)
- **稳定性**: 不稳定排序 (相等元素的相对位置可能会改变)
- **适应性**: 不是适应性排序算法

## 优缺点

### 优点
1. 是插入排序的改进版本，效率比简单插入排序高
2. 是原地排序算法
3. 实现相对简单
4. 对中等规模数据表现较好

### 缺点
1. 不是稳定排序算法
2. 时间复杂度依赖于增量序列的选择
3. 对大规模数据排序效率不如快速排序、归并排序等高级算法

## 应用场景

1. 中等规模数据排序
2. 对稳定性无要求的排序场景
3. 作为其他高效排序算法的补充

希尔排序通过改进插入排序，对中等规模的数据有较好的排序效率，是插入排序的一种更高效的改进版本。