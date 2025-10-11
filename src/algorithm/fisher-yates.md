# Fisher-Yates 洗牌算法

Fisher-Yates 洗牌算法（也称为 Knuth 洗牌算法）是一种用于将有限序列随机重新排列的算法。该算法能够确保每个元素出现在每个位置的概率是相等的，从而实现真正的随机排序。

## 算法原理

Fisher-Yates 算法的核心思想是从数组的最后一个元素开始，每次随机选择一个元素与当前位置元素交换，然后移动到前一个位置，重复此过程直到到达数组的第一个元素。

算法步骤如下：
1. 从数组的最后一个元素开始（索引为 n-1）
2. 生成一个从 0 到当前索引的随机数 j
3. 将当前元素与索引为 j 的元素交换
4. 将当前索引减 1，重复步骤 2-4 直到索引为 0

## JavaScript 实现

```js
/**
 * 使用 Fisher-Yates 算法对数组进行随机洗牌
 * @param {Array} array - 需要洗牌的数组
 * @returns {Array} 洗牌后的新数组
 */
function fisherYatesShuffle(array) {
  // 创建数组副本以避免修改原数组
  const shuffled = [...array];
  
  // 从数组最后一个元素开始向前遍历
  for (let i = shuffled.length - 1; i > 0; i--) {
    // 生成一个 0 到 i 之间的随机索引
    const index = Math.floor(Math.random() * (i + 1));
    
    // 交换当前元素和随机选中的元素
    [shuffled[i], shuffled[index]] = [shuffled[index], shuffled[i]];
  }
  
  return shuffled;
}

// 使用示例
const cards = ['A', 'B', 'C', 'D', 'E'];
const shuffledCards = fisherYatesShuffle(cards);
console.log('原数组:', cards);
console.log('洗牌后:', shuffledCards);
```

## 算法特点

- **时间复杂度**: O(n)
- **空间复杂度**: O(n)（如果创建副本）或 O(1)（如果直接修改原数组）
- **公平性**: 每种排列出现的概率相等
- **效率**: 只需要一次遍历即可完成洗牌

## 应用场景

1. 扑克牌游戏中的洗牌
2. 随机抽奖系统
3. 音乐播放器的随机播放列表
4. A/B 测试中的用户分组
5. 问卷调查的题目随机排序

Fisher-Yates 算法因其高效性和公平性，成为实现数组随机排序的首选算法。
