# 归并排序

归并排序（Merge Sort）是一种基于分治思想的稳定排序算法。它将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为二路归并。

## 算法原理

归并排序的基本思想是：
1. 分解：将待排序序列不断二分，直到每个子序列只有一个元素
2. 解决：对每个只有一个元素的子序列，认为其已经有序
3. 合并：将两个已排序的子序列合并成一个有序序列
4. 递归地执行上述过程，直到整个序列有序

## JavaScript 实现

```js
/**
 * 合并两个已排序的数组
 * @param {Array} left - 左侧已排序数组
 * @param {Array} right - 右侧已排序数组
 * @returns {Array} 合并后的已排序数组
 */
function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // 比较两个数组的元素，将较小的元素放入结果数组
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // 将剩余元素添加到结果数组
  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }
  
  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }
  
  return result;
}

/**
 * 归并排序实现
 * @param {Array} array - 待排序的数组
 * @returns {Array} 排序后的新数组
 */
function mergeSort(array) {
  // 基线条件：数组长度小于等于1时，认为已经有序
  if (array.length <= 1) {
    return array;
  }
  
  // 分解：将数组分为两部分
  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);
  
  // 递归排序左右两部分，然后合并
  return merge(mergeSort(left), mergeSort(right));
}

// 使用示例
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = mergeSort(numbers);
console.log('原数组:', numbers);
console.log('排序后:', sortedNumbers);
```

## 算法特点

- **时间复杂度**:
  - 最坏情况: O(n log n)
  - 最好情况: O(n log n)
  - 平均情况: O(n log n)
- **空间复杂度**: O(n) (需要额外的存储空间)
- **稳定性**: 稳定排序 (相等元素的相对位置不会改变)
- **适应性**: 不是适应性排序算法

## 优缺点

### 优点
1. 时间复杂度稳定，无论什么情况都是O(n log n)
2. 是稳定排序算法
3. 性能可预测，不受输入数据分布影响
4. 可以用于外部排序（处理大量数据）

### 缺点
1. 需要额外的存储空间O(n)
2. 对于小规模数据，性能不如插入排序等简单算法
3. 不是原地排序算法

## 应用场景

1. 对稳定性有要求的排序场景
2. 大规模数据排序
3. 外部排序（数据量超过内存容量）
4. 对时间复杂度有稳定要求的场景

归并排序是一种高效的、稳定的排序算法，在需要稳定排序或处理大规模数据时具有明显优势。