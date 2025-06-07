# 代码块图标

前几天在逛 Vitepress 的官方文档时，发现一个插件 [vitepress-plugin-group-icons](https://github.com/yuyinws/vitepress-plugin-group-icons)，这个插件可以让你在代码块头部使用图标。

像下面这样：

::: code-group

```sh [npm]
npm install vitepress-plugin-group-icons
```

```sh [yarn]
yarn add vitepress-plugin-group-icons
```

```sh [pnpm]
pnpm add vitepress-plugin-group-icons
```

```sh [bun]
bun add vitepress-plugin-group-icons
```

:::

代码如下：

`````md
::: code-group

```sh [npm]
npm install vitepress-plugin-group-icons
```

```sh [yarn]
yarn add vitepress-plugin-group-icons
```

```sh [pnpm]
pnpm add vitepress-plugin-group-icons
```

```sh [bun]
bun add vitepress-plugin-group-icons
```

:::
`````

使用：

```ts [.vitepress/config.ts]
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

export default defineConfig({
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin()
    ],
  }
})
```

```ts [.vitepress/theme/index.ts]
import Theme from 'vitepress/theme'
import 'virtual:group-icons.css'

export default Theme
```


