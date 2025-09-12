# Assert 断言

## 简介

Assert（断言）模块是 Node.js 的内置模块，提供了一组用于编写测试的断言函数。断言是一种验证程序行为是否符合预期的方法，如果断言失败，会抛出 [AssertionError](https://nodejs.org/api/errors.html#class-assertassertionerror) 异常。

Assert 模块主要用于单元测试和调试，帮助开发者快速发现代码中的问题。

```js
const assert = require('node:assert');

// 基本断言示例
assert(true);  // 通过
assert(1);     // 通过
assert(false); // 抛出 AssertionError
```

## 引入方式

```js
// 引入整个模块
const assert = require('node:assert');

// 引入严格模式
const assert = require('node:assert').strict;

// ES6 模块方式引入
import assert from 'node:assert';
import { strict as assert } from 'node:assert';
```

## 基本断言方法

### `assert(value[, message])` {#assert}

最基本的断言方法，测试 `value` 是否为真值（truthy）。如果 `value` 为假值（falsy），则抛出 [AssertionError](https://nodejs.org/api/errors.html#class-assertassertionerror)。

```js
const assert = require('node:assert');

assert(true);              // 通过
assert(1);                 // 通过
assert('Hello');           // 通过

assert(false);             // 抛出 AssertionError
assert(0);                 // 抛出 AssertionError
assert('');                // 抛出 AssertionError
assert(null);              // 抛出 AssertionError
assert(undefined);         // 抛出 AssertionError

// 带自定义消息
assert(false, '值应该为真'); // 抛出 AssertionError [ERR_ASSERTION]: 值应该为真
```

### `assert.ok(value[, message])` {#assert.ok}

`assert.ok()` 是 [assert()](#assert) 的别名，功能完全相同。

```js
const assert = require('node:assert');

assert.ok(true);           // 通过
assert.ok(1);              // 通过

assert.ok(false);          // 抛出 AssertionError
assert.ok(0, '值为假');    // 抛出 AssertionError [ERR_ASSERTION]: 值为假
```

## 相等性断言

### `assert.equal(actual, expected[, message])` {#assert.equal}

使用宽松相等运算符（`==`）比较 `actual` 和 `expected` 是否相等。

```js
const assert = require('node:assert');

assert.equal(1, 1);        // 通过
assert.equal(1, '1');      // 通过（类型转换）
assert.equal(NaN, NaN);    // 通过

assert.equal(1, 2);        // 抛出 AssertionError
assert.equal({ a: 1 }, { a: 1 }); // 抛出 AssertionError（对象引用不同）
```

### `assert.strictEqual(actual, expected[, message])` {#assert.strictEqual}

使用严格相等运算符（`===`）比较 `actual` 和 `expected` 是否相等。

```js
const assert = require('node:assert');

assert.strictEqual(1, 1);     // 通过
assert.strictEqual('1', '1'); // 通过

assert.strictEqual(1, '1');   // 抛出 AssertionError
assert.strictEqual(NaN, NaN); // 通过（特殊情况）
```

### `assert.deepEqual(actual, expected[, message])` {#assert.deepEqual}

深度比较两个值是否相等，会递归比较对象和数组的内容。

```js
const assert = require('node:assert');

assert.deepEqual({ a: 1 }, { a: 1 });           // 通过
assert.deepEqual([1, 2, 3], [1, 2, 3]);         // 通过
assert.deepEqual({ a: { b: 1 } }, { a: { b: 1 } }); // 通过

assert.deepEqual({ a: 1 }, { a: 2 });           // 抛出 AssertionError
assert.deepEqual([1, 2, 3], [1, 2, 3, 4]);      // 抛出 AssertionError
```

### `assert.deepStrictEqual(actual, expected[, message])` {#assert.deepStrictEqual}

深度严格比较两个值是否相等，类似于 [assert.deepEqual()](#assert.deepEqual)，但使用严格相等比较。

```js
const assert = require('node:assert');

assert.deepStrictEqual({ a: 1 }, { a: 1 });     // 通过
assert.deepStrictEqual([1, 2, 3], [1, 2, 3]);   // 通过

// 类型不同的值即使值相同也会失败
assert.deepStrictEqual([1, 2, 3], ['1', '2', '3']); // 抛出 AssertionError
```

## 不等性断言

### `assert.notEqual(actual, expected[, message])` {#assert.notEqual}

使用宽松不等运算符（`!=`）比较 `actual` 和 `expected` 是否不相等。

```js
const assert = require('node:assert');

assert.notEqual(1, 2);     // 通过
assert.notEqual(1, '2');   // 通过

assert.notEqual(1, '1');   // 抛出 AssertionError
```

### `assert.notStrictEqual(actual, expected[, message])` {#assert.notStrictEqual}

使用严格不等运算符（`!==`）比较 `actual` 和 `expected` 是否不相等。

```js
const assert = require('node:assert');

assert.notStrictEqual(1, 2);   // 通过
assert.notStrictEqual(1, '1'); // 通过

assert.notStrictEqual(1, 1);   // 抛出 AssertionError
```

### `assert.notDeepEqual(actual, expected[, message])` {#assert.notDeepEqual}

深度比较两个值是否不相等。

```js
const assert = require('node:assert');

assert.notDeepEqual({ a: 1 }, { a: 2 });       // 通过
assert.notDeepEqual([1, 2, 3], [1, 2, 3, 4]);  // 通过

assert.notDeepEqual({ a: 1 }, { a: 1 });       // 抛出 AssertionError
```

### `assert.notDeepStrictEqual(actual, expected[, message])` {#assert.notDeepStrictEqual}

深度严格比较两个值是否不相等。

```js
const assert = require('node:assert');

assert.notDeepStrictEqual({ a: 1 }, { a: '1' }); // 通过

assert.notDeepStrictEqual({ a: 1 }, { a: 1 });   // 抛出 AssertionError
```

## 异常断言

### `assert.throws(fn[, error][, message])` {#assert.throws}

断言函数 `fn` 会抛出异常。

```js
const assert = require('node:assert');

// 验证函数会抛出异常
assert.throws(() => {
  throw new Error('错误信息');
}); // 通过

// 验证抛出特定类型的错误
assert.throws(() => {
  throw new TypeError('类型错误');
}, TypeError); // 通过

// 验证错误消息
assert.throws(() => {
  throw new Error('错误信息');
}, /错误/); // 通过（使用正则表达式）

// 验证错误消息（使用函数）
assert.throws(() => {
  throw new Error('错误信息');
}, (err) => {
  return err.message === '错误信息';
}); // 通过
```

### `assert.doesNotThrow(fn[, message])` {#assert.doesNotThrow}

断言函数 `fn` 不会抛出异常。

```js
const assert = require('node:assert');

// 验证函数不会抛出异常
assert.doesNotThrow(() => {
  return 1 + 1;
}); // 通过

// 如果函数抛出异常则失败
assert.doesNotThrow(() => {
  throw new Error('错误信息');
}); // 抛出 AssertionError
```

### `assert.rejects(asyncFn[, error][, message])` {#assert.rejects}

断言 `asyncFn` Promise 会被 reject。

```js
const assert = require('node:assert');

// 验证异步函数会 reject
assert.rejects(async () => {
  throw new Error('错误信息');
}); // 通过

// 验证 reject 特定错误
assert.rejects(
  async () => {
    throw new TypeError('类型错误');
  },
  TypeError
); // 通过
```

### `assert.doesNotReject(asyncFn[, error][, message])` {#assert.doesNotReject}

断言 `asyncFn` Promise 不会被 reject。

```js
const assert = require('node:assert');

// 验证异步函数不会 reject
assert.doesNotReject(async () => {
  return 1 + 1;
}); // 通过

// 如果异步函数 reject 则失败
assert.doesNotReject(async () => {
  throw new Error('错误信息');
}); // 抛出 AssertionError
```

## 其他实用方法

### `assert.ifError(value)` {#assert.ifError}

如果 `value` 不为 `undefined` 或 `null`，则抛出 `value`。常用于测试回调函数中的错误参数。

```js
const assert = require('node:assert');

assert.ifError(null);      // 通过
assert.ifError(undefined); // 通过

assert.ifError(new Error('错误')); // 抛出 Error: 错误
assert.ifError('错误');    // 抛出 '错误'
```

### assert.fail([message]) {#assert.fail}

断言失败，总是抛出 [AssertionError](https://nodejs.org/api/errors.html#class-assertassertionerror)。

```js
const assert = require('node:assert');

// 总是失败
assert.fail();             // 抛出 AssertionError [ERR_ASSERTION]: Failed
assert.fail('自定义错误消息'); // 抛出 AssertionError [ERR_ASSERTION]: 自定义错误消息
```

## 严格模式 vs 非严格模式

Assert 模块有两种模式：默认模式和严格模式。

```js
// 默认模式
const assert = require('node:assert');

// 严格模式
const assertStrict = require('node:assert').strict;
// 或者
const { strict: assert } = require('node:assert');
```

区别在于相等性比较：
- 默认模式使用 `==` 和 `!=`
- 严格模式使用 `===` 和 `!==`

```js
const assert = require('node:assert');
const { strict: assertStrict } = require('node:assert');

// 默认模式
assert.equal(1, '1');        // 通过（宽松相等）
assert.strictEqual(1, '1');  // 失败（严格相等）

// 严格模式
assertStrict.equal(1, '1');  // 失败（严格相等）
assertStrict.strictEqual(1, '1'); // 失败（严格相等）
```

## 实际应用示例

### 同步函数测试

```js
const assert = require('node:assert');

function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('参数必须是数字');
  }
  return a + b;
}

// 测试正常情况
assert.strictEqual(add(2, 3), 5, '2 + 3 应该等于 5');

// 测试边界情况
assert.strictEqual(add(0, 0), 0, '0 + 0 应该等于 0');
assert.strictEqual(add(-1, 1), 0, '-1 + 1 应该等于 0');

// 测试异常情况
assert.throws(
  () => add('2', 3),
  TypeError,
  '传入非数字参数应该抛出 TypeError'
);
```

### 异步函数测试

```js
const assert = require('node:assert');
const fs = require('node:fs').promises;

async function readFileContent(filename) {
  try {
    const content = await fs.readFile(filename, 'utf8');
    return content;
  } catch (err) {
    throw new Error(`读取文件失败: ${err.message}`);
  }
}

// 测试异步函数
async function testReadFile() {
  // 测试成功读取
  try {
    await fs.writeFile('test.txt', 'Hello World');
    const content = await readFileContent('test.txt');
    assert.strictEqual(content, 'Hello World', '文件内容应该匹配');
  } finally {
    await fs.unlink('test.txt').catch(() => {});
  }

  // 测试读取不存在的文件
  await assert.rejects(
    async () => readFileContent('nonexistent.txt'),
    /读取文件失败/,
    '读取不存在的文件应该被拒绝'
  );
}

testReadFile().catch(console.error);
```

### 对象深度比较测试

```js
const assert = require('node:assert');

function getUserInfo(id) {
  // 模拟数据库查询
  if (id === 1) {
    return {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      profile: {
        age: 25,
        city: '北京'
      }
    };
  }
  return null;
}

const expectedUser = {
  id: 1,
  name: '张三',
  email: 'zhangsan@example.com',
  profile: {
    age: 25,
    city: '北京'
  }
};

const actualUser = getUserInfo(1);
assert.deepStrictEqual(actualUser, expectedUser, '用户信息应该匹配');
```

## 最佳实践

1. **使用严格模式**：推荐使用 `assert.strict`，避免类型转换带来的意外结果
2. **提供有意义的错误消息**：为断言添加清晰的错误消息，便于调试
3. **测试边界条件**：不仅要测试正常情况，还要测试异常和边界情况
4. **组合使用多种断言**：根据需要选择合适的断言方法
5. **测试异步代码**：正确使用 [assert.rejects()](#assertrejectsasyncfn-error-message) 和 [assert.doesNotReject()](#assertdoesnotrejectasyncfn-error-message)

## 注意事项

1. **性能影响**：断言会带来一定的性能开销，生产环境中应避免使用
2. **错误处理**：断言失败会抛出异常，需要妥善处理
3. **测试框架集成**：在实际项目中，通常会结合 Mocha、Jest 等测试框架使用
4. **类型检查**：断言不能替代 TypeScript 等静态类型检查工具

## 相关链接

- [Node.js Assert 官方文档](https://nodejs.org/api/assert.html)
- [Testing](../test/index.md)
