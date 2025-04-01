# 类型系统

TypeScript 继承了 JavaScript 的类型，在这个基础上，又定义了一套自己的类型系统。

## 基本类型

TypeScript 的基本类型有：
- number
- string
- boolean
- symbol
- bigint
- object
- null
- undefined

因为 TypeScript 继承了 JavaScript 的类型设计，所以以上的类型和 JavaScript 的基本类型是一样的。

注意，这些类型在 TypeScript 中是全小写的，如果是驼峰，即 `number` 和 `Number` 是不同的类型。`Number` 表示的是 `number` 的包装类型，`number` 表示的是原始类型。

另外 `null` 和 `undefined` 既可以作为值，也可以作为类型，这取决于用在哪里。


### number

`number` 类型包含所有整数和浮点数。

```ts
const x:number = 123; // 整数
const y:number = 3.14; // 浮点数
const z:number = 0xffff; // 十六进制
```


### string

`string` 类型包含所有字符串。

```ts
const a:string = "world";
const b:string = `hello ${y}`;
```

### boolean

`boolean` 类型包含 `true` 和 `false`。

```ts
const a:boolean = true;
const b:boolean = false;
```

### symbol

`symbol` 类型包含所有 Symbol 值。

```ts
const a:symbol = Symbol();
```

### bigint

`bigint` 类型包含所有的大整数。

```ts
const a:bigint = 123n;
const b:bigint = 0xffffn;
```

注意：`bigint` 与 `number` 类型不兼容。

```ts
const a:bigint = 123; // 报错
const b:bigint = 0xffff;// 报错
```

`array` 类型既可以用 `T[]` 表示，也可以用 `Array<T>` 表示。

### object

`object` 类型包含了所有对象、数组和函数。

```ts
const a:object = { foo: 123 };
const b:object = [1, 2, 3];
const c:object = (n: number) => n + 1;
```

### null 和 undefined

`undefined` 和 `null` 是两种独立类型，它们各自都只有一个值。

```ts
let a:undefined = undefined;
//        ^           ^
//       类型         值
```

```ts
const a:null = null;
```

同上：第一个 `null` 表示类型，第二个表示值。

注意，如果没有声明类型的变量，被赋值为 `undefined` 或 `null`，在关闭编译设置 `noImplicitAny` 和 `strictNullChecks` 时，它们的类型会被推断为 `any`。

```ts
// 关闭 noImplicitAny 和 strictNullChecks

let a = undefined;   // any
const b = undefined; // any

let c = null;        // any
const d = null;      // any
```

如果希望避免这种情况，则需要打开编译选项 `strictNullChecks`。

```ts
// 打开编译设置 strictNullChecks

let a = undefined;   // undefined
const b = undefined; // undefined

let c = null;        // null
const d = null;      // null
```

## 包装对象类型

### 包装对象的概念

在 JavaScript 中，除 `undefined` 和 `null` 两个特殊值，`object` 属于复合类型，剩下的五种属于原始类型（primitive value），代表最基本的、不可再分的值。

- `number`
- `string`
- `boolean`
- `symbol`
- `bigint`

上面这五种原始类型的值，都有对应的包装对象（wrapper object）。所谓“包装对象”，指的是这些值在需要时，会自动产生的对象。

```ts
'hello'.charAt(1) // 'e'
```

在上面的代码中，`'hello'` 是一个字符串，它属于原始类型，所以它没有 `charAt` 方法。但是，当它被用在字符串上下文中时，它就会自动被转换为字符串的包装对象，然后调用 `charAt` 方法，所以 `charAt` 方法其实是在字符串包装对象上的。

这样的设计大大方便了字符串处理，省去了将原始类型的值手动转成对象实例的麻烦。

五种包装对象之中，`symbol` 类型和 `bigint` 类型无法直接获取它们的包装对象（即 `Symbol()` 和 `BigInt()` 不能作为构造函数使用），但是剩下三种可以。

- `Number()`
- `String()`
- `Boolean()`

以上三个构造函数，执行后可以直接获取某个原始类型值的包装对象。

```ts
const a = new String('hello');
typeof a // 'object'
a.charAt(1) // 'e'
```

上面示例中，`s` 就是字符串 `hello` 的包装对象，`typeof` 运算符返回 `object`，不是 `string`，但是本质上它还是字符串，可以使用所有的字符串方法。

注意，`String()` 只有当作构造函数使用时（即带有 `new` 命令调用），才会返回包装对象。如果当作普通函数使用（不带有 `new` 命令），返回就是一个普通字符串。其他两个构造函数 `Number()` 和 `Boolean()` 也是如此。

### 包装对象类型与字面量类型

由于包装对象的存在，导致每一个原始类型的值都有包装对象和字面量两种情况。

```ts
'hello' // 字面量
new String('hello') // 包装对象
```

上面的代码中，第一行是字面量，第二行是包装对象，它们都是字符串。

为了区分这两种情况，TypeScript 对五种原始类型分别提供了大写和小写两种类型。

- `number` -> `Number`
- `string` -> `String`
- `boolean` -> `Boolean`
- `symbol` -> `Symbol`
- `bigint` -> `BigInt`

其中，大写类型同时包含包装对象和字面量两种情况，小写类型只包含字面量，不包含包装对象。

```ts
const s1:String = 'hello'; // 正确
const s2:String = new String('hello'); // 正确

const s3:string = 'hello'; // 正确
const s4:string = new String('hello'); // 报错
```

上面的代码中，`String` 类型可以赋值为字符串的字面量，也可以赋值为包装对象。但是，`string` 类型只能赋值为字面量，赋值为包装对象就会报错。

建议只使用小写类型，不使用大写类型。因为绝大部分使用原始类型的场合，都是使用字面量，不使用包装对象。而且，TypeScript 把很多内置方法的参数，定义成小写类型，使用大写类型会报错。

```ts
const n1:number = 1;
const n2:Number = 1;

Math.abs(n1) // 1
Math.abs(n2) // 报错
// Math.abs() 方法的参数类型被定义成小写的 number，传入大写的 Number 类型就会报错
```

`Symbol()` 和 `BigInt()` 这两个函数不能当作构造函数使用，所以没有办法直接获得 `symbol` 类型和 `bigint` 类型的包装对象，除非使用下面的写法。但是，它们没有使用场景，因此 `Symbol` 和 `BigInt` 这两个类型虽然存在，但是完全没有使用的理由。

```ts
// 这样得到的就是 Symbol 和 BigInt 的包装对象，但是没有使用的意义。
let a = Object(Symbol());
let b = Object(BigInt());
```

注意，目前在 TypeScript 里面， `symbol` 和 `Symbol` 两种写法没有差异，`bigint` 和 `BigInt` 也是如此。建议始终使用小写的 `symbol` 和 `bigint`，不使用大写的 `Symbol` 和 `BigInt`。

## Object 类型与 object 类型

TypeScript 的对象类型也有大写 `Object` 和小写 `object` 两种。

### Object 类型

```ts
let obj:Object;

// 下面这些都是合法的 Object 类型
obj = true;
obj = 'hi';
obj = 1;
obj = { foo: 123 };
obj = [1, 2];
obj = (a:number) => a + 1;
```

事实上，除了 `undefined` 和 `null` 这两个值不能转为对象，其他任何值都可以赋值给 `Object` 类型。

```ts
let obj:Object;

obj = undefined; // 报错
obj = null; // 报错
```

另外，空对象 `{}` 是 `Object` 类型的简写形式，所以使用 `Object` 时常常用空对象代替。

```ts
let obj:{};

// 和使用 Object 一样
obj = true;
obj = 'hi';
obj = 1;
obj = { foo: 123 };
obj = [1, 2];
obj = (a:number) => a + 1;
```

显然，无所不包的 `Object` 类型既不符合直觉，也不方便使用。

### object 类型

小写的 `object` 类型代表 JavaScript 里面的狭义对象，即可以用字面量表示的对象，只包含对象、数组和函数，不包括原始类型的值。

```ts
let obj:object;
 
obj = { foo: 123 };
obj = [1, 2];
obj = (a:number) => a + 1;
obj = true; // 报错
obj = 'hi'; // 报错
obj = 1; // 报错
```

大多数时候，我们使用对象类型，只希望包含真正的对象，不希望包含原始类型。所以，建议总是使用小写类型 `object，不使用大写类型` `Object`。

注意，无论是大写的 `Object` 类型，还是小写的 `object` 类型，都只包含 JavaScript 内置对象原生的属性和方法，用户自定义的属性和方法都不存在于这两个类型之中。

```ts
const o1:Object = { foo: 0 };
const o2:object = { foo: 0 };

o1.toString() // 正确
o1.foo // 报错

o2.toString() // 正确
o2.foo // 报错
```

## undefined 和 null 的特殊性

`undefined` 和 `null` 既是值，又是类型。

作为值，它们有一个特殊的地方：任何其他类型的变量都可以赋值为 `undefined` 或 `null`。

```ts
let age:number = 24;

age = null;      // 正确
age = undefined; // 正确
```

这并不是因为 `undefined` 和 `null` 包含在 number 类型里面，而是故意这样设计，任何类型的变量都可以赋值为 `undefined` 和 `null`，以便跟 JavaScript 的行为保持一致。

JavaScript 的行为是，变量如果等于 `undefined` 就表示还没有赋值，如果等于 `null` 就表示值为空。所以，TypeScript 就允许了任何类型的变量都可以赋值为这两个值。

但是有时候，这并不是开发者想要的行为，也不利于发挥类型系统的优势。

```ts
const obj:object = undefined;
obj.toString() // 编译不报错，运行就报错
```

为了避免这种情况，及早发现错误，TypeScript 提供了一个编译选项 `strictNullChecks`。只要打开这个选项，`undefined` 和 `null` 就不能赋值给其他类型的变量（除了 `any` 类型和 `unknown` 类型）。

```ts
// 开启 strictNullChecks 选项
let age:number = 24;

age = null;      // 报错
age = undefined; // 报错
```

```bash
# 命令行
tsc --strictNullChecks index.ts
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "strictNullChecks": true
    // ...
  }
}
```

总之，打开 `strictNullChecks` 以后，`undefined` 和 `null` 只能赋值给自身，或者 `any` 类型和 `unknown` 类型的变量。

```ts
let x:any = undefined;
let y:unknown = null;
```

## 值类型

TypeScript 规定，单个值也是一种类型，称为“值类型”。

```ts
let x:'hello';

x = 'hello'; // 正确
x = 'world'; // 报错
```

TypeScript 推断类型时，遇到 `const` 声明的变量，如果代码里面没有注明类型，就会推断该变量是值类型。

```ts
// x 的类型是 "https"
const x = 'https';

// y 的类型是 string
const y:string = 'https';
```

这样推断是合理的，因为 `const` 声明的变量，一旦声明就不能改变，相当于常量。值类型就意味着不能赋为其他值。

注意，`const` 命令声明的变量，如果赋值为对象，并不会推断为值类型。

```ts
// x 的类型是 { foo: number }
const x = { foo: 1 };
```

## 联合类型

联合类型（union types）指的是多个类型组成的一个新类型，使用符号|表示。

联合类型 `A|B` 表示，任何一个类型只要属于 `A` 或 `B`，就属于联合类型 `A|B`。

```ts
let x:string|number;

x = 123; // 正确
x = 'abc'; // 正确
```

联合类型可以与值类型相结合，表示一个变量的值有若干种可能。

```ts
let gender:'male'|'female';

let rainbowColor:'赤'|'橙'|'黄'|'绿'|'青'|'蓝'|'紫';
```

```ts
// 如果某个变量可能为 null，那么使用联合类型无疑是最好的选择
let name:string|null;

name = 'John';
name = null;
```

联合类型的第一个成员前面，也可以加上竖杠|，这样便于多行书写。

```ts
let x:
  | 'one'
  | 'two'
  | 'three'
  | 'four';
```

如果一个变量有多种类型，读取该变量时，往往需要进行“类型缩小”（type narrowing），区分该值到底属于哪一种类型，然后再进一步处理。

```ts
function printId(
  id:number|string
) {
  console.log(id.toUpperCase()); // 报错
}
```

解决方法就是对参数id做一下类型缩小，确定它的类型以后再进行处理。

```ts
function printId(
  id:number|string
) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}
```

“类型缩小”是 TypeScript 处理联合类型的标准方法，凡是遇到可能为多种类型的场合，都需要先缩小类型，再进行处理。实际上，联合类型本身可以看成是一种“类型放大”（type widening），处理时就需要“类型缩小”（type narrowing）。

```ts
function getPort(
  scheme: 'http'|'https'
) {
  switch (scheme) {
    case 'http':
      return 80;
    case 'https':
      return 443;
  }
}
```

## 交叉类型

交叉类型（intersection types）指的多个类型组成的一个新类型，使用符号 `&` 表示。

交叉类型 `A&B` 表示，任何一个类型必须同时属于 `A` 和 `B`，才属于交叉类型 `A&B`，即交叉类型同时满足 `A` 和 `B` 的特征。

```ts
// 这里变量 x 同时是数值和字符串，这当然是不可能的，所以 TypeScript 会认为x的类型实际是 never。
let x: number & string; // never
```

交叉类型的主要用途是表示对象的合成。

```ts
let obj:
  { foo: string } &
  { bar: string };

obj = {
  foo: 'hello',
  bar: 'world'
};
```

交叉类型常常用来为对象类型添加新属性。

```ts
type A = { foo: number };

// 类型 B 是一个交叉类型，用来在 A 的基础上增加了属性 bar。
type B = A & { bar: number };
```

# type 命令

`type` 命令用来定义一个类型的别名。

```ts
// 定义一个 Age 类型别名
type Age = number;
```

别名可以让类型的名字变得更有意义，也能增加代码的可读性，还可以使复杂类型用起来更方便，便于以后修改变量的类型。

别名不允许重名。

```ts
type Color = 'red';
type Color = 'blue'; // 报错
```

别名的作用域是块级作用域。这意味着，代码块内部定义的别名，影响不到外部。

```ts
type Color = 'red';

if (Math.random() < 0.5) {
  type Color = 'blue';
}
```

别名支持使用表达式，也可以在定义一个别名时，使用另一个别名，即别名允许嵌套。

```ts
type World = "world";
type Greeting = `hello ${World}`;
```

`type` 命令属于类型相关的代码，编译成 JavaScript 的时候，会被全部删除。

## typeof 运算符

在 JavaScript 中，typeof 运算符是一个一元运算符，返回一个字符串，代表操作数的类型。

```js
typeof 'foo'; // 'string'
```

注意，这时 `typeof` 的操作数是一个值。

JavaScript 里面，`typeof` 运算符只可能返回八种结果，而且都是字符串。

```ts
typeof xxx; // 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function'
```

TypeScript 将 `typeof` 运算符移植到了类型运算，它的操作数依然是一个值，但是返回的不是字符串，而是该值的 TypeScript 类型。

```ts
const a = { x: 0 };

type T0 = typeof a;   // { x: number }
type T1 = typeof a.x; // number
```

这种用法的 `typeof` 返回的是 TypeScript 类型，所以只能用在类型运算之中（即跟类型相关的代码之中），不能用在值运算。

也就是说，同一段代码可能存在两种 `typeof` 运算符，一种用在值相关的 JavaScript 代码部分，另一种用在类型相关的 TypeScript 代码部分

```ts
// 这里用到了两个 typeof，第一个是类型运算，第二个是值运算。它们是不一样的，不要混淆。
let a = 1;
let b:typeof a;

if (typeof a === 'number') {
  b = a;
}
```

JavaScript 的 `typeof` 遵守 JavaScript 规则，TypeScript 的 `typeof` 遵守 TypeScript 规则。它们的一个重要区别在于，编译后，前者会保留，后者会被全部删除。

由于编译时不会进行 JavaScript 的值运算，所以 TypeScript 规定，`typeof` 的参数只能是标识符，不能是需要运算的表达式。

```ts
// 这里 Date() 需要运算才知道结果，所以会报错
type T = typeof Date(); // 报错
```

另外，`typeof` 命令的参数不能是类型。

```ts
type Age = number;
type MyAge = typeof Age; // 报错
```

`typeof` 是一个很重要的 TypeScript 运算符，有些场合不知道某个变量的类型，这时使用 `typeof xxx` 就可以获得它的类型。

## 块级类型声明

TypeScript 支持块级类型声明，即类型可以声明在代码块（用大括号表示）里面，并且只在当前代码块有效。

```ts
if (true) {
  type T = number;
  let v:T = 5;
} else {
  type T = string;
  let v:T = 'hello';
}
```

## 类型的兼容

TypeScript 的类型存在兼容关系，某些类型可以兼容其他类型。

```ts
type T = number|string;

let a:number = 1;
let b:T = a;

/* 
  变量a和b的类型是不一样的，但是变量a赋值给变量b并不会报错。
  这时，我们就认为，b的类型兼容a的类型。
*/
```

TypeScript 为这种情况定义了一个专门术语。如果类型 `A` 的值可以赋值给类型 `B`，那么类型 `A` 就称为类型 `B` 的子类型（subtype）。在上例中，类型 `number` 就是类型 `number|string` 的子类型。

TypeScript 的一个规则是，凡是可以使用父类型的地方，都可以使用子类型，但是反过来不行。

```ts
let a:'hi' = 'hi';
let b:string = 'hello';

b = a; // 正确
a = b; // 报错
```
之所以有这样的规则，是因为子类型继承了父类型的所有特征，所以可以用在父类型的场合。但是，子类型还可能有一些父类型没有的特征，所以父类型不能用在子类型的场合。
