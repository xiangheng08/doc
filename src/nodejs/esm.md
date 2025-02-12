# ESM 模块化

ESM（ECMAScript Modules）是 JavaScript 的官方模块化标准，旨在为 JavaScript 提供一种原生的、标准化的模块化机制。它通过 `import` 和 `export` 语法，使得代码更加模块化、可复用和易于维护。

## ESM 的基本语法

在 ESM 中，模块的导出和导入主要通过 `export` 和 `import` 关键字实现。

### 导出模块

1. **命名导出（Named Exports）**：

   ```javascript
   // module.js
   export const foo = 'Hello';
   export function bar() {
     console.log('This is bar');
   }
   ```

   或者：

   ```javascript
   // module.js
   const foo = 'Hello';
   function bar() {
     console.log('This is bar');
   }
   export { foo, bar };
   ```

2. **默认导出（Default Export）**：

   ```javascript
   // module.js
   export default function greet() {
     console.log('Hello, World!');
   }
   ```

### 导入模块

1. **导入命名导出**：

   ```javascript
   // main.js
   import { foo, bar } from './module.js';
   console.log(foo); // 输出 'Hello'
   bar(); // 输出 'This is bar'
   ```

2. **导入默认导出**：

   ```javascript
   // main.js
   import greet from './module.js';
   greet(); // 输出 'Hello, World!'
   ```

3. **导入整个模块**：

   ```javascript
   // main.js
   import * as module from './module.js';
   console.log(module.foo); // 输出 'Hello'
   module.bar(); // 输出 'This is bar'
   ```

## ESM 的特点与优势

- **原生支持**：ESM 是 JavaScript 标准的一部分，现代浏览器和 Node.js 都已原生支持 ESM。

- **静态分析和树摇优化**：ESM 支持静态分析，可以在编译时确定模块的依赖关系，识别哪些代码被引用，哪些没有被使用。这为树摇优化（Tree Shaking）提供了基础，减少了最终打包后的文件体积，提升了应用性能。

- **模块加载性能优化**：ESM 支持异步加载模块，浏览器可以根据需要按需加载模块，提高页面的加载性能。

- **支持顶级 await**：ESM 中的顶级 `await` 让我们可以在模块的顶层直接使用 `await` 进行异步操作，而不需要将其放入异步函数中。

**3. ESM 与 CommonJS 的区别**

- **导入导出语法**：CommonJS 使用 `module.exports` 和 `require`，而 ESM 使用 `export` 和 `import`。

- **加载方式**：CommonJS 模块是同步加载的，适用于服务器端；而 ESM 模块支持异步加载，更适合浏览器端。

- **动态导入**：CommonJS 可以通过 `require` 动态导入模块；而 ESM 的动态导入使用 `import()`，它返回一个 Promise，更加灵活。

- **模块缓存机制**：CommonJS 模块加载后会被缓存，而 ESM 模块默认不缓存，除非明确指定。

## 在浏览器中使用 ESM

现代浏览器对 ESM 提供了原生支持。要在浏览器中使用 ESM，只需要通过 `<script type="module">` 来引入模块：

```html
<script type="module" src="main.js"></script>
```

这种方式不仅能加载 ESM，还可以利用浏览器的缓存机制，提高性能。

## 在 Node.js 中使用 ESM

在 Node.js 中使用 ESM 时，需要将文件扩展名改为 `.mjs`，或者在 `package.json` 中指定 `"type": "module"`。这样 Node.js 就会将文件当作 ESM 进行处理。

```json
// package.json
{
  "type": "module"
}
```

然后，我们可以直接在 Node.js 中使用 `import` 和 `export`：

```javascript
// main.mjs
import { foo } from './module.mjs';
console.log(foo);
```

## 动态导入

ESM 支持动态导入，可以在运行时按需加载模块：

```javascript
// main.js
if (condition) {
  import('./module.js').then((module) => {
    // 使用 module
  });
}
```

动态导入返回一个 Promise，可以在需要时加载模块，优化性能。

