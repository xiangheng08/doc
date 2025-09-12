# Buffer 缓冲区

## 简介

Buffer 是 Node.js 中用于处理二进制数据的核心模块。在引入 TypedArray 之前，JavaScript 语言没有用于读取或操作二进制数据流的机制。Buffer 类作为 Node.js API 的一部分引入，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互。

Buffer 类的实例类似于整数数组，但对应于 V8 堆内存之外的一段原始内存。Buffer 的大小在创建时确定且无法更改。

```js
// Buffer 是全局可用的，无需 require
const buf = Buffer.alloc(10);
console.log(buf); // <Buffer 00 00 00 00 00 00 00 00 00 00>
```

## 创建 Buffer

有多种方式可以创建 Buffer 实例：

### `Buffer.alloc(size[, fill[, encoding]])`

创建一个指定大小的 Buffer，并用指定的值填充。

```js
// 创建一个长度为 10 的 Buffer，并用 0 填充
const buf1 = Buffer.alloc(10);
console.log(buf1); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// 创建一个长度为 10 的 Buffer，并用 'a' 填充
const buf2 = Buffer.alloc(10, 'a');
console.log(buf2); // <Buffer 61 61 61 61 61 61 61 61 61 61>
```

### `Buffer.from(array)`

使用一个数组来分配 Buffer。

```js
const buf = Buffer.from([1, 2, 3, 4, 5]);
console.log(buf); // <Buffer 01 02 03 04 05>
```

### `Buffer.from(string[, encoding])`

创建一个包含字符串的 Buffer。

```js
const buf = Buffer.from('Hello World', 'utf8');
console.log(buf); // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>
```

### `Buffer.from(arrayBuffer[, byteOffset[, length]])`

使用 ArrayBuffer 创建 Buffer。

```js
const arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;

const buf = Buffer.from(arr.buffer); // 与数组共享内存
console.log(buf); // <Buffer 88 13 a0 0f>

// 修改数组也会影响 Buffer
arr[1] = 6000;
console.log(buf); // <Buffer 88 13 70 17>
```

## Buffer 与字符编码

当字符串数据被存储入 Buffer 实例或从 Buffer 实例中被提取时，可以指定一个字符编码。

```js
const buf = Buffer.from('Hello World');

// 转换为不同编码格式的字符串
console.log(buf.toString()); // Hello World (默认 utf8)
console.log(buf.toString('hex')); // 48656c6c6f20576f726c64
console.log(buf.toString('base64')); // SGVsbG8gV29ybGQ=
```

支持的编码格式包括：
- `'utf8'` (默认)
- `'ascii'`
- `'base64'`
- `'hex'`
- `'binary'`
- `'ucs2'` / `'utf16le'`

## Buffer 操作

### 写入数据

```js
const buf = Buffer.alloc(256);

// 将字符串写入 Buffer
const len = buf.write('Hello World');
console.log(`${len} bytes: ${buf.toString()}`); // 11 bytes: Hello World

// 在指定位置写入
const buf2 = Buffer.alloc(10);
buf2.write('abc', 2); // 从索引 2 开始写入
console.log(buf2.toString()); // \x00\x00abc\x00\x00
```

### 读取数据

```js
const buf = Buffer.from([0x10, 0x20, 0x30, 0x40]);

// 读取整数
console.log(buf.readUInt8(0)); // 16
console.log(buf.readUInt16BE(0)); // 4128 (大端序)
console.log(buf.readUInt16LE(0)); // 8208 (小端序)
```

### 复制数据

```js
const buf1 = Buffer.from('Hello');
const buf2 = Buffer.alloc(10);
const buf3 = Buffer.alloc(5);

buf1.copy(buf2); // 将 buf1 复制到 buf2
console.log(buf2.toString()); // Hello

buf1.copy(buf3, 0, 1, 3); // 从 buf1 的索引 1 到 3 复制到 buf3
console.log(buf3.toString()); // el
```

### 切片

```js
const buf = Buffer.from('Hello World');
const subBuf = buf.slice(0, 5);
console.log(subBuf.toString()); // Hello

// 修改切片也会影响原 Buffer
subBuf[0] = 0x4a; // 'J'
console.log(buf.toString()); // Jello World
```

### 拼接

```js
const buf1 = Buffer.from('Hello ');
const buf2 = Buffer.from('World');
const buf3 = Buffer.concat([buf1, buf2]);
console.log(buf3.toString()); // Hello World
```

## Buffer 属性和方法

### 属性

- `buf.length` - 返回 Buffer 的字节数

```js
const buf = Buffer.from('Hello');
console.log(buf.length); // 5
```

### 静态方法

- `Buffer.isBuffer(obj)` - 检查 obj 是否是 Buffer
- `Buffer.byteLength(string[, encoding])` - 返回字符串的实际字节长度
- `Buffer.concat(list[, totalLength])` - 拼接 Buffer 数组

```js
console.log(Buffer.isBuffer(Buffer.from('Hello'))); // true
console.log(Buffer.isBuffer({})); // false

console.log(Buffer.byteLength('Hello')); // 5
console.log(Buffer.byteLength('你好')); // 6 (UTF-8 编码中每个中文字符占 3 字节)

const bufArray = [Buffer.from('Hello'), Buffer.from(' '), Buffer.from('World')];
console.log(Buffer.concat(bufArray).toString()); // Hello World
```

## 使用场景

### 文件操作

```js
const fs = require('fs');

// 读取图片文件为 Buffer
fs.readFile('image.png', (err, data) => {
  if (err) throw err;
  console.log(Buffer.isBuffer(data)); // true
  // 可以对图片数据进行处理
});
```

### 网络通信

```js
const net = require('net');

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    // 接收到的数据是 Buffer
    console.log('Received:', data.toString());
  });
});

server.listen(8000);
```

### 数据编码转换

```js
// Base64 编码/解码
const text = 'Hello World';
const buf = Buffer.from(text);
const base64 = buf.toString('base64');
console.log(base64); // SGVsbG8gV29ybGQ=

const decodedBuf = Buffer.from(base64, 'base64');
console.log(decodedBuf.toString()); // Hello World
```

## 注意事项

1. **内存管理**：Buffer 直接操作内存，需要谨慎处理以避免内存泄漏
2. **安全性**：使用 `Buffer.alloc()` 而不是已废弃的 `new Buffer()` 构造函数
3. **编码问题**：在处理文本数据时要注意字符编码的一致性
4. **性能优化**：对于大量数据处理，Buffer 比字符串操作更高效

## 相关链接

- [Node.js Buffer 官方文档](https://nodejs.org/api/buffer.html)
- [Stream](./stream.md)
- [File System](./fs/index.md)
