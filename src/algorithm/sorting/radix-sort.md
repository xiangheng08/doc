# 基数排序

基数排序（Radix Sort）是一种非比较型整数排序算法，其原理是将整数按位数切割成不同的数字，然后按每个位数分别比较。由于整数也可以表达字符串（比如名字或大型整数），所以可以使用基数排序来排序字符串。

## 算法原理

基数排序的基本思想是：
1. 将所有待比较数值统一为同样的数位长度，数位较短的数前面补零
2. 从最低位开始，依次进行一次排序
3. 这样从最低位排序一直到最高位排序完成以后，数列就变成一个有序序列

基数排序可以采用最低位优先（LSD）或最高位优先（MSD）策略：
- LSD Radix Sort：从最低位开始排序
- MSD Radix Sort：从最高位开始排序

## JavaScript 实现

```js
/**
 * 基数排序实现（LSD最低位优先）
 * @param {Array} array - 待排序的非负整数数组
 * @returns {Array} 排序后的新数组
 */
function radixSort(array) {
  if (array.length === 0) return [];
  
  // 创建数组副本以避免修改原数组
  const sorted = [...array];
  
  // 找到最大值，确定最大位数
  const max = Math.max(...sorted);
  
  // 从个位开始，对每一位进行计数排序
  let exp = 1; // 当前位数（1表示个位，10表示十位，以此类推）
  while (Math.floor(max / exp) > 0) {
    countingSortByDigit(sorted, exp);
    exp *= 10;
  }
  
  return sorted;
}

/**
 * 对指定位数进行计数排序
 * @param {Array} array - 待排序的数组
 * @param {number} exp - 位数（1表示个位，10表示十位，以此类推）
 */
function countingSortByDigit(array, exp) {
  const n = array.length;
  const output = new Array(n); // 输出数组
  const count = new Array(10).fill(0); // 计数数组，0-9共10个数字
  
  // 统计每个数字出现的次数
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(array[i] / exp) % 10;
    count[digit]++;
  }
  
  // 将计数数组转换为实际位置
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // 构建输出数组（反向遍历保证稳定性）
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(array[i] / exp) % 10;
    output[count[digit] - 1] = array[i];
    count[digit]--;
  }
  
  // 将排序结果复制回原数组
  for (let i = 0; i < n; i++) {
    array[i] = output[i];
  }
}

// 使用示例
const numbers = [170, 45, 75, 90, 2, 802, 24, 66];
const sortedNumbers = radixSort(numbers);
console.log('原数组:', numbers);
console.log('排序后:', sortedNumbers);

// 处理包含0的数组
const numbersWithZero = [0, 123, 45, 789, 12, 34, 567, 0];
const sortedWithZero = radixSort(numbersWithZero);
console.log('原数组(含0):', numbersWithZero);
console.log('排序后:', sortedWithZero);
```

## 算法特点

- **时间复杂度**: O(d × (n + k))
  - d: 最大数的位数
  - n: 元素个数
  - k: 基数（对于十进制数k=10）
- **空间复杂度**: O(n + k)，需要额外的存储空间
- **稳定性**: 稳定排序 (使用稳定的子排序算法)
- **适应性**: 不是适应性排序算法

## 优缺点

### 优点
1. 时间复杂度可以达到线性时间O(n)
2. 是稳定排序算法
3. 不需要比较操作
4. 适用于位数较少的整数排序

### 缺点
1. 只适用于整数或可以转换为整数的数据
2. 需要额外的存储空间
3. 对于位数很多的数据效率不高
4. 需要知道数据的范围和位数

## 应用场景

1. 整数排序，特别是位数较少的整数
2. 字符串排序（按字典序）
3. 数据范围已知且相对固定的排序场景
4. 需要稳定排序的整数数据

基数排序是一种高效的非比较排序算法，特别适用于位数较少的整数排序场景。在实际应用中，常用于数据结构中的特殊排序需求。