# Prettier 配置选项

Prettier 提供了少量的配置选项，这些选项是经过精心挑选的，可以在保证代码可读性的同时，减少团队成员之间关于代码风格的争论。

下面列出了所有可用的配置选项及其说明：

| 选项                         | 默认值        | 说明                                                                        |
| ---------------------------- | ------------- | --------------------------------------------------------------------------- |
| `printWidth`                 | `80`          | 指定单行代码的最大长度，超过会换行                                          |
| `tabWidth`                   | `2`           | 每个缩进级别的空格数                                                        |
| `useTabs`                    | `false`       | 是否使用制表符（Tab）而不是空格进行缩进                                     |
| `semi`                       | `true`        | 是否在语句末尾打印分号                                                      |
| `singleQuote`                | `false`       | 是否使用单引号而不是双引号                                                  |
| `quoteProps`                 | `"as-needed"` | 对象属性的引号使用策略，可选值: `"as-needed"`、`"consistent"`、`"preserve"` |
| `jsxSingleQuote`             | `false`       | 在 JSX 中是否使用单引号而不是双引号                                         |
| `trailingComma`              | `"es5"`       | 在多行结构的末尾打印逗号，可选值: `"none"`、`"es5"`、`"all"`                |
| `bracketSpacing`             | `true`        | 是否在对象的大括号内侧打印空格                                              |
| `bracketSameLine`            | `false`       | 是否将多行 HTML 元素的 > 放在最后一行的末尾                                 |
| `arrowParens`                | `"always"`    | 箭头函数的参数是否总是使用括号，可选值: `"always"`、`"avoid"`               |
| `rangeStart`                 | `0`           | 只格式化文件的一部分的起始位置（从0开始索引）                               |
| `rangeEnd`                   | `Infinity`    | 只格式化文件的一部分的结束位置                                              |
| `parser`                     | -             | 指定要使用的解析器，Prettier 会自动推断，通常无需设置                       |
| `filepath`                   | -             | 指定文件名，以帮助 Prettier 推断使用哪个解析器                              |
| `requirePragma`              | `false`       | 是否要求文件顶部有特殊注释才格式化                                          |
| `insertPragma`               | `false`       | 是否在格式化后插入特殊注释                                                  |
| `proseWrap`                  | `"preserve"`  | 如何包装 Markdown 文本，可选值: `"always"`、`"never"`、`"preserve"`         |
| `htmlWhitespaceSensitivity`  | `"css"`       | HTML 空白字符敏感度，可选值: `"css"`、`"strict"`、`"ignore"`                |
| `vueIndentScriptAndStyle`    | `false`       | Vue 文件中的 script 和 style 标签是否缩进                                   |
| `endOfLine`                  | `"lf"`        | 换行符样式，可选值: `"lf"`、`"crlf"`、`"cr"`、`"auto"`                      |
| `embeddedLanguageFormatting` | `"auto"`      | 是否格式化文件中嵌入的代码，可选值: `"auto"`、`"off"`                       |
| `singleAttributePerLine`     | `false`       | 是否每个 HTML 属性独占一行                                                  |

<style>
table code {
  white-space: nowrap;
}
</style>

## 选项详解

### printWidth

默认值: `80`

指定单行代码的最大长度，超过会换行。这不会影响到那些无法分割的长字符串。

示例：

```json
{
  "printWidth": 100
}
```

### tabWidth

默认值: `2`

每个缩进级别的空格数。

示例：

```json
{
  "tabWidth": 4
}
```

### useTabs

默认值: `false`

是否使用制表符（Tab）而不是空格进行缩进。

示例：

```json
{
  "useTabs": true
}
```

### semi

默认值: `true`

是否在语句末尾打印分号。

示例：

```json
{
  "semi": false
}
```

### singleQuote

默认值: `false`

是否使用单引号而不是双引号。

示例：

```json
{
  "singleQuote": true
}
```

### quoteProps

默认值: `"as-needed"`

对象属性的引号使用策略。

可选值:
- `"as-needed"` - 仅在需要时为对象属性添加引号
- `"consistent"` - 如果一个对象中有一个属性需要引号，则所有属性都添加引号
- `"preserve"` - 保持原样，不改变已有的引号

示例：

```json
{
  "quoteProps": "consistent"
}
```

### jsxSingleQuote

默认值: `false`

在 JSX 中是否使用单引号而不是双引号。

示例：

```json
{
  "jsxSingleQuote": true
}
```

### trailingComma

默认值: `"es5"`

在多行结构的末尾打印逗号。

可选值:
- `"none"` - 不打印尾随逗号
- `"es5"` - 在 ES5 中有效的尾随逗号（对象、数组等）
- `"all"` - 尽可能地打印尾随逗号（包括函数参数）

示例：

```json
{
  "trailingComma": "all"
}
```

### bracketSpacing

默认值: `true`

是否在对象的大括号内侧打印空格。

示例：

```json
{
  "bracketSpacing": false
}
```

对比效果：

```javascript
// bracketSpacing: true
{ foo: bar }

// bracketSpacing: false
{foo: bar}
```

### bracketSameLine

默认值: `false`

是否将多行 HTML 元素的 > 放在最后一行的末尾。

示例：

```json
{
  "bracketSameLine": true
}
```

对比效果：

```jsx
// bracketSameLine: false
<button
  className="prettier-class"
  id="prettier-id"
  onClick={this.handleClick}>
  Click Here
</button>

// bracketSameLine: true
<button
  className="prettier-class"
  id="prettier-id"
  onClick={this.handleClick}
>
  Click Here
</button>
```

### arrowParens

默认值: `"always"`

箭头函数的参数是否总是使用括号。

可选值:
- `"always"` - 总是包含括号
- `"avoid"` - 尽可能省略括号

示例：

```json
{
  "arrowParens": "avoid"
}
```

对比效果：

```javascript
// arrowParens: "always"
(a) => {}

// arrowParens: "avoid"
a => {}
```

### rangeStart 和 rangeEnd

默认值: `0` 和 `Infinity`

只格式化文件的一部分。这两个选项主要用于编辑器集成。

### parser

默认值: 根据文件类型自动推断

指定要使用的解析器。Prettier 会根据文件扩展名自动推断，通常无需设置。

### filepath

默认值: 无

指定文件名，以帮助 Prettier 推断使用哪个解析器。

### requirePragma

默认值: `false`

是否要求文件顶部有特殊注释才格式化。如果设置为 `true`，则只有在文件顶部包含 `/** @format */` 注释时才会格式化。

### insertPragma

默认值: `false`

是否在格式化后插入特殊注释。如果设置为 `true`，且文件顶部没有 `/** @format */` 注释，则会插入该注释。

### proseWrap

默认值: `"preserve"`

如何包装 Markdown 文本。

可选值:
- `"always"` - 如果超过 printWidth，则换行
- `"never"` - 不换行
- `"preserve"` - 保持原样

### htmlWhitespaceSensitivity

默认值: `"css"`

HTML 空白字符敏感度。

可选值:
- `"css"` - 遵循 CSS display 属性的默认值
- `"strict"` - 所有空白字符都被视为重要
- `"ignore"` - 所有空白字符都被视为不重要

### vueIndentScriptAndStyle

默认值: `false`

Vue 文件中的 script 和 style 标签是否缩进。

### endOfLine

默认值: `"lf"`

换行符样式。

可选值:
- `"lf"` - 换行 (\\n)，常见于 Linux 和 macOS
- `"crlf"` - 回车换行 (\\r\\n)，常见于 Windows
- `"cr"` - 回车 (\\r)
- `"auto"` - 保持现有行尾

### embeddedLanguageFormatting

默认值: `"auto"`

是否格式化文件中嵌入的代码。

可选值:
- `"auto"` - 格式化嵌入的代码
- `"off"` - 不格式化嵌入的代码

### singleAttributePerLine

默认值: `false`

是否每个 HTML 属性独占一行。

示例：

```json
{
  "singleAttributePerLine": true
}
```

对比效果：

```jsx
// singleAttributePerLine: false
<button className="prettier-class" id="prettier-id" onClick={this.handleClick}>
  Click Here
</button>

// singleAttributePerLine: true
<button
  className="prettier-class"
  id="prettier-id"
  onClick={this.handleClick}
>
  Click Here
</button>
```
