# 问题

## 自动导入样式丢失

[按需导入](https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)里面有自动导入的配置，但是配置之后，像`Message`这类函数调用的组件样式丢失了。

```vue
<template>
  <el-button :plain="true" @click="open2">Success</el-button>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'; // [!code --]

const open1 = () => {
  ElMessage('This is a message.');
};
</script>
```

需要的去除 `ElMessage` 的导入，如果你没有使用 `ts` 到这步就好了，`ts` 的话还需要配置 `tsconfig.json` 的 `include`，加入 `auto-imports.d.ts` 和 `components.d.ts`。

```json
// tsconfig.json
{
  // ...
  "include": [
    "env.d.ts",
    "src/**/*",
    "src/**/*.vue",
    "auto-imports.d.ts", // [!code ++]
    "components.d.ts" // [!code ++]
  ]
}
```

## 获取组件类型

```ts
import type { ElAvatar } from 'element-plus';

const avatarRef = ref<InstanceType<typeof ElAvatar>>();
```

用了自动导入的话，一定要使用 `import type` 导入，防止和自动导入冲突。
