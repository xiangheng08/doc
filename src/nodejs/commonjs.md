# CommonJS 模块化

CommonJS 是 Node.js 默认使用的模块化规范，它定义了模块的特性和各模块之间如何相互依赖。

## 概述

模块化是将程序文件依据一定规则拆分成多个文件的编码方式，每个文件就是一个模块，模块中的数据都是私有的，模块之间相互隔离。同时，也能通过一些手段，将模块内的指定数据“交出去”，供其他模块使用。

## 为什么需要模块化？

随着应用的复杂度越来越高，其代码量和文件数量都会急剧增加，会逐渐引发以下问题：

- **全局污染问题**：变量和函数可能会覆盖全局作用域，导致命名冲突。

- **依赖混乱问题**：模块之间的依赖关系不明确，维护困难。

- **数据安全问题**：模块内部的数据可能被外部直接访问和修改，导致数据不安全。

## CommonJS 规范

在 CommonJS 规范中，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。CommonJS 使用 `module.exports` 或 `exports` 导出模块，使用 `require` 导入模块。

## 导出模块

在 CommonJS 标准中，导出数据有两种方式：

1. **使用 `module.exports` 导出**：

   ```js
   // math.js
   function add(a, b) {
     return a + b;
   }
   function subtract(a, b) {
     return a - b;
   }
   module.exports = { add, subtract };
   ```

2. **使用 `exports` 导出**：

   ```js
   // math.js
   function add(a, b) {
     return a + b;
   }
   function subtract(a, b) {
     return a - b;
   }
   exports.add = add;
   exports.subtract = subtract;
   ```
   
**注意事项**：

`exports` 是 `module.exports` 二者指向同一个对象。而最终导出的是 `module.exports`，如果直接给 `exports` 赋值，会导致 `exports` 和 `module.exports` 不再指向同一个对象，从而导出失败。

## 导入模块

在 CommonJS 模块化标准中，使用内置的 `require` 函数进行导入：

```js
const math = require('./math');
```

## 模块缓存机制

CommonJS 模块是单例模式，意味着每个模块在第一次加载后会被缓存，后续的加载将直接返回缓存中的实例。这有助于提高性能，避免重复加载。

## CommonJS 与 ES6 模块化的区别

- **导入导出语法**：CommonJS 使用 `module.exports` 和 `require`，而 ES6 模块使用 `export` 和 `import`。

- **加载方式**：CommonJS 模块是同步加载的，适用于服务器端；而 ES6 模块支持异步加载，更适合浏览器端。

- **动态导入**：CommonJS 可以通过 `require` 动态导入模块；而 ES6 模块的动态导入使用 `import()`，它返回一个 Promise，更加灵活。

- **模块缓存机制**：CommonJS 模块加载后会被缓存，而 ES6 模块默认不缓存，除非明确指定。
