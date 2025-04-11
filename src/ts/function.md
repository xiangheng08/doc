# 函数类型

## 简介

函数的类型声明，需要在声明函数时，给出参数的类型和返回值的类型。

```ts
function hello(txt: string): void {
    console.log('hello ' + txt);
}
```

函数 `hello()` 在声明时，需要给出参数 `txt` 的类型（string），以及返回值的类型（`void`）

如果不指定参数类型（比如上例不写 `txt` 的类型），TypeScript 就会推断参数类型，如果缺乏足够信息，就会推断该参数的类型为 `any`。

返回值的类型通常可以不写，因为 TypeScript 自己会推断出来。

```ts
function hello(txt: string) {
    console.log('hello ' + txt);
}
```

由于没有 `return` 语句，TypeScript 会推断出函数 `hello()` 没有返回值，即 `void`。

不过，有时候出于文档目的，或者为了防止不小心改掉返回值，还是会写返回值的类型。

如果变量被赋值为一个函数，变量的类型有两种写法。

```ts
// 写法一
const hello = function (txt: string) {
    console.log('hello ' + txt);
};

// 写法二
const hello: (txt: string) => void = function (txt) {
    console.log('hello ' + txt);
};
```

写法二有两个地方需要注意。

首先，函数的参数要放在圆括号里面，不放会报错。

其次，类型里面的参数名（本例是 `txt`）是必须的。有的语言的函数类型可以不写参数名（比如 C 语言），但是 TypeScript 不行。如果写成 `(string) => void` ，TypeScript 会理解成函数有一个名叫 string 的参数，并且这个 `string` 参数的类型是 `any`。

```ts
type MyFunc = (string, number) => number;
// 等同于 (string: any, number: any) => number
```

函数类型里面的参数名与实际参数名，可以不一致。

```ts
let f: (x: number) => number;

f = function (y: number) {
  return y;
};
```

如果函数的类型定义很冗长，或者多个函数使用同一种类型，写法二用起来就很麻烦。因此，往往用 `type` 命令为函数类型定义一个别名，便于指定给其他变量。

```ts
type MyFunc = (txt: string) => void;

const hello: MyFunc = function (txt) {
  console.log('hello ' + txt);
};

```

函数的实际参数个数，可以少于类型指定的参数个数，但是不能多于，即 TypeScript 允许省略参数。

```ts
let myFunc: (a: number, b: number) => number;

myFunc = (a: number) => a; // 正确

myFunc = (a: number, b: number, c: number) => a + b + c; // 报错
```

这是因为 JavaScript 函数在声明时往往有多余的参数，实际使用时可以只传入一部分参数。比如，数组的 `forEach()` 方法的参数是一个函数，该函数默认有三个参数 `(item, index, array) => void`，实际上往往只使用第一个参数 `(item) => void`。因此，TypeScript 允许函数传入的参数不足。

```ts
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // 正确
x = y; // 报错
```

如果一个变量要套用另一个函数类型，有一个小技巧，就是使用 `typeof` 运算符。

```ts
function add(x: number, y: number) {
    return x + y;
}

const myAdd: typeof add = function (x, y) {
    return x + y;
}
```

这是一个很有用的技巧，任何需要类型的地方，都可以使用 `typeof` 运算符从一个值获取类型。

函数类型还可以采用对象的写法。

```ts
let add: {
  (x: number, y: number): number;
};

add = function (x, y) {
  return x + y;
};
```

函数类型的对象写法如下。

```ts
{
  (参数列表): 返回值
}
```

注意，这种写法的函数参数与返回值之间，间隔符是冒号 `:`，而不是正常写法的箭头 `=>`，因为这里采用的是对象类型的写法，对象的属性名与属性值之间使用的是冒号。

这种写法平时很少用，但是非常合适用在两个场合：函数本身存在属性。

```ts
type FN = {
  (x: number): void;
  version: string;
};

const fn: FN = (x) => {
  console.log(x);
};
fn.version = '1.0.0';
```

第二个场合是，函数的重载。

```ts
type FN = {
  (x: number): void;
  (x: string): void;
};

const fn: FN = (x) => {
  console.log(x);
};
```

函数类型也可以使用 Interface 来声明。

```ts
interface FN {
  (a: number, b: number): number;
}

const add: FN = (a, b) => a + b;
```

## Function 类型

TypeScript 提供 Function 类型表示函数，任何函数都属于这个类型。

```ts
function doSomething(f: Function) {
  return f(1, 2, 3);
}
```

Function 类型的值都可以直接执行。

Function 类型的函数可以接受任意数量的参数，每个参数的类型都是 `any`，返回值的类型也是 `any`，代表没有任何约束，所以不建议使用这个类型，给出函数详细的类型声明会更好。


## 箭头函数

箭头函数是普通函数的一种简化写法，它的类型写法与普通函数类似。

```ts
const repeat = (str: string, times: number): string => str.repeat(times);
```

注意，类型写在箭头函数的定义里面，与使用箭头函数表示函数类型，写法有所不同。

```ts
function greet(fn: (a: string) => void): void {
  fn('world');
}
```

第二个例子。

```ts
type Person = { name: string };

const people = ['alice', 'bob', 'jan'].map((name): Person => ({ name }));
```

`map()` 方法的参数是一个箭头函数 `(name):Person => ({name})`，该箭头函数的参数 `name` 的类型省略了，因为可以从`map()` 的类型定义推断出来，箭头函数的返回值类型为 `Person`。相应地，变量 `people` 的类型是 `Person[]`。

至于箭头后面的 `({name})`，表示返回一个对象，该对象有一个属性 `name`，它的属性值为变量 `name` 的值。这里的圆括号是必须的，否则 `(name):Person => {name}` 的大括号表示函数体，即函数体内有一行语句 `name`，同时由于没有 `return`语句，这个函数不会返回任何值。

注意，下面两种写法都是不对的。

```ts
// 错误
(name: Person) => ({ name });

// 错误
name: (Person) => ({ name });
```

上面的两种写法在本例中都是错的。第一种写法表示，箭头函数的参数 `name` 的类型是 `Person`，同时没写函数返回值的类型，让 TypeScript 自己去推断。第二种写法中，函数参数缺少圆括号。

## 可选参数

如果函数的某个参数可以省略，则在参数名后面加问号表示。

```ts
function f(x?: number) {
  // ...
}

f(); // OK
f(10); // OK
```

参数名带有问号，表示该参数的类型实际上是 `原始类型|undefined`，它有可能为 `undefined`。比如，上例的 `x` 虽然类型声明为 `number`，但是实际上是 `number|undefined`。

```ts
function f(x?: number) {
  return x;
}

f(undefined); // 正确
```

但是，反过来就不成立，类型显式设为 `undefined` 的参数，就不能省略。

```ts
function f(x: number | undefined) {
  return x;
}

f(); // 报错
```

函数的可选参数只能在参数列表的尾部，跟在必选参数的后面。

```ts
let fn: (a?: number, b: number) => number; // 报错
```

如果前部参数有可能为空，这时只能显式注明该参数类型可能为 `undefined`。

```ts
let fn: (a: number | undefined, b: number) => number;
```

函数体内部用到可选参数时，需要判断该参数是否为 `undefined`。

```ts
let fn: (a: number, b?: number) => number;

fn = function (x, y) {
  if (y === undefined) {
    return x;
  }
  return x + y;
};
```

## 参数默认值

TypeScript 函数的参数默认值写法，与 JavaScript 一致。

设置了默认值的参数，就是可选的。如果不传入该参数，它就会等于默认值。

```ts
function createPoint(x: number = 0, y: number = 0): [number, number] {
  return [x, y];
}

createPoint(); // [0, 0]
```

上面代码中，参数 `x` 和 `y` 的默认值都是 `0`，调用 `createPoint()` 时，这两个参数都是可以省略的。这里其实可以省略 `x` 和 `y` 的类型声明，因为可以从默认值推断出来。

```ts
function createPoint(x = 0, y = 0) {
  return [x, y];
}
```

可选参数与默认值不能同时使用。

```ts
// 报错
function f(x?: number = 0) {
  // ...
}
```

设有默认值的参数，如果传入 `undefined`，也会触发默认值。

```ts
function f(x = 456) {
  return x;
}

f(undefined); // 456
```

具有默认值的参数如果不位于参数列表的末尾，调用时不能省略，如果要触发默认值，必须显式传入 `undefined`。

```ts
function add(x: number = 0, y: number) {
  return x + y;
}

add(1); // 报错
add(undefined, 1); // 正确
```

## 参数解构

函数参数如果存在变量解构，类型写法如下。

```ts
function f([x, y]: [number, number]) {
  // ...
}

function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
```

参数解构可以结合类型别名（type 命令）一起使用，代码会看起来简洁一些。


```ts
type ABC = { a: number; b: number; c: number };

function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
```

## rest 参数

rest 参数表示函数剩余的所有参数，它可以是数组（剩余参数类型相同），也可能是元组（剩余参数类型不同）。

```ts
// rest 参数为数组
function joinNumbers(...nums: number[]) {
  // ...
}

// rest 参数为元组
function f(...args: [boolean, number]) {
  // ...
}
```

注意，元组需要声明每一个剩余参数的类型。如果元组里面的参数是可选的，则要使用可选参数。

```ts
function f(...args: [boolean, string?]) {}
```

下面是一个 rest 参数的例子。

```ts
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
```

rest 参数甚至可以嵌套。

```ts
function f(...args: [boolean, ...string[]]) {
  // ...
}
```

rest 参数可以与变量解构结合使用。

```ts
function repeat(...[str, times]: [string, number]): string {
  return str.repeat(times);
}
// 等同于
function repeat(str: string, times: number): string {
  return str.repeat(times);
}
```

## readonly 只读参数

如果函数内部不能修改某个参数，可以在函数定义时，在参数类型前面加上 `readonly` 关键字，表示这是只读参数。

```ts
function arraySum(arr: readonly number[]) {
  // ...
  arr[0] = 0; // 报错
}
```

注意，`readonly` 关键字目前只允许用在数组和元组类型的参数前面，如果用在其他类型的参数前面，就会报错。

## void 类型

void 类型表示函数没有返回值。

```ts
function f(): void {
  console.log('hello');
}
```

如果返回其他值，就会报错。

```ts
function f(): void {
  return 123; // 报错
}
```

void 类型允许返回 `undefined`。

```ts
function f(): void {
  return undefined; // 正确
}

function f(): void {
  return null; // 正确
}
```

如果打开了 `strictNullChecks` 编译选项，那么 void 类型只允许返回 `undefined`。如果返回 `null`，就会报错。这是因为 JavaScript 规定，如果函数没有返回值，就等同于返回 `undefined`。

```ts
// 打开编译选项 strictNullChecks

function f(): void {
  return undefined; // 正确
}

function f(): void {
  return null; // 报错
}
```

需要特别注意的是，如果变量、对象方法、函数参数是一个返回值为 `void` 类型的函数，那么并不代表不能赋值为有返回值的函数。恰恰相反，该变量、对象方法和函数参数可以接受返回任意值的函数，这时并不会报错。

```ts
type voidFunc = () => void;

const f: voidFunc = () => {
  return 123;
};
```

这是因为，这时 TypeScript 认为，这里的 `void` 类型只是表示该函数的返回值没有利用价值，或者说不应该使用该函数的返回值。只要不用到这里的返回值，就不会报错。

这样设计是有现实意义的。举例来说，数组方法 `Array.prototype.forEach(fn)` 的参数 `fn` 是一个函数，而且这个函数应该没有返回值，即返回值类型是 `void`。

但是，实际应用中，很多时候传入的函数是有返回值，但是它的返回值不重要，或者不产生作用。

```ts
const src = [1, 2, 3];
const ret = [];

src.forEach((el) => ret.push(el));
```

如果后面使用了这个函数的返回值，就违反了约定，则会报错。

```ts
type voidFunc = () => void;

const f: voidFunc = () => {
  return 123;
};

f() * 2; // 报错
```

注意，这种情况仅限于变量、对象方法和函数参数，函数字面量如果声明了返回值是 `void` 类型，还是不能有返回值。

```ts
function f(): void {
  return true; // 报错
}

const f3 = function (): void {
  return true; // 报错
};
```

函数的运行结果如果是抛出错误，也允许将返回值写成 `void`。

```ts
function throwErr(): void {
  throw new Error('something wrong');
}
```

除了函数，其他变量声明为 `void` 类型没有多大意义，因为这时只能赋值为 `undefined` 或者 `null`（假定没有打开`strictNullChecks`) 。

```ts
let foo: void = undefined;

// 没有打开 strictNullChecks 的情况下
let bar: void = null;
```

## never 类型

`never` 类型表示肯定不会出现的值。它用在函数的返回值，就表示某个函数肯定不会返回值，即函数不会正常执行结束。

它主要有以下两种情况。

（1）抛出错误的函数。

```ts
function fail(msg: string): never {
  throw new Error(msg);
}
```

注意，只有抛出错误，才是 never 类型。如果显式用 `return` 语句返回一个 Error 对象，返回值就不是 never 类型。

```ts
function fail(): Error {
  return new Error('Something failed');
}
```

另外，由于抛出错误的情况属于 `never` 类型或 `void` 类型，所以无法从返回值类型中获知，抛出的是哪一种错误。

（2）无限执行的函数。

```ts
const sing = function (): never {
  while (true) {
    console.log('sing');
  }
};
```

注意，`never` 类型不同于 `void` 类型。前者表示函数没有执行结束，不可能有返回值；后者表示函数正常执行结束，但是不返回值，或者说返回 `undefined`。

```ts
// 正确
function sing(): void {
  console.log('sing');
}

// 报错
function sing(): never {
  console.log('sing');
}
```

如果一个函数抛出了异常或者陷入了死循环，那么该函数无法正常返回一个值，因此该函数的返回值类型就是 `never`。如果程序中调用了一个返回值类型为 `never` 的函数，那么就意味着程序会在该函数的调用位置终止，永远不会继续执行后续的代码。

```ts
function neverReturns(): never {
  throw new Error();
}

function f(x: string | undefined) {
  if (x === undefined) {
    neverReturns();
  }

  x; // 推断为 string
}
```

一个函数如果某些条件下有正常返回值，另一些条件下抛出错误，这时它的返回值类型可以省略 `never`。

```ts
function sometimesThrow(): number {
  if (Math.random() > 0.5) {
    return 100;
  }

  throw new Error('Something went wrong');
}

const result = sometimesThrow();
```

原因是前面章节提到过，`never` 是 TypeScript 的唯一一个底层类型，所有其他类型都包括了 `never`。从集合论的角度看，`number|never` 等同于 `number`。这也提示我们，函数的返回值无论是什么类型，都可能包含了抛出错误的情况。

## 局部类型

函数内部允许声明其他类型，该类型只在函数内部有效，称为局部类型。

```typescript
function hello(txt: string) {
  type message = string;
  let newTxt: message = 'hello ' + txt;
  return newTxt;
}

const newTxt: message = hello('world'); // 报错
```

上面示例中，类型 `message` 是在函数 `hello()` 内部定义的，只能在函数内部使用。在函数外部使用，就会报错。

## 高阶函数

一个函数的返回值还是一个函数，那么前一个函数就称为高阶函数（higher-order function）。

下面就是一个例子，箭头函数返回的还是一个箭头函数。

```ts
(someValue: number) => (multiplier: number) => someValue * multiplier;
```

## 函数重载

有些函数可以接受不同类型或不同个数的参数，并且根据参数的不同，会有不同的函数行为。这种根据参数类型不同，执行不同逻辑的行为，称为函数重载（function overload）。

```js
reverse('abc'); // 'cba'
reverse([1, 2, 3]); // [3, 2, 1]
```

这意味着，该函数内部有处理字符串和数组的两套逻辑，根据参数类型的不同，分别执行对应的逻辑。这就叫“函数重载”。

TypeScript 对于“函数重载”的类型声明方法是，逐一定义每一种情况的类型，最后给予完整的类型声明。

```ts
function reverse(str: string): string;
function reverse(arr: any[]): any[];
function reverse(stringOrArray: string | any[]): string | any[] {
  if (typeof stringOrArray === 'string') return stringOrArray.split('').reverse().join('');
  else return stringOrArray.slice().reverse();
}
```

有一些编程语言允许不同的函数参数，对应不同的函数实现。但是，JavaScript 函数只能有一个实现，必须在这个实现当中，处理不同的参数。因此，函数体内部就需要判断参数的类型及个数，并根据判断结果执行不同的操作。

```ts
function add(x: number, y: number): number;
function add(x: any[], y: any[]): any[];
function add(x: number | any[], y: number | any[]): number | any[] {
  if (typeof x === 'number' && typeof y === 'number') {
    return x + y;
  } else if (Array.isArray(x) && Array.isArray(y)) {
    return [...x, ...y];
  }

  throw new Error('wrong parameters');
}
```

注意，重载的各个类型描述与函数的具体实现之间，不能有其他代码，否则报错。

另外，虽然函数的具体实现里面，有完整的类型声明。但是，函数实际调用的类型，以前面的类型声明为准。比如，上例的函数实现，参数类型和返回值类型都是 `number|any[]` ，但不意味着参数类型为 `number `时返回值类型为 `any[]`。

函数重载的每个类型声明之间，以及类型声明与函数实现的类型之间，不能有冲突。

```ts
// 报错
function fn(x: boolean): void;
function fn(x: string): void;
function fn(x: number | string) {
  console.log(x);
}
```

重载声明的排序很重要，因为 TypeScript 是按照顺序进行检查的，一旦发现符合某个类型声明，就不再往下检查了，所以类型最宽的声明应该放在最后面，防止覆盖其他类型声明。

```ts
function f(x: any): number;
function f(x: string): 0 | 1;
function f(x: any): any {
  // ...
}

const a: 0 | 1 = f('hi'); // 报错
```

对象的方法也可以使用重载。

```ts
class StringBuilder {
  #data = '';

  add(num: number): this;
  add(bool: boolean): this;
  add(str: string): this;
  add(value: any): this {
    this.#data += String(value);
    return this;
  }

  toString() {
    return this.#data;
  }
}
```

函数重载也可以用来精确描述函数参数与返回值之间的对应关系。

```ts
function createElement(tag: 'a'): HTMLAnchorElement;
function createElement(tag: 'canvas'): HTMLCanvasElement;
function createElement(tag: 'table'): HTMLTableElement;
function createElement(tag: string): HTMLElement {
  // ...
}
```

这个示例的函数重载，也可以用对象表示。

```ts
type CreateElement = {
  (tag: 'a'): HTMLAnchorElement;
  (tag: 'canvas'): HTMLCanvasElement;
  (tag: 'table'): HTMLTableElement;
  (tag: string): HTMLElement;
};
```

由于重载是一种比较复杂的类型声明方法，为了降低复杂性，一般来说，如果可以的话，应该优先使用联合类型替代函数重载，除非多个参数之间、或者某个参数与返回值之间，存在对应关系。

```ts
// 写法一
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any): number {
  return x.length;
}

// 写法二
function len(x: any[] | string): number {
  return x.length;
}
```

## 构造函数

JavaScript 语言使用构造函数，生成对象的实例。

构造函数的最大特点，就是必须使用 `new` 命令调用。

```ts
const d = new Date();
```

构造函数的类型写法，就是在参数列表前面加上 `new` 命令。

```ts
class Animal {
  numLegs: number = 4;
}

type AnimalConstructor = new () => Animal;

function create(c: AnimalConstructor): Animal {
  return new c();
}

const a = create(Animal);
```

构造函数还有另一种类型写法，就是采用对象形式。

```ts
type F = {
  new (s: string): object;
};
```

某些函数既是构造函数，又可以当作普通函数使用，比如 `Date()`。这时，类型声明可以写成下面这样。

```ts
type F = {
  new (s: string): object;
  (n?: number): number;
};
```
