# 堆排序

堆排序（Heap Sort）是一种基于堆数据结构的比较排序算法。堆是一个近似完全二叉树的结构，并同时满足堆的性质：即子节点的键值或索引总是小于（或者大于）它的父节点。

## 算法原理

堆排序的基本思想是：
1. 将待排序序列构造成一个大顶堆（升序排列）或小顶堆（降序排列）
2. 此时整个序列的最大值（大顶堆）或最小值（小顶堆）就是堆顶元素
3. 将堆顶元素与末尾元素交换，此时末尾就是最大（或最小）元素
4. 重新调整堆结构，使其满足堆性质
5. 重复步骤3-4，直到整个序列有序

## JavaScript 实现

```js
/**
 * 调整堆结构，使其满足大顶堆性质
 * @param {Array} array - 数组
 * @param {number} n - 堆大小
 * @param {number} i - 需要调整的节点索引
 */
function heapify(array, n, i) {
  let largest = i; // 初始化最大值为根节点
  const left = 2 * i + 1;  // 左子节点
  const right = 2 * i + 2; // 右子节点
  
  // 如果左子节点存在且大于根节点
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }
  
  // 如果右子节点存在且大于当前最大值
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }
  
  // 如果最大值不是根节点
  if (largest !== i) {
    // 交换
    [array[i], array[largest]] = [array[largest], array[i]];
    
    // 递归调整受影响的子树
    heapify(array, n, largest);
  }
}

/**
 * 堆排序实现
 * @param {Array} array - 待排序的数组
 * @returns {Array} 排序后的新数组
 */
function heapSort(array) {
  // 创建数组副本以避免修改原数组
  const sorted = [...array];
  const n = sorted.length;
  
  // 构建大顶堆（从最后一个非叶子节点开始）
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(sorted, n, i);
  }
  
  // 逐个从堆顶取出元素
  for (let i = n - 1; i > 0; i--) {
    // 将当前最大元素（堆顶）移到数组末尾
    [sorted[0], sorted[i]] = [sorted[i], sorted[0]];
    
    // 重新调整堆结构
    heapify(sorted, i, 0);
  }
  
  return sorted;
}

// 使用示例
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = heapSort(numbers);
console.log('原数组:', numbers);
console.log('排序后:', sortedNumbers);
```

## 算法特点

- **时间复杂度**:
  - 最坏情况: O(n log n)
  - 最好情况: O(n log n)
  - 平均情况: O(n log n)
- **空间复杂度**: O(1) (原地排序)
- **稳定性**: 不稳定排序 (相等元素的相对位置可能会改变)
- **适应性**: 不是适应性排序算法

## 优缺点

### 优点
1. 时间复杂度稳定，无论什么情况都是O(n log n)
2. 是原地排序算法，空间复杂度为O(1)
3. 不受输入数据分布影响，性能可预测
4. 对大规模数据表现良好

### 缺点
1. 不是稳定排序算法
2. 常数因子较大，实际运行时间可能比快速排序慢
3. 对缓存不友好，局部性较差
4. 实现相对复杂

## 应用场景

1. 大规模数据排序
2. 对时间复杂度有稳定要求的场景
3. 内存使用受限的场景（原地排序）
4. 优先队列的实现

堆排序是一种高效的排序算法，尤其适用于大规模数据的排序，其时间复杂度在任何情况下都稳定为O(n log n)。