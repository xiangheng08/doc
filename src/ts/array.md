# 数组类型

## 简介

TypeScript 数组有一个根本特征：所有成员的类型必须相同，但是成员数量是不确定的，可以是无限数量的成员，也可以是零成员。

数组的类型有两种写法。第一种写法是在数组成员的类型后面，加上一对方括号，第二种写法是使用 TypeScript 内置的 Array 接口。

```ts
const arr: number[] = [1, 2, 3];
// or
const arr: Array<number> = [1, 2, 3];
```

如果数组成员的类型比较复杂，可以写在小括号里面。

```ts
const arr: (string | number)[] = [1, '2', 3];
// or
const arr: Array<string | number> = [1, '2', 3];

/* 
  这里的小括号是必须的，否则因为竖杠 | 的优先级低于 []
  TypeScript 会把 number|string[] 理解成 number 和 string[] 的联合类型
*/
```

如果数组成员可以是任意类型，写成 `any[]`。当然，这种写法是应该避免的。

```ts
const arr: any[] = [1, '2', true];
```

Array 接口写法本质上属于泛型。这种写法对于成员类型比较复杂的数组，代码可读性会稍微好一些。

```ts
const arr: Array<string | number> = [1, '2', 3];
```

数组类型声明了以后，成员数量是不限制的，任意数量的成员都可以，也可以是空数组。

```ts
let arr: number[] = [];
arr = [1, 2, 3];
arr = [1, 2, 3, 4, 5];
arr = [];
```

这种规定的隐藏含义就是，数组的成员是可以动态变化的。

```ts
let arr: number[] = [1, 2, 3];

arr[3] = 4;
arr.length = 2;

arr // [1, 2]
```

正是由于成员数量可以动态变化，所以  TypeScript 不会对数组边界进行检查，越界访问数组并不会报错。

```ts
const arr: number[] = [1, 2, 3];
const foo = arr[3]; // 这里在 ts 中不会报错
```

TypeScript 允许使用方括号读取数组成员的类型。

```ts
type Names = string[];
type Name = Names[0]; // string
```

由于数组成员的索引类型都是`number`，所以读取成员类型也可以写成下面这样。

```ts
type Names = string[];
type Name = Names[number]; // string
```

## 数组的类型推断

如果数组变量没有声明类型，TypeScript 就会推断数组成员的类型。这时，推断行为会因为值的不同，而有所不同。

如果变量的初始值是空数组，那么  TypeScript 会推断数组类型是 `any[]`。

```ts
const arr = [] // any[];
```

后面，为这个数组赋值时，TypeScript 会自动更新类型推断。

```ts
const arr = [];
arr // 推断为 any[]

arr.push(123);
arr // 推断类型为 number[]

arr.push('abc');
arr // 推断类型为 (string|number)[]
```

但是，类型推断的自动更新只发生初始值为空数组的情况。如果初始值不是空数组，类型推断就不会更新。

```ts
const arr = [123]; // 推断类型为 number[]

arr.push('abc'); // 报错
```

## 只读数组，const 断言

TypeScript 可在数组类型前面加上 `readonly` 关键字声明只读数组。

```ts
const arr: readonly number[] = [0, 1];

arr[1] = 2; // 报错
arr.push(3); // 报错
delete arr[0]; // 报错
```

TypeScript 将 `readonly number[]` 与 `number[]` 视为两种不一样的类型，后者是前者的子类型。

这是因为只读数组没有 `pop()`、`push()` 之类会改变原数组的方法，所以 `number[]` 的方法数量要多于 `readonly number[]`，这意味着 `number[]` 其实是 `readonly number[]` 的子类型。

我们知道，子类型继承了父类型的所有特征，并加上了自己的特征，所以子类型 `number[]` 可以用于所有使用父类型的场合，反过来就不行。


```ts
let a1: number[] = [0, 1];
let a2: readonly number[] = a1; // 正确

a1 = a2; // 报错
```

由于只读数组是数组的父类型，所以它不能代替数组。这一点很容易产生令人困惑的报错。

```ts
function getSum(s:number[]) {
  // ...
}

const arr:readonly number[] = [1, 2, 3];

getSum(arr) // 报错

/* 
  这里报错的原因就是只读数组是数组的父类型，父类型不能替代子类型
*/

// 可以使用类型断言解决
getSum(arr as number[]) // 正确
```

注意，`readonly` 关键字不能与数组的泛型写法一起使用。

```ts
const arr: readonly Array<number> = [0, 1]; // 报错
```

实际上，TypeScript 提供了两个专门的泛型，用来生成只读数组的类型。

```ts
const a1: ReadonlyArray<number> = [0, 1];

const a2: Readonly<number[]> = [0, 1];
```

只读数组还有一种声明方法，就是使用 “const 断言”。

```ts
const arr = [0, 1] as const;

arr[0] = [2]; // 报错 
```

## 多维数组

TypeScript 使用 `T[][]` 的形式，表示二维数组，`T` 是最底层数组成员的类型。

```ts
const multi: number[][] = [[1,2,3], [23,24,25]];
```
