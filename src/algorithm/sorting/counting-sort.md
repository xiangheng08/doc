# 计数排序

计数排序（Counting Sort）是一种非比较排序算法，它通过确定每个元素之前有多少个元素来确定元素的位置。这种排序算法不是基于元素比较，而是利用数组下标来确定元素的正确位置。

## 算法原理

计数排序的基本思想是：
1. 找出待排序数组中的最大值和最小值，确定计数数组的范围
2. 统计每个值出现的次数，将统计结果存储在计数数组中
3. 对计数数组进行累加，确定每个元素在输出数组中的位置
4. 反向填充目标数组，根据计数数组的信息将元素放到正确位置

## JavaScript 实现

```js
/**
 * 计数排序实现
 * @param {Array} array - 待排序的数组（非负整数）
 * @returns {Array} 排序后的新数组
 */
function countingSort(array) {
  if (array.length === 0) return [];
  
  // 找到最大值和最小值
  const max = Math.max(...array);
  const min = Math.min(...array);
  
  // 计算计数数组的长度
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  
  // 统计每个元素出现的次数
  for (let i = 0; i < array.length; i++) {
    count[array[i] - min]++;
  }
  
  // 根据计数数组重构排序后的数组
  const sorted = [];
  for (let i = 0; i < range; i++) {
    while (count[i] > 0) {
      sorted.push(i + min);
      count[i]--;
    }
  }
  
  return sorted;
}

// 使用示例
const numbers = [4, 2, 2, 8, 3, 3, 1];
const sortedNumbers = countingSort(numbers);
console.log('原数组:', numbers);
console.log('排序后:', sortedNumbers);

// 处理包含负数的数组
const numbersWithNegative = [4, -2, 2, -8, 3, 3, 1];
const sortedWithNegative = countingSort(numbersWithNegative);
console.log('原数组(含负数):', numbersWithNegative);
console.log('排序后:', sortedWithNegative);
```

## 算法特点

- **时间复杂度**:
  - 最坏情况: O(n + k)，其中n是元素个数，k是数据范围
  - 最好情况: O(n + k)
  - 平均情况: O(n + k)
- **空间复杂度**: O(k)，需要额外的计数数组
- **稳定性**: 稳定排序 (相等元素的相对位置不会改变)
- **适应性**: 不是适应性排序算法

## 优缺点

### 优点
1. 时间复杂度低，为O(n + k)
2. 是稳定排序算法
3. 不需要元素间的比较操作
4. 对一定范围内的整数排序效率很高

### 缺点
1. 不是基于比较的排序算法，适用范围有限
2. 需要额外的存储空间O(k)
3. 当数据范围k远大于元素个数n时，空间浪费严重
4. 只适用于整数排序或可以映射为整数的数据

## 应用场景

1. 数据范围较小的整数排序
2. 计分排名系统
3. 桶排序的子程序
4. 基数排序的子程序
5. 需要稳定排序的整数数据

计数排序是一种高效的非比较排序算法，特别适用于数据范围较小的整数排序场景。