# 在 Vitepress 遇到的问题

## 构建时：document is not defined

在 Vitepress 文档中 [SSR 兼容性](https://vitepress.dev/zh/guide/ssr-compat)一文中有说，“VitePress 能够在生产构建期间在 Node.js 中预渲染应用程序。这意味着主题组件中的所有自定义代码都需要考虑 SSR 兼容性。”

这意味着在 Vitepress 中使用的组件，都需要考虑 SSR 兼容性。

如果你的组件不支持或者不能不支持 SSR，那么可以在使用时用 [`<ClientOnly>`](https://vitepress.dev/zh/guide/ssr-compat#clientonly) 包裹组件。

```md
<ClientOnly>
  <NonSSRFriendlyComponent />
</ClientOnly>
```

上面的情况适用于组件，如果要在 `.vitepress/theme/index.ts` 使用 `document` 可以通过 [`globalThis`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis) 获取 `document`


```js
// 通过 globalThis 获取 document 对象
const _document = globalThis.document;

// 使用可选链运算符判断
_document?.getElementById('app');

// 或者单独判断
if (_document) {
	_document.getElementById('app');
}
```

[可选链运算符 MDN 地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

## 构建时：`TypeError [ERR_UNKNOWN_FILE_EXTENSION]`

如果在构建时出现下面这样的错误：

```sh
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".css" for xxx\node_modules\element-plus\theme-chalk\el-message.css
    at Object.getFileProtocolModuleFormat [as file:] (node:internal/modules/esm/get_format:176:9)
    at defaultGetFormat (node:internal/modules/esm/get_format:219:36)
    at defaultLoad (node:internal/modules/esm/load:143:22)
    at async ModuleLoader.load (node:internal/modules/esm/loader:555:7)
    at async ModuleLoader.moduleProvider (node:internal/modules/esm/loader:434:45) {
  code: 'ERR_UNKNOWN_FILE_EXTENSION'
}
```

那么大概率就是 element-plus 不支持 SSR 导致的，把 element-plus 排除就好了

```ts [.vitepress/config.ts]
export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['element-plus'],
    },
  },
})
```

参考 [#2915](https://github.com/vuejs/vitepress/issues/2915)

