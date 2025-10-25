# el-tree-select 树形选择展示完整路径

`el-tree-select` 组件在选择时，默认仅展示当前选中的节点。然而，有时我更希望能展示完整的路径，例如：`苹果/香蕉/橙子`。尽管在 `el-tree-select` 的官方文档中并未提供相关配置，但我们可以通过 `CSS` 的 `::before` 伪元素来实现这一效果。以下是具体实现代码：

```vue
<template>
  <div class="wrap" :style="{ '--pre-text': `'${preText}'` }">
    <el-tree-select v-model="value" :data="data" :render-after-expand="false" default-expand-all style="width: 240px" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';

const value = ref<any>('1-1-1');

const data = [
  {
    value: '1',
    label: '苹果',
    children: [
      {
        value: '1-1',
        label: '香蕉',
        children: [
          {
            value: '1-1-1',
            label: '橙子',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: '草莓',
    children: [
      {
        value: '2-1',
        label: '葡萄',
        children: [
          {
            value: '2-1-1',
            label: '樱桃',
          },
        ],
      },
      {
        value: '2-2',
        label: '菠萝',
        children: [
          {
            value: '2-2-1',
            label: '芒果',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: '梨',
    children: [
      {
        value: '3-1',
        label: '桃子',
        children: [
          {
            value: '3-1-1',
            label: '西瓜',
          },
        ],
      },
      {
        value: '3-2',
        label: '蓝莓',
        children: [
          {
            value: '3-2-1',
            label: '柠檬',
          },
        ],
      },
    ],
  },
];

const preText = ref('');
type Node = {
  value: string;
  label: string;
  children?: Node[];
};
const findNodePath = (nodeList: Node[], value: any) => {
  const path: Node[] = [];

  const dfs = (node: Node) => {
    path.push(node);

    if (node.value === value) {
      return true;
    }

    if (node.children) {
      for (const child of node.children) {
        if (dfs(child)) {
          return true;
        }
      }
    }

    path.pop();
    return false;
  };

  for (const node of nodeList) {
    if (dfs(node)) {
      return path;
    }
  }

  return path;
};

watchEffect(() => {
  if (value.value) {
    const path = findNodePath(data, value.value);
    const text =
      path
        .slice(0, -1)
        .map((node) => node.label)
        .join('/') + '/';
    if (preText.value !== text) {
      preText.value = text;
    }
  } else {
    preText.value = '';
  }
});
</script>

<style lang="css" scoped>
.wrap :deep(.el-select__placeholder::before) {
  content: var(--pre-text);
}
</style>
```

## 实现原理

1. 监听 `value` 变化  
   使用 `watchEffect` 监听 `value` 的变化，当用户选择新节点时，自动触发回调函数。

2. 路径查找  
   借助自定义的 `findNodePath` 函数，递归遍历树形数据，找到与 `value` 对应的节点路径。

3. 路径拼接并动态赋值  
   将路径中每个节点的 `label` 拼接为字符串（例如：`苹果/香蕉/`），并动态赋值给 `preText`。

4. 通过 `--pre-text` 实现占位符动态更新  
   将完整路径的字符串赋值给外部容器的 `--pre-text` 自定义属性，然后利用 CSS 的 `::before` 伪元素读取该属性的值 (`content: var(--pre-text)`)，从而动态显示完整路径作为占位符。

---

::: tip 
建议在 `el-tree-select` 外部包裹一个容器，并将 `--pre-text` 设置在这个容器上。通过该容器精确选中内部的 `el-tree-select`，可避免误选其他的 `el-tree-select` 实例。
:::

---

扩展：

可以将这部分实现封装为一个自定义指令或 `hook`，方便复用。

--- 

这样，完整路径展示的效果即可轻松实现！ 🎉
