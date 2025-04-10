# 元组类型

## 简介

元组（tuple）是 TypeScript 特有的数据类型，JavaScript 没有单独区分这种类型。它表示成员类型可以自由设置的数组，即数组的各个成员的类型可以不同。

由于成员的类型可以不一样，所以元组必须明确声明每个成员的类型。

```ts
let x: [string, number];
x = ["hello", 10]; // OK
```

元组类型的写法，与数组有一个重大差异。数组的成员类型写在方括号外面（`number[]`），元组的成员类型是写在方括号里面（`[number]`）。TypeScript 的区分方法就是，成员类型写在方括号里面的就是元组，写在外面的就是数组。

```ts
// 数组
const a :number[] = [1];

// 元组
const t :[number] = [1];
```

使用元组时，必须明确给出类型声明，不能省略，否则 TypeScript 会把一个值自动推断为数组。

```ts
// a 的类型被推断为 (number | boolean)[]
const a = [1, true];
```

元组成员的类型可以添加问号后缀（`?`），表示该成员是可选的。

```ts
const x: [string, number, boolean?];
x = ["hello", 10]; // 第三个成员可以省略
```

注意，问号只能用于元组的尾部成员，也就是说，所有可选成员必须在必选成员之后。

由于需要声明每个成员的类型，所以大多数情况下，元组的成员数量是有限的，从类型声明就可以明确知道，元组包含多少个成员，越界的成员会报错。

```ts
const x: [string, number] = ["hello", 10];
x[2] = true; // 报错
```

但是，使用扩展运算符（`...`），可以表示不限成员数量的元组。

```ts
type NamedNums = [
  string,
  ...number[]
];

const a: NamedNums = ['A', 1, 2]; // OK
const b: NamedNums = ['B', 1, 2, 3]; // OK
```

扩展运算符（`...`）用在元组的任意位置都可以，它的后面只能是一个数组或

```ts
type t1 = [string, number, ...boolean[]];
type t2 = [string, ...boolean[], number];
type t3 = [...boolean[], string, number];
```

如果不确定元组成员的类型和数量，可以写成下面这样。

```ts
// 但是这样写，也就失去了使用元组和 TypeScript 的意义
type Tuple = [...any[]];
```

元组的成员可以添加成员名，这个成员名是说明性的，可以任意取名，来说明每个成员的含义。

```ts
type Color = [
  red: number,
  green: number,
  blue: number
];

const c:Color = [255, 255, 255];
```

元组可以通过方括号，读取成员类型。

```ts
type Tuple = [string, number];
type Name = Tuple[0]; // string
type Age = Tuple[1]; // number

// 由于元组的成员都是数值索引，即索引类型都是 number，所以也可以面这样读取。
type T = Tuple[number]; // string | number
```

## 只读元组

元组也可以是只读的，不允许修改，有两种写法。

```ts
type t = readonly [number, string]
// or
type t = Readonly<[number, string]>
```

跟数组一样，只读元组是元组的父类型。所以，元组可以替代只读元组，而只读元组不能替代元组。

```ts
type t1 = readonly [number, number];
type t2 = [number, number];

let x: t2 = [1, 2];
let y: t1 = x; // 正确

x = y; // 报错
```

由于只读元组不能替代元组，所以会产生一些令人困惑的报错。

```ts
function distanceFromOrigin([x, y]:[number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}

let point = [3, 4] as const;

distanceFromOrigin(point); // 报错

// 使用类型断言可以解决
distanceFromOrigin(
  point as [number, number]
)
```

## 成员数量的推断

如果没有可选成员和扩展运算符，TypeScript 会推断出元组的成员数量（即元组长度）。

```ts
function f(point: [number, number]) {
  // 元组 point 的长度是 2，不可能等于 3，这个判断无意义
  if (point.length === 3) {  // 报错
    // ...
  }
}
```

如果包含了可选成员，TypeScript 会推断出可能的成员数量。

```ts
function f(
  point:[number, number?, number?]
) {
  if (point.length === 4) { /* ... */ } // 报错
  if (point.length === 3) { /* ... */ } // 正确
  if (point.length === 2) { /* ... */ } // 正确
  if (point.length === 1) { /* ... */ } // 正确
  /* 
    此时 point.length 的类型是 1|2|3，不可能等于 4
  */
}
```

如果使用了扩展运算符，TypeScript 就无法推断出成员数量。

```ts
const myTuple:[...string[]]
  = ['a', 'b', 'c'];

if (myTuple.length === 4) { // 正确
  // ...
}
```

一旦扩展运算符使得元组的成员数量无法推断，TypeScript 内部就会把该元组当成数组处理。


## 扩展运算符与成员数量

扩展运算符（`...`）将数组（注意，不是元组）转换成一个逗号分隔的序列，这时 TypeScript 会认为这个序列的成员数量是不确定的，因为数组的成员数量是不确定的。

这导致如果函数调用时，使用扩展运算符传入函数参数，可能发生参数数量与数组长度不匹配的报错。

```ts
const arr = [1, 2];

function add(x:number, y:number){
  // ...
}

add(...arr) // 报错
/* 
  TypeScript 认为 ...arr 转换后的参数个数是不确定的
*/
```

有些函数可以接受任意数量的参数，这时使用扩展运算符就不会报错。

```ts
const arr = [1, 2, 3];
console.log(...arr) // 正确
```

解决这个问题的一个方法，就是把成员数量不确定的数组，写成成员数量确定的元组，再使用扩展运算符。

```ts
const arr:[number, number] = [1, 2];

function add(x:number, y:number){
  // ...
}

add(...arr) // 正确
```

另一种写法是使用`as const`断言。

```ts
const arr = [1, 2] as const;
// 这样 arr 的类型就变成了 readonly [1, 2]
```
