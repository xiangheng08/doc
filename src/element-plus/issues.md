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

## el-table 设置 fixed 后，有 1px 的滚动

```css
.el-table .el-table-fixed-column--right.is-first-column::before {
  bottom: 0px;
}
```

## el-table 表头粘性滚动

[参考文章](https://juejin.cn/post/7344881744246800421)

对于长表格，如果想要固定表头，需要采用指定高度的方式，但如果有多个长表格，采用固定高度的方式显然不合适。

[@planckdev/element-plus](https://www.npmjs.com/package/@planckdev/element-plus) 已经内置了粘性滚动指令，只需要在 `el-table` 上添加对应指令即可。


安装
```bash
npm install @planckdev/element-plus
```

注册指令
```js
import { StickyTable } from '@planckdev/element-plus/directives'
const app = createApp(App)
app.directive('StickyElTable', StickyTable)
```

使用
```vue
<el-table v-sticky-el-table></el-table>
```

指令还可接收一个配置对象

```ts
interface StickyTableOptions {
  /**
   * 是否启用
   *
   * 默认为true，启用
   */
  enable?: boolean;
  /**
   * 粘性定位顶部距离
   * 默认为0px，可设置为其他值，例如：20px、20vh
   */
  top?: string;
}
```



