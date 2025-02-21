# fs 文件系统简介

`fs` 模块是 Node.js 中处理文件和目录的模块，它提供了文件系统操作的 API，包括文件的读取、写入、删除、重命名等操作。

## 同步异步

`fs` 模块支持同步和异步两种方式来执行文件系统操作，而异步又分为**回调**和 `promise` 两种方式。同步操作会阻塞代码的执行，直到操作完成，而异步操作则不会阻塞代码的执行，而是在操作完成后通过回调函数来处理结果。

因为一些历史原因，Node.js 中的文件系统才出现了三种使用方式。

- **同步方式**：最早加入，适合简单的、无需高并发的场景。
- **回调方式**：Node.js 的核心异步模型，早期就有，适合处理高并发 I/O 操作。
- **Promise 方式**：从 Node.js 10 开始引入，解决回调地狱问题，简化异步编程，特别适用于现代 JavaScript 编程风格。

下面以 `readFile` 方法做示例，展示这三种使用方式。

1. **同步方式**
  
    同步方法指的是函数会阻塞当前线程，直到操作完成后才会继续执行。这种方式简单直观，但它在处理 I/O 操作时，可能会导致应用的性能问题，尤其是在高并发或需要频繁执行 I/O 操作的场景下。

    ```js
    const data = fs.readFileSync('example.txt', 'utf8');
    console.log(data);
    ```

    适用场景：
    - 适合那些需要阻塞执行的场景，比如在程序启动时读取配置文件等，不需要关心性能的情况。
    - 主要用于简单脚本，或者不需要处理大量文件的场景。
  
2. **回调方式**
   
    回调方法是 Node.js 提倡的非阻塞式 I/O 操作方式，文件系统的操作会立即返回控制权，不会阻塞程序，操作完成后通过回调函数来处理结果。这种方式是 Node.js 异步编程模型的核心。

    ```js
    fs.readFile('example.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      console.log(data);
    });
    ```

    适用场景：
    - 适合处理大量文件或者高并发 I/O 操作的场景，避免阻塞主线程。
    - 比同步方式更能提升应用的响应速度和性能，尤其是服务器端应用。
  
3. **Promise 方式**
   
    Promise 方式是为了更好地处理异步操作而引入的，它比回调方式更易于理解和管理。回调地狱（callback hell）是 JavaScript 中常见的异步编程问题，使用 Promise 和 `async/await` 可以使代码更加简洁、可读。

    ```js
    async function readFile() {
      try {
        const data = await fs.readFile('example.txt', 'utf8');
        console.log(data);
      } catch (err) {
        console.error('Error reading file:', err);
      }
    }
    readFile();
    ```
    
    适用场景：
    - 当需要以同步的方式写异步代码时，`Promise` 是更好的选择，特别是在复杂的异步逻辑中。
    - 使用 `async/await` 可以让代码更接近同步方式，易于调试和维护。

## 导入

```js
const fs = require('node:fs');

// 同步的方法都带有 Sync 后缀
const data = fs.readFileSync('example.txt', 'utf8');

// 回调的方式
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log(data);
});

// Promise 有两种方式使用
fs.promises
// or
const fs_promises = require('node:fs/promises');
```
