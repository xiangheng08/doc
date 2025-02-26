# 模块化

模块化是现代 JavaScript 开发的核心概念，能够解决全局污染、依赖混乱和数据安全问题。Node.js 主要支持两种模块化规范：**CommonJS**（默认）和 **ESM**（ECMAScript Modules）。本文对比两者的特性，并提供实践指导。

## CommonJS 模块化
### 基本特性
- **同步加载**：适用于服务器端。
- **模块隔离**：每个文件是一个独立模块，变量私有。
- **缓存机制**：模块首次加载后会被缓存，后续加载直接复用。

### 导出模块
```js
// 方式1：module.exports
module.exports = { add, subtract };

// 方式2：exports（注意不要直接赋值）
exports.add = add;
```

### 导入模块
```js
const math = require('./math.js');
```

## ESM 模块化
### 基本特性
- **异步加载**：更适合浏览器端，支持按需加载。
- **静态分析**：支持 Tree Shaking 优化打包体积。
- **原生支持**：现代浏览器和 Node.js 均原生支持。

### 导出模块
```js
// 命名导出
export const foo = 'Hello';
export { foo, bar };

// 默认导出
export default function greet() { ... }
```

### 导入模块
```js
import { foo } from './module.mjs';      // 命名导入
import greet from './module.mjs';         // 默认导入
import * as module from './module.mjs';   // 整体导入
```

## ✅ 最佳实践
### 规范选择
- **Node.js 服务端**：优先 CommonJS（兼容性好）。
- **浏览器或现代 Node.js 项目**：使用 ESM（支持 Tree Shaking 和异步加载）。

### 导出方式
- **CommonJS**：推荐使用 `module.exports`，避免直接操作 `exports`。
- **ESM**：优先命名导出，减少默认导出的使用（便于静态分析）。

### 混合使用
- **ESM 中调用 CommonJS**：使用 `import` 直接导入。
  ```js
  import cjsModule from './commonjs-module.cjs';
  ```
- **CommonJS 中调用 ESM**：需使用动态 `import()`：
  ```js
  const esmModule = await import('./esm-module.mjs');
  ```

### 4. 动态加载优化
- 使用 ESM 的 `import()` 实现按需加载：
  ```js
  if (condition) {
    const module = await import('./module.mjs');
  }
  ```

## ⚠️ 常见问题
### 为什么 ESM 中不能使用 `require`？
ESM 是静态语法，`require` 是 CommonJS 的动态方法。在 ESM 文件中，需使用 `import` 或 `import()`。

### 模块缓存问题
- **CommonJS**：模块缓存可能导致旧数据被复用。可通过删除 `require.cache` 强制重新加载。
- **ESM**：默认无缓存，但可通过打包工具配置缓存策略。

### 循环依赖处理
- **CommonJS**：部分依赖可能为 `undefined`，需调整代码顺序。
- **ESM**：静态分析自动解决循环依赖，但仍需避免逻辑耦合。

### 导出对象陷阱
- **CommonJS**：直接赋值 `exports = {}` 会断开与 `module.exports` 的链接，导致导出失败。
- **ESM**：命名导出需保持引用一致性，避免运行时错误。

## 关键差异总结
| 特性             | CommonJS            | ESM                        |
| ---------------- | ------------------- | -------------------------- |
| **语法**         | `require`/`exports` | `import`/`export`          |
| **加载方式**     | 同步                | 异步                       |
| **动态导入**     | `require()`         | `import()`（返回 Promise） |
| **模块缓存**     | 默认缓存            | 无缓存（可配置）           |
| **顶级 `await`** | 不支持              | 支持                       |

## 环境配置
### 浏览器
```html
<script type="module" src="main.js"></script>
```

### Node.js
- **ESM**：设置 `package.json` 或使用 `.mjs` 扩展名：
  ```json
  { "type": "module" }
  ```
- **CommonJS**：默认支持 `.js` 或 `.cjs` 扩展名。
