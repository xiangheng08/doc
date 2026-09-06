# JSDoc

JSDoc 是基于注释的文档标注规范，用来描述 JavaScript 代码的类型与接口。VS Code、`typescript` 都能解析它，从而让纯 JS 也能获得类型提示和静态检查。

## 基本格式

以 `/** */` 块注释书写，首行写整体描述，标签以 `@` 开头：

```js
/**
 * 两数求和
 * @param {number} a 加数
 * @param {number} b 被加数
 * @returns {number} 和
 */
function add(a, b) {
  return a + b;
}
```

## 常用标签速查

| 标签                                  | 作用                              |
| ------------------------------------- | --------------------------------- |
| `@param {type} name desc`             | 描述参数                          |
| `@returns {type} desc`                | 描述返回值（同 `@return`）        |
| `@type {type}`                        | 标注变量或属性的类型              |
| `@typedef {type} Name`                | 定义类型别名 / 对象结构           |
| `@property {type} name`               | 结构中的属性（同 `@prop`）        |
| `@callback`                           | 定义回调函数类型                  |
| `@enum {type}`                        | 定义枚举                          |
| `@example`                            | 用法示例                          |
| `@throws {type} desc`                 | 可能抛出的异常（同 `@exception`） |
| `@deprecated`                         | 标记已废弃                        |
| `@since` / `@version`                 | 版本信息                          |
| `@see` / `{@link}`                    | 参考链接                          |
| `@author`                             | 作者                              |
| `@private` / `@public` / `@protected` | 可见性                            |
| `@readonly`                           | 只读                              |
| `@default`                            | 默认值                            |
| `@module`                             | 模块名                            |

## 参数 `@param`

可选参数和默认值写在参数名的 `[]` 中：

```js
/**
 * @param {string} name 姓名
 * @param {number} [age] 可选参数
 * @param {boolean} [flag=true] 可选参数，默认 true
 */
function greet(name, age, flag = true) {}
```

对象解构参数按成员逐个描述：

```js
/**
 * @param {object} opts 配置
 * @param {string} opts.url 请求地址
 * @param {number} [opts.timeout=3000] 超时时间
 */
function request(opts) {}
```

## 类型语法

`{ }` 内支持 TypeScript 类型表达式：

```js
/** @type {string} */                       // 基本类型
/** @type {number[]} */                     // 数组（同 Array<number>）
/** @type {string | number} */              // 联合类型
/** @type {string | null} */                // 可能为 null
/** @type {{ name: string, age?: number }} */ // 对象字面量
/** @type {function(string): number} */     // 函数类型
/** @type {Promise<void>} */                // Promise
/** @type {Record<string, number>} */       // 索引签名
```

## 自定义结构 `@typedef`

用 `@typedef` + `@property` 定义对象结构（等价 TS 的 interface），便于复用：

```js
/**
 * @typedef {object} User
 * @property {string} name 姓名
 * @property {number} [age] 年龄（可选）
 */

/**
 * @returns {User}
 */
function getUser() {
  return { name: 'Tom' };
}
```

## 回调类型 `@callback`

```js
/**
 * @callback Done
 * @param {Error | null} err 错误
 * @param {string} [data] 成功数据
 */

/** @type {Done} */
const done = (err, data) => {};
```

## 综合示例

```js
/**
 * 数组去重
 * @param {number[]} arr 输入数组
 * @returns {number[]} 去重后的数组
 * @throws {TypeError} 传入非数组时抛出
 * @deprecated 请改用 unique()
 * @example
 * unique([1, 1, 2, 3, 3]); // [1, 2, 3]
 */
function unique(arr) {}
```

## 让 JSDoc 生效

纯 JS 默认不做类型检查，需显式开启：

- 单文件：文件顶部加 `// @ts-check`，即可校验本文件并提示错误
- 项目级：在 `jsconfig.json` 中开启：

```json
{
  "compilerOptions": {
    "checkJs": true,
    "strict": true
  }
}
```

开启后，JSDoc 声明的类型与实际代码不符会直接标红（类型不匹配、参数缺失等）。

## 实践建议

- 需要复用的对象结构用 `@typedef` 定义，避免在 `@param` 里堆长类型
- 对函数式 API 或模块导出等公共部分写完整注释，内部实现从简
- 描述文字用中文，标签名和类型保持英文
- 需要给 TS 工程消费类型时，可用 `tsc --allowJs` 配合 `jsdoc` 生成 `.d.ts`
