# String Decoder 解码字符串

## 简介

`string_decoder` 模块提供了一个 API，用于将 [Buffer](./buffer) 对象解码成字符串，但会保留编码过的多字节 UTF-8 与 UTF-16 字符。这对于处理流数据特别有用，可以确保多字节字符不会被截断。

可以使用以下方式引入：

```js
const { StringDecoder } = require('node:string_decoder');
```

## StringDecoder

### `new StringDecoder([encoding])`

- `encoding`: `{string}` 字符编码，默认为 `'utf8'`

创建一个新的 `StringDecoder` 实例。

```js
const { StringDecoder } = require('node:string_decoder');
const decoder = new StringDecoder('utf8');
```

### `stringDecoder.write(buffer)`

- `buffer`: `{Buffer|TypedArray|DataView}`
- 返回: `{string}`

返回一个解码后的字符串，并确保在末尾不会含有任何不完整的多字节字符。这些不完整的字符会被保存在内部缓冲区中，等到下次调用 `stringDecoder.write()` 或 `stringDecoder.end()` 时再进行处理。

```js
const { StringDecoder } = require('node:string_decoder');
const decoder = new StringDecoder('utf8');

// 处理完整的多字节字符
const cent = Buffer.from([0xC2, 0xA2]);
console.log(decoder.write(cent)); // 输出: ¢

// 处理不完整的多字节字符
const euro = Buffer.from([0xE2, 0x82, 0xAC]);
console.log(decoder.write(euro)); // 输出: €
```

### `stringDecoder.end([buffer])`

- `buffer`: `{Buffer|TypedArray|DataView}`
- 返回: `{string}`

以字符串的形式返回内部缓冲区中剩余的字节。如果不提供 [Buffer](./buffer) 或 [TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)，则会返回空字符串。

在调用 `stringDecoder.end()` 之后，[StringDecoder](#stringdecoder) 对象可以被再次使用。

```js
const { StringDecoder } = require('node:string_decoder');
const decoder = new StringDecoder('utf8');

// 处理不完整的字符数据
const buffer = Buffer.from([0xE2]);
console.log(decoder.write(buffer)); // 输出: '' (空字符串)

// 结束解码并获取剩余字符
console.log(decoder.end()); // 输出: '' (空字符串，因为数据不完整)
```

## 使用场景

### 处理流数据

当处理流数据时，特别是从网络或文件系统读取数据时，数据可能会在任意字节处分割，这可能导致多字节字符被截断。StringDecoder 能够正确处理这种情况：

```js
const { StringDecoder } = require('node:string_decoder');
const decoder = new StringDecoder('utf8');

// 模拟流数据处理
const buffers = [
  Buffer.from([0xE4, 0xBD]),     // '你'字的前两个字节
  Buffer.from([0xA0, 0xE5, 0xA5]), // '你'字的后一个字节 + '好'字的前一个字节
  Buffer.from([0xBD])             // '好'字的后一个字节
];

buffers.forEach((buf, index) => {
  const str = decoder.write(buf);
  console.log(`Buffer ${index + 1}: "${str}"`);
});

// 输出:
// Buffer 1: ""
// Buffer 2: "你好"
// Buffer 3: ""

// 处理剩余数据
const remaining = decoder.end();
console.log(`Remaining: "${remaining}"`);
```

### 与可读流配合使用

`StringDecoder` 经常与可读流一起使用，确保正确解码文本数据：

```js
const { Readable } = require('node:stream');
const { StringDecoder } = require('node:string_decoder');

const decoder = new StringDecoder('utf8');

const readable = Readable.from([
  Buffer.from([0xE4, 0xBD, 0xA0]),
  Buffer.from([0xE5, 0xA5, 0xBD]),
  Buffer.from([0xEF, 0xBC, 0x81])
]);

readable.on('data', (chunk) => {
  const str = decoder.write(chunk);
  console.log(`Decoded: ${str}`);
});

readable.on('end', () => {
  const remaining = decoder.end();
  if (remaining) {
    console.log(`Remaining: ${remaining}`);
  }
});

// 输出:
// Decoded: 你好
// Decoded: ！
```

## 支持的编码

StringDecoder 支持以下字符编码：
- `'utf8'` (默认)
- `'utf16le'`
- `'base64'`
- `'hex'`

不同编码的处理方式略有不同，特别是对于多字节字符的处理。

## 注意事项

1. **Buffer.toString() vs StringDecoder**：直接使用 `Buffer.toString()` 可能会在多字节字符被截断时产生乱码，而 StringDecoder 能够正确处理这种情况。
2. **内存管理**：StringDecoder 内部维护一个缓冲区来存储不完整的字符，需要在使用完毕后调用 `end()` 方法来释放资源。
3. **性能考虑**：对于大量数据的处理，StringDecoder 的性能通常优于手动拼接字符串的方式。

## 相关链接

- [Buffer](./buffer)
- [Stream](./stream)
- [UTF-8](https://en.wikipedia.org/wiki/UTF-8)
- [UTF-16](https://en.wikipedia.org/wiki/UTF-16)
