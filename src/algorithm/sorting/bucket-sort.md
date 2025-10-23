# 桶排序

桶排序（Bucket Sort）是一种排序算法，它将数组分到有限数量的桶里。每个桶再个别排序（可能使用不同的排序算法或是以递归方式继续使用桶排序）。桶排序是鸽巢排序的一种归纳。

## 算法原理

桶排序的基本思想是：
1. 设置一个定量的数组当作空桶
2. 遍历输入数据，并且把数据一个一个放到对应的桶里
3. 对每个不是空的桶进行排序（可以使用其他排序算法）
4. 从不是空的桶里把排好序的数据拼接起来

## JavaScript 实现

```js
/**
 * 桶排序实现
 * @param {Array} array - 待排序的数组
 * @param {number} bucketSize - 桶的数量，默认为5
 * @returns {Array} 排序后的新数组
 */
function bucketSort(array, bucketSize = 5) {
  if (array.length === 0) return [];
  
  // 找到最大值和最小值
  const min = Math.min(...array);
  const max = Math.max(...array);
  
  // 计算桶的数量
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  
  // 创建桶
  const buckets = new Array(bucketCount);
  for (let i = 0; i < bucketCount; i++) {
    buckets[i] = [];
  }
  
  // 将元素分配到各个桶中
  for (let i = 0; i < array.length; i++) {
    const bucketIndex = Math.floor((array[i] - min) / bucketSize);
    buckets[bucketIndex].push(array[i]);
  }
  
  // 对每个桶进行排序并合并结果
  const sorted = [];
  for (let i = 0; i < bucketCount; i++) {
    if (buckets[i].length > 0) {
      // 对桶内元素进行排序（这里使用插入排序）
      insertionSort(buckets[i]);
      // 将排序后的桶合并到结果数组中
      sorted.push(...buckets[i]);
    }
  }
  
  return sorted;
}

/**
 * 插入排序辅助函数
 * @param {Array} array - 待排序的数组
 */
function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    const current = array[i];
    let j = i - 1;
    
    while (j >= 0 && array[j] > current) {
      array[j + 1] = array[j];
      j--;
    }
    
    array[j + 1] = current;
  }
}

// 使用示例
const numbers = [64, 34, 25, 12, 22, 11, 90, 5];
const sortedNumbers = bucketSort(numbers);
console.log('原数组:', numbers);
console.log('排序后:', sortedNumbers);

// 浮点数排序示例
const floatNumbers = [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51];
const sortedFloats = bucketSort(floatNumbers);
console.log('原浮点数组:', floatNumbers);
console.log('排序后:', sortedFloats);
```

## 算法特点

- **时间复杂度**:
  - 最坏情况: O(n²) (所有元素都分配到同一个桶中)
  - 最好情况: O(n + k) (元素均匀分布到各个桶中)
  - 平均情况: O(n + n²/k + k)，当k接近n时为O(n)
- **空间复杂度**: O(n + k)，需要额外的桶存储空间
- **稳定性**: 稳定排序 (如果桶内排序算法是稳定的)
- **适应性**: 不是适应性排序算法

## 优缺点

### 优点
1. 时间复杂度在均匀分布的数据下可以达到线性时间
2. 是稳定排序算法（取决于桶内排序算法）
3. 是外部排序的一种形式，适用于大数据集
4. 可以并行化处理，每个桶可以独立排序

### 缺点
1. 需要额外的空间来存储桶
2. 对输入数据的分布敏感，最坏情况下效率较低
3. 需要确定合适的桶数量和映射函数
4. 不适合数据范围很大或分布不均匀的情况

## 应用场景

1. 数据分布相对均匀的排序场景
2. 浮点数排序
3. 外部排序（处理大量数据）
4. 需要并行处理的排序任务
5. 数据范围已知且相对集中的情况

桶排序是一种高效的排序算法，特别适用于数据分布均匀且范围已知的情况。在实际应用中，通常与其他排序算法结合使用。