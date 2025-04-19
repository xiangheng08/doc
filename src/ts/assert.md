# 类型断言

## 简介

对于没有类型声明的值，TypeScript 会进行类型推断，很多时候得到的结果，未必是开发者想要的。

```ts
type T = 'a' | 'b' | 'c'
let foo = 'a'

let bar: T = foo // 报错
```

TypeScript 提供了“类型断言”这样一种手段，允许开发者在代码中“断言”某个值的类型，告诉编译器此处的值是什么类型。TypeScript 一旦发现存在类型断言，就不再对该值进行类型推断，而是直接采用断言给出的类型。

这种做法的实质是，允许开发者在某个位置“绕过”编译器的类型推断，让本来通不过类型检查的代码能够通过，避免编译器报错。这样虽然削弱了 TypeScript 类型系统的严格性，但是为开发者带来了方便，毕竟开发者比编译器更了解自己的代码。

回到上面的例子，解决方法就是进行类型断言，在赋值时断言变量 `foo` 的类型。

```ts
type T = 'a' | 'b' | 'c'

let foo = 'a'
let bar: T = foo as T // 正确
```

总之，类型断言并不是真的改变一个值的类型，而是提示编译器，应该如何处理这个值。

类型断言有两种语法。

```ts
// 语法一：<类型>值
<Type>value

// 语法二：值 as 类型
value as Type
```

上面两种语法是等价的，`value` 表示值，`Type` 表示类型。早期只有语法一，后来因为 TypeScript 开始支持 React 的 JSX 语法（尖括号表示 HTML 元素），为了避免两者冲突，就引入了语法二。目前，推荐使用语法二。

```ts
// 语法一
let bar: T = <T>foo

// 语法二
let bar: T = foo as T
```

上面示例是两种类型断言的语法，其中的语法一因为跟 JSX 语法冲突，使用时必须关闭 TypeScript 的 React 支持，否则会无法识别。由于这个原因，现在一般都使用语法二。

对象类型有严格字面量检查，如果存在额外的属性会报错。

```ts
// 报错
const p: { x: number } = { x: 0, y: 0 }
```

解决方法就是使用类型断言，可以用两种不同的断言。

```ts
// 正确
const p0: { x: number } = { x: 0, y: 0 } as { x: number }

// 正确
const p1: { x: number } = { x: 0, y: 0 } as { x: number; y: number }
```

下面是一个网页编程的实际例子。

```ts
const username = document.getElementById('username');

if (username) {
  (username as HTMLInputElement).value; // 正确
}
```

注意，上例的类型断言的圆括号是必需的，否则 `username` 会被断言成 `HTMLInputElement.value`，从而报错。

类型断言不应滥用，因为它改变了 TypeScript 的类型检查，很可能埋下错误的隐患。

```ts
const data: object = {
  a: 1,
  b: 2,
  c: 3,
}

data.length // 报错

;(data as Array<string>).length // 正确
```

类型断言的一大用处是，指定 unknown 类型的变量的具体类型。

```ts
const value: unknown = 'Hello World'

const s1: string = value // 报错
const s2: string = value as string // 正确
```

## 类型断言的条件

类型断言并不意味着，可以把某个值断言为任意类型。

```ts
const n = 1
const m: string = n as string // 报错
```

类型断言的使用前提是，值的实际类型与断言的类型必须满足一个条件。

```ts
expr as T
```

也就是说，类型断言要求实际的类型与断言的类型兼容，实际类型可以断言为一个更加宽泛的类型（父类型），也可以断言为一个更加精确的类型（子类型），但不能断言为一个完全无关的类型。

但是，如果真的要断言成一个完全无关的类型，也是可以做到的。那就是连续进行两次类型断言，先断言成 unknown 类型或 any 类型，然后再断言为目标类型。因为 `any` 类型和 `unknown` 类型是所有其他类型的父类型，所以可以作为两种完全无关的类型的中介。

```ts
// 或者写成 <T><unknown>expr
expr as unknown as T
```

下面是本小节开头那个例子的改写。

```ts
const n = 1
const m: string = n as unknown as string // 正确
```

## as const 断言

如果没有声明变量类型，`let` 命令声明的变量，会被类型推断为 TypeScript 内置的基本类型之一；`const` 命令声明的变量，则被推断为值类型常量。

```ts
// 类型推断为基本类型 string
let s1 = 'JavaScript'

// 类型推断为字符串 “JavaScript”
const s2 = 'JavaScript'
```

有些时候，`let` 变量会出现一些意想不到的报错，变更成 `const` 变量就能消除报错。

```ts
let s = 'JavaScript'

type Lang = 'JavaScript' | 'TypeScript' | 'Python'

function setLang(language: Lang) {
  /* ... */
}

setLang(s) // 报错
```

一种解决方法就是把 `let` 命令改成 `const` 命令。

```ts
const s = 'JavaScript'
```

这样的话，变量 `s` 的类型就是值类型 `JavaScript`，它是联合类型 `Lang` 的子类型，传入函数 `setLang()` 就不会报错。

另一种解决方法是使用类型断言。TypeScript 提供了一种特殊的类型断言 `as const`，用于告诉编译器，推断类型时，可以将这个值推断为常量，即把 `let` 变量断言为 `const` 变量，从而把内置的基本类型变更为值类型。

```ts
let s = 'JavaScript' as const
setLang(s) // 正确
```

使用了 `as const` 断言以后，let 变量就不能再改变值了。

```ts
let s = 'JavaScript' as const
s = 'Python' // 报错
```

注意，`as const` 断言只能用于字面量，不能用于变量。

```ts
let s = 'JavaScript'
setLang(s as const) // 报错
```

另外，`as const` 也不能用于表达式。

```ts
let s = ('Java' + 'Script') as const // 报错
```

`as const` 也可以写成前置的形式。

```ts
// 后置形式
expr as const

// 前置形式
<const>expr
```

`as const` 断言可以用于整个对象，也可以用于对象的单个属性，这时它的类型缩小效果是不一样的。

```ts
const v1 = {
  x: 1,
  y: 2,
} // 类型是 { x: number; y: number; }

const v2 = {
  x: 1 as const,
  y: 2,
} // 类型是 { x: 1; y: number; }

const v3 = {
  x: 1,
  y: 2,
} as const // 类型是 { readonly x: 1; readonly y: 2; }
```

总之，`as const` 会将字面量的类型断言为不可变类型，缩小成 TypeScript 允许的最小类型。

下面是数组的例子。

```ts
// a1 的类型推断为 number[]
const a1 = [1, 2, 3]

// a2 的类型推断为 readonly [1, 2, 3]
const a2 = [1, 2, 3] as const
```

由于 `as const` 会将数组变成只读元组，所以很适合用于函数的 rest 参数。

```ts
function add(x: number, y: number) {
  return x + y
}

const nums = [1, 2]
const total = add(...nums) // 报错
```

事实上，对于固定参数个数的函数，如果传入的参数包含扩展运算符，那么扩展运算符只能用于元组。只有当函数定义使用了 rest 参数，扩展运算符才能用于数组。

解决方法就是使用 `as const` 断言，将数组变成元组。

```ts
const nums = [1, 2] as const
const total = add(...nums) // 正确
```

Enum 成员也可以使用 `as const` 断言。

```ts
enum Foo {
  X,
  Y,
}
let e1 = Foo.X // Foo
let e2 = Foo.X as const // Foo.X
```

## 非空断言

对于那些可能为空的变量（即可能等于 `undefined` 或 `null`），TypeScript 提供了非空断言，保证这些变量不会为空，写法是在变量名后面加上感叹号 `!`。

```ts
function f(x?:number|null) {
  validateNumber(x); // 自定义函数，确保 x 是数值
  console.log(x!.toFixed());
}

function validateNumber(e?:number|null) {
  if (typeof e !== 'number')
    throw new Error('Not a number');
}
```

非空断言在实际编程中很有用，有时可以省去一些额外的判断。

```ts
const root = document.getElementById('root')

// 报错
root.addEventListener('click', (e) => {
  /* ... */
})

// 正确
const root = document.getElementById('root')!
```

不过，非空断言会造成安全隐患，只有在确定一个表达式的值不为空时才能使用。比较保险的做法还是手动检查一下是否为空。

```ts
const root = document.getElementById('root')

if (root === null) {
  throw new Error('Unable to find DOM element #root')
}

root.addEventListener('click', (e) => {
  /* ... */
})
```

非空断言还可以用于赋值断言。TypeScript 有一个编译设置，要求类的属性必须初始化（即有初始值），如果不对属性赋值就会报错。

```ts
class Point {
  x: number // 报错
  y: number // 报错

  constructor(x: number, y: number) {
    // ...
  }
}
```

这时就可以使用非空断言，表示这两个属性肯定会有值，这样就不会报错了。

```ts
class Point {
  x!: number // 正确
  y!: number // 正确

  constructor(x: number, y: number) {
    // ...
  }
}
```

## 断言函数

断言函数是一种特殊函数，用于保证函数参数符合某种类型。如果函数参数达不到要求，就会抛出错误，中断程序执行；如果达到要求，就不进行任何操作，让代码按照正常流程运行。

```ts
function isString(value: unknown): void {
  if (typeof value !== 'string') throw new Error('Not a string')
}
```

下面是它的用法。

```ts
function toUpper(x: string | number) {
  isString(x)
  return x.toUpperCase()
}
```

传统的断言函数 `isString()` 的写法有一个缺点，它的参数类型是 `unknown`，返回值类型是 `void`（即没有返回值）。单单从这样的类型声明，很难看出 `isString()` 是一个断言函数。

为了更清晰地表达断言函数，TypeScript 3.7 引入了新的类型写法。

```ts
function isString(value: unknown): asserts value is string {
  if (typeof value !== 'string') throw new Error('Not a string')
}
```

使用了断言函数的新写法以后，TypeScript 就会自动识别，只要执行了该函数，对应的变量都为断言的类型。

注意，函数返回值的断言写法，只是用来更清晰地表达函数意图，真正的检查是需要开发者自己部署的。而且，如果内部的检查与断言不一致，TypeScript 也不会报错。

```ts
function isString(value: unknown): asserts value is string {
  if (typeof value !== 'number') throw new Error('Not a number')
}
```

另外，断言函数的 `asserts` 语句等同于 `void` 类型，所以如果返回除了 `undefined` 和 `null` 以外的值，都会报错。

```ts
function isString(value: unknown): asserts value is string {
  if (typeof value !== 'string') throw new Error('Not a string')
  return true // 报错
}
```

下面是另一个例子。

```ts
type AccessLevel = 'r' | 'w' | 'rw'

function allowsReadAccess(
  level: AccessLevel,
): asserts level is 'r' | 'rw' {
  if (!level.includes('r')) throw new Error('Read not allowed')
}
```

如果要断言参数非空，可以使用工具类型 `NonNullable<T>`。

```ts
function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`${value} is not defined`)
  }
}
```

如果要将断言函数用于函数表达式，可以采用下面的写法。根据 TypeScript 的[要求](https://github.com/microsoft/TypeScript/pull/33622#issuecomment-575301357)，这时函数表达式所赋予的变量，必须有明确的类型声明。

```ts
type AssertIsNumber = (value: unknown) => asserts value is number

const assertIsNumber: AssertIsNumber = (value) => {
  if (typeof value !== 'number') throw Error('Not a number')
}
```

注意，断言函数与类型保护函数（type guard）是两种不同的函数。它们的区别是，断言函数不返回值，而类型保护函数总是返回一个布尔值。

```ts
function isString(value: unknown): value is string {
  return typeof value === 'string'
}
```

如果要断言某个参数保证为真（即不等于 `false`、`undefined` 和 `null`），TypeScript 提供了断言函数的一种简写形式。

```ts
function assert(x: unknown): asserts x {
  // ...
}
```

同样的，参数为真的实际检查需要开发者自己实现。

```ts
function assert(x: unknown): asserts x {
  if (!x) {
    throw new Error(`${x} should be a truthy value.`)
  }
}
```

这种断言函数的简写形式，通常用来检查某个操作是否成功。

## 参考链接

- [Const Assertions in Literal Expressions in TypeScript](https://mariusschulz.com/blog/const-assertions-in-literal-expressions-in-typescript), Marius Schulz
- [Assertion Functions in TypeScript](https://mariusschulz.com/blog/assertion-functions-in-typescript), Marius Schulz
- [Assertion functions in TypeScript](https://blog.logrocket.com/assertion-functions-typescript/), Matteo Di Pirro
