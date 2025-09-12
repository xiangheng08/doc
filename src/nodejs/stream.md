# Stream 流

## 简介

Stream 是 Node.js 中处理流式数据的抽象接口。流可以是可读的、可写的，或者兼具两者。Stream 模块是 Node.js 中许多其他模块的基础，例如 HTTP 服务器请求和响应、文件读写、压缩和加密等。

流的主要优势是它们提供了一种"边读取边处理"的方式，这使得你可以处理大文件或网络数据而不会占用过多内存。

```js
const fs = require('fs');

// 不使用流的方式 - 一次性读取整个文件
fs.readFile('big-file.txt', (err, data) => {
  // 文件完全加载到内存中才能处理
});

// 使用流的方式 - 逐块处理数据
const readStream = fs.createReadStream('big-file.txt');
readStream.on('data', (chunk) => {
  // 逐块处理数据
  console.log(`Received ${chunk.length} bytes of data.`);
});
```

## 流的类型

Node.js 中有四种基本类型的流：

### 1. Readable (可读流)

可读流是对数据源的抽象，用于从数据源读取数据。

```js
const { Readable } = require('stream');

// 创建自定义可读流
const readable = new Readable({
  read(size) {
    // 生成数据的逻辑
    this.push('Hello ');
    this.push('World!');
    this.push(null); // 表示数据结束
  }
});

readable.on('data', (chunk) => {
  console.log(`Received: ${chunk}`);
});
```

### 2. Writable (可写流)

可写流是对数据目标的抽象，用于向数据目标写入数据。

```js
const { Writable } = require('stream');

// 创建自定义可写流
const writable = new Writable({
  write(chunk, encoding, callback) {
    console.log(`Writing: ${chunk}`);
    callback(); // 表示写入完成
  }
});

writable.write('Hello ');
writable.write('World!');
writable.end();
```

### 3. Duplex (双工流)

双工流既可读又可写，例如 TCP 套接字。

```js
const { Duplex } = require('stream');

const duplex = new Duplex({
  read(size) {
    this.push('Hello from Duplex');
    this.push(null);
  },
  write(chunk, encoding, callback) {
    console.log(`Received: ${chunk}`);
    callback();
  }
});

duplex.on('data', (chunk) => {
  console.log(`Reading: ${chunk}`);
});

duplex.write('Data to duplex');
```

### 4. Transform (转换流)

转换流是一种特殊的双工流，可以在写入和读取数据时修改或转换数据。

```js
const { Transform } = require('stream');

// 创建一个转换流，将数据转换为大写
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

upperCaseTransform.on('data', (chunk) => {
  console.log(`Transformed: ${chunk}`);
});

upperCaseTransform.write('hello world');
upperCaseTransform.end();
```

## 流的工作模式

### 流动模式 (Flowing Mode)

在流动模式下，数据会自动从底层系统读取并尽快发送给应用程序。

```js
const fs = require('fs');

const readStream = fs.createReadStream('file.txt');

// 添加 'data' 事件监听器会自动切换到流动模式
readStream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
});

readStream.on('end', () => {
  console.log('Finished reading data.');
});
```

### 暂停模式 (Paused Mode)

在暂停模式下，必须显式调用 `read()` 方法来读取数据。

```js
const fs = require('fs');

const readStream = fs.createReadStream('file.txt');

// 显式切换到暂停模式
readStream.pause();

readStream.on('readable', () => {
  let chunk;
  while (null !== (chunk = readStream.read())) {
    console.log(`Received ${chunk.length} bytes of data.`);
  }
});
```

## 流的事件

### 可读流事件

```js
const fs = require('fs');
const readStream = fs.createReadStream('file.txt');

// 'data' 事件 - 当有数据可读时触发
readStream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
});

// 'readable' 事件 - 当有数据可读时触发（适用于暂停模式）
readStream.on('readable', () => {
  console.log('There is data to read');
});

// 'end' 事件 - 当没有更多数据可读时触发
readStream.on('end', () => {
  console.log('Finished reading data.');
});

// 'error' 事件 - 当发生错误时触发
readStream.on('error', (err) => {
  console.error('An error occurred:', err);
});

// 'close' 事件 - 当流关闭时触发
readStream.on('close', () => {
  console.log('Stream closed.');
});
```

### 可写流事件

```js
const fs = require('fs');
const writeStream = fs.createWriteStream('output.txt');

// 'drain' 事件 - 当可写流可以接收更多数据时触发
writeStream.on('drain', () => {
  console.log('Write stream is ready to receive more data.');
});

// 'finish' 事件 - 当所有数据都被写入时触发
writeStream.on('finish', () => {
  console.log('All data has been written.');
});

// 'error' 事件 - 当发生错误时触发
writeStream.on('error', (err) => {
  console.error('An error occurred:', err);
});
```

## 管道操作

管道操作是流处理中最强大的功能之一，它允许你将一个流的输出连接到另一个流的输入。

```js
const fs = require('fs');

// 将文件内容从一个文件复制到另一个文件
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

// 链式管道
const zlib = require('zlib');
const gzip = zlib.createGzip();

const readStream2 = fs.createReadStream('input.txt');
const writeStream2 = fs.createWriteStream('input.txt.gz');

readStream2.pipe(gzip).pipe(writeStream2);
```

### pipe 方法

```js
readable.pipe(writable[, options])

// pipe 方法返回目标流的引用，允许链式调用
const transform1 = new Transform1();
const transform2 = new Transform2();
const writable = fs.createWriteStream('output.txt');

readable
  .pipe(transform1)
  .pipe(transform2)
  .pipe(writable);
```

## 实际应用示例

### 文件压缩

```js
const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('input.txt.gz');

readStream
  .pipe(gzip)
  .pipe(writeStream)
  .on('finish', () => {
    console.log('File compressed successfully.');
  });
```

### HTTP 服务器中的流

```js
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // 将文件流式传输到客户端
  const readStream = fs.createReadStream('large-file.txt');
  
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  readStream.pipe(res);
  
  readStream.on('error', () => {
    res.writeHead(404);
    res.end('File not found');
  });
});

server.listen(3000);
```

### 数据处理管道

```js
const { Transform } = require('stream');

// 创建一个转换流来处理日志数据
class LogProcessor extends Transform {
  _transform(chunk, encoding, callback) {
    // 处理日志数据
    const processed = chunk.toString().toUpperCase();
    this.push(processed);
    callback();
  }
}

const fs = require('fs');

const readStream = fs.createReadStream('app.log');
const writeStream = fs.createWriteStream('processed.log');
const processor = new LogProcessor();

readStream
  .pipe(processor)
  .pipe(writeStream)
  .on('finish', () => {
    console.log('Log processing completed.');
  });
```

## 错误处理

正确处理流中的错误非常重要：

```js
const fs = require('fs');

const readStream = fs.createReadStream('nonexistent.txt');
const writeStream = fs.createWriteStream('output.txt');

// 在每个流上监听错误事件
readStream.on('error', (err) => {
  console.error('Read stream error:', err);
});

writeStream.on('error', (err) => {
  console.error('Write stream error:', err);
});

readStream.pipe(writeStream);
```

## 最佳实践

1. **始终处理错误**：为所有流添加错误事件监听器
2. **使用管道**：利用 [pipe()](#readable_pipe_destination_options) 方法简化流操作
3. **合理使用背压**：当可写流无法处理更多数据时，可读流应暂停数据读取
4. **及时清理资源**：在不需要流时调用 [destroy()](#stream_destroy_error) 方法
5. **选择合适的流类型**：根据需求选择合适的流类型（Readable、Writable、Duplex、Transform）

## 相关链接

- [Node.js Stream 官方文档](https://nodejs.org/api/stream.html)
- [Buffer](./buffer.md)
- [File System](./fs/index.md)
- [HTTP](./http.md)
