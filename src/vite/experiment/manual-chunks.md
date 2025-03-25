# 手动分包

在 `vite.config.{ts,js}` 中 `build.rollupOptions.output.manualChunks` 配置手动分包。因为 vite 是依赖 rollup 的，所以直接看 [rollup](https://cn.rollupjs.org/configuration-options/#output-manualchunks) 的文档就好了。


## 概念

- 包（Chunk）<br>
  Rollup 最终生成的独立文件称为 "chunk"。一个 chunk 可以包含多个模块（如 JavaScript 文件、第三方库等），它是打包过程的产物。
- 分包（Code Splitting）<br>
  将代码拆分成多个独立的 chunk，使得：
  - 浏览器可以并行加载多个 chunk，提升加载速度。
  - 公共代码（如第三方库）可抽离成共享 chunk，减少重复代码。
  - 按需加载（如路由懒加载），减少首屏加载时间。

## `manualChunks` 的作用

默认情况下，Rollup 的自动分包策略是基于**动态导入**（`import()`）的。但如果你需要更细粒度的控制（例如将某些特定模块强制打包到一起），就需要使用 `manualChunks`。

## `manualChunks` 的使用方式

`manualChunks` 可以是一个 `Record<string, string[]>` 对象，也可以是一个函数。

```js
({
	manualChunks: {
    // 包名: ['模块1', '模块2']
    // 将所有 lodash 模块打包到 lodash.js 中
		lodash: ['lodash']
	}
});
```

```js
function manualChunks(id) {
  // 将所有 node_modules 中的文件，打包到 vendor.js 中
	if (id.includes('node_modules')) {
		return 'vendor';
	}

	return null;
}
```

以上都是官方的例子

## 注意事项

- 避免循环依赖：手动分包可能导致 chunk 之间的循环依赖，需确保代码逻辑合理。
- 合理控制 chunk 数量：过多的 chunk 会增加 HTTP 请求数量，可能降低性能。
- 公共模块处理：如果多个 chunk 依赖同一模块，Rollup 默认会将该模块提升到父级 chunk 中。可通过 `output.inlineDynamicImports` 调整行为。
- 与动态导入结合：`manualChunks` 可以与动态导入（`import()`）配合使用，实现更灵活的按需加载。

## 最佳实践

- 第三方库分离：将 `react`、`lodash` 等打包到 `vendor.js`，利用浏览器缓存，减少服务器压力。
- 按路由分包：在 SPA 中，为每个路由生成一个 chunk，实现懒加载。
- 公共工具库分离：将项目内公共工具函数打包到 `utils.js`
