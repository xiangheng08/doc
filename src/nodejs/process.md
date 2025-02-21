# process 进程

`process` 对象提供有关当前 Node.js 进程的信息并对其进行控制。作为全局对象，无需使用引入。

当然也可以从 `node:process` 或 `process` 模块中引入。

下面是一些常用的属性、方法和事件。更多请参考 [Node.js 文档](https://nodejs.org/api/process.html) 或者 [Node.js 中文文档](https://nodejs.cn/api/v22/process.html)（注意版本）。

## process 属性

### `process.argv`

一个数组，包含命令行启动 Node.js 进程时的所有参数

- `process.argv[0]` 是 Node.js 可执行文件的路径
- `process.argv[1]` 是正在执行的 js 文件的路径
- 之后的元素是传递给 Node.js 进程的命令行参数

```js
process.argv // ['/usr/local/bin/node', '/Users/xxx/Desktop/test.js', 'hello', 'world']
```

### `process.argv0`

`process.argv0` 属性存储了 Node.js 启动时传入的 `argv[0]` 原始值的只读副本。

### `process.env`

一个包含用户环境变量的对象，允许你读取或修改环境变量。

```js
console.log(process.env.NODE_ENV); // 'development'
```

### `process.exitCode`

进程的退出码。可以在进程结束时设置自定义的退出码，默认是 `0`。如果设置非 `0` 值，则表示进程异常退出。

### `process.pid`

当前进程的 PID。

### `process.ppid`

当前进程的父进程的 PID。

### `process.platform`

当前操作系统平台的字符串。常见的值有 `linux`, `win32`, `darwin` (macOS) 等。

### `process.version`

当前 Node.js 的版本号。

## process 方法

### `process.cwd()`

返回当前工作目录。

```js
process.cwd(); // '/Users/xxx/Desktop'
```

### `process.chdir(directory)`

改变当前工作目录，如果操作失败则抛出异常。

```js
process.chdir('/Users/xxx/Desktop');
```

### `process.exit([code])`

终止当前进程。`code` 是退出码，默认是 `0`。

```js
process.exit(1);
```

### `process.nextTick(callback[, ...args])`

将 `callback` 添加到下一个事件循环的队列中，在当前操作完成后执行。

```js
process.nextTick(() => {
  console.log('nextTick');
});
console.log('current');
// current
// nextTick
```

### `process.hrtime([time])`

返回当前高精度时间，单位是秒和纳秒。如果提供了 `time`，则返回自 `time` 以来经过的时间。常用于性能测试。

```js
const start = process.hrtime();
// ... do something ...
const end = process.hrtime(start);
console.log(end); // [0, 123456789]
```

### `process.kill(pid[, signal])`

向指定进程发送信号。`pid` 是进程的 PID，`signal` 是信号类型，默认是 `SIGTERM`。

```js
process.kill(12345, 'SIGTERM');
```

### `process.memoryUsage()`

返回一个对象，包含 Node.js 进程的内存使用情况。

```js
const used = process.memoryUsage();
// {
//   rss: 37068800, // 常驻内存
//   heapTotal: 18268160, // V8 堆的总内存
//   heapUsed: 13724528, // V8 堆已用内存
//   external: 6768 // C++ 对象的外部内存
// }
```

### `process.uptime()`

返回 Node.js 进程已运行的时间（秒）。

```js
console.log(process.uptime()); // 123.456
```

## process 事件

### `process.on('exit', callback)`

当 Node.js 进程即将退出时触发。这个事件在事件循环结束后发生，无法阻止进程退出。可以用来执行清理等收尾工作。

```js
process.on('exit', (code) => {
  console.log('Process is exiting with code:', code);
});
```

### `process.on('beforeExit', callback)`

当 Node.js 进程即将退出时触发，但事件循环仍然在运行。可以用来执行清理等收尾工作。

```js
process.on('beforeExit', (code) => {
  console.log('Process is about to exit with code:', code);
});
```

### `process.on('uncaughtException', callback)`

当发生未捕获的异常时触发，可以用来处理未捕获的错误，但不推荐用于生产环境中（因为可能导致进程不稳定）。

```js
process.on('uncaughtException', (err) => {
  console.error('An uncaught exception occurred:', err);
  // process.exit(1); // 退出进程
});
```

### `process.on('SIGINT', callback)`

当接收到 `SIGINT` 信号时触发，通常是在用户按下 `Ctrl+C` 时发送的。

```js
process.on('SIGINT', () => {
  console.log('Received SIGINT signal.');
  // process.exit(0); // 退出进程
});
```

### `process.on('SIGTERM', callback)`

当接收到 `SIGTERM` 信号时触发，通常是在系统或进程管理器要求进程终止时发送的。

```js
process.on('SIGTERM', () => {
  console.log('Received SIGTERM signal.');
  // process.exit(0); // 退出进程
});
```
### `process.on('warning', callback)`

当 Node.js 进程触发一个警告时触发。警告可能是由于内存泄漏、不当使用 API 等引起的。 

```js
process.on('warning', (warning) => {
  console.warn(warning.name); // 'Warning'
  console.warn(warning.message); // 'This is a warning message'
  console.warn(warning.stack); // 'Warning: This is a warning message\n    at Object.<anonymous> (/Users/xxx/Desktop/test.js:3:9)'
});
```
