# 起步

[Node.js](https://nodejs.org/zh-cn/) 是一个开源和跨平台的 JavaScript 运行时环境。

## `node:` 前缀

1. 使用和不使用 `node:` 前缀的区别
     - 不带 `node:`：是一种传统的模块导入方式，通常用于 CommonJS 模块系统（require）。它依赖于 Node.js 的模块解析机制，会先尝试查找本地模块（如项目中的 node_modules 文件夹），如果没有找到，才会加载内置模块。
     - 带 `node:`：是 Node.js 提供的一种显式导入内置模块的方式，明确告诉 Node.js 加载内置的 fs 模块，而不会尝试解析本地模块。这种方式在 ES 模块（ESM）中更为推荐，因为它避免了路径解析的歧义。
2. `node:` 前缀的引入时间
    `node:` 前缀是在 Node.js v12 中引入的，用于显式导入内置模块。它在后续版本中得到了广泛应用，尤其是在 ES 模块的支持下，`node:` 前缀能够更清晰地区分内置模块和第三方模块。
3. 使用建议
    - 如果你使用的是 **CommonJS** 模块系统（`require`），可以继续使用 `require('fs')`。
    - 如果你使用的是 **ES 模块**（`import`），建议使用 `import * as fs from 'node:fs'` 或 `import { readFile } from 'node:fs/promises'`，这样可以避免模块解析的歧义。

总结：`node:fs` 是一种更现代、更明确的模块导入方式，尤其适用于 ES 模块。Node 12+ 推荐使用。
