# usePaging

`usePaging` 是一个用于处理分页数据的通用钩子，它提供了分页数据的获取、重置、刷新等功能。该钩子特别适用于需要分页加载数据的场景，例如表格、列表等。

通过 `usePaging`，你可以轻松管理分页状态，包括当前页码、每页数量、数据列表、加载状态等。它还支持追加模式和参数过滤，使得分页数据的处理更加灵活。


```vue
<template>
  <div>
    <ul>
      <li v-for="item in pager.list" :key="item.id">{{ item.name }}</li>
    </ul>
    <button @click="getList" :disabled="pager.loading">加载更多</button>
    <button @click="resetPage">重置页码</button>
    <button @click="resetParams">重置参数</button>
    <button @click="refresh">刷新</button>
  </div>
</template>

<script setup>
import { usePaging } from './paging';

const { pager, getList, resetPage, resetParams, refresh } = usePaging({
  fetchFu: fetchData,
  initialFetch: true,
});
</script>
```

代码：

<<< ./paging.ts
