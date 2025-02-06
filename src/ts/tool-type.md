# TS 工具类型

## 自定义工具类型

### 属性部分可选

将对象的部分属性变成可选

```ts
type Optionalize<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
```

`Optionalize` 接受两个泛型，使用 `Omit` 移除指定的属性，然后使用 `Pick` 保留指定的属性，最后使用 `Partial` 把 `Pick` 返回的类型变成可选的。

### 属性部分必选

将对象的部分属性变成必选

```ts
type Requiredize<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
```

`Requiredize` 接受两个泛型，使用 `Omit` 移除指定的属性，然后使用 `Pick` 保留指定的属性，最后使用 `Required` 把 `Pick` 返回的类型变成必选的。

### 替换部分属性类型

```ts
type ReplacePropertyType<T, K extends keyof T, N> = Omit<T, K> & { [key in K]: N };
```

`ReplacePropertyType` 可以将 T 的部分属性的类型替换成 N 类型。

```ts
type Obj = { a: number; b: number; c: number };

type A = ReplacePropertyType<Obj, 'a' | 'b', string>;

// type A = { a: string, b: string, c: number }
```

### 合并类型

```ts
type MergeTypes<T, N> = Omit<T, keyof N> & N;
```

`MergeTypes` 可以将两个类型合并成一个类型。跟直接使用 & 不同的是，`MergeTypes` 会把 T 中和 N 重复的属性移除。

```ts
type Obj = { id: number; list: string | string[] };

type A = MergeTypes<Obj, { list: string[] }>;

// type A = { id: number, list: string[] }
```

### 排除 undefined

`ExcludeUndefined` 和 [`NonNullable`](#nonnullable-t-排除-null-和-undefined) 不同的是 `ExcludeUndefined` 只会排除 `undefined`。

```ts
type ExcludeUndefined<T> = T extends undefined ? never : T;

type A = ExcludeUndefined<string | null | undefined>;

// type A = string | null
```

### 联合类型转交叉类型

```ts
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;

type Test = { a: string } | { b: number } | { c: boolean };

type Test2 = UnionToIntersection<Test>;
// type Test2 = { a: string } & { b: number } & { c: boolean };
```

### 深度 Readonly

```ts
type DeepReadonly<T> =
  T extends Function ? T : // 函数类型保持不变
  T extends object ?
    T extends Array<infer U> ? ReadonlyArray<DeepReadonly<U>> : // 处理数组
    { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

// 仅考虑对象
type DeepReadonly<T> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>;
}
```

## 内置的工具类型

### `Partial<T>` 属性变可选

用于将类型 `T` 中的所有属性设置为可选。

```ts
type A = Partial<{ foo: number; bar: string }>;

// type A = { foo?: number, bar?: string }
```

### `Required<T>` 属性变必选

与 `Partial` 相反，将类型 `T` 中的所有属性设置为必选。

```ts
type A = Required<{ foo?: number; bar?: string }>;

// type A = { foo: number, bar: string }
```

### `Readonly<T>` 属性变只读

将类型 `T` 中的所有属性设置为只读。

-   示例： `Readonly<{ foo: number, bar: string }>` 将变成 `{ readonly foo: number, readonly bar: string }`。

```ts
type A = Readonly<{ foo: number; bar: string }>;

/* 
type A = {
  readonly foo: number;
  readonly bar: string;
}
*/
```

### `Record<K, T>`

创建一个具有键类型 `K` 和值类型 `T` 的新对象类型。

```ts
type A = Record<'foo' | 'bar', string>;

/* 
type A = {
  foo: string;
  bar: string;
}
*/

type B = Record<string, number>;

/* 
type B = {
  [key: string]: number;
}
*/
```

### `Pick<T, K>` 提取属性

从类型 `T` 中选取一组属性 `K`。

```ts
type Obj = { foo: number; bar: string; baz: boolean };

type A = Pick<Obj, 'foo' | 'bar'>;
/* 
type A = {
  foo: number;
  bar: string;
}
*/
```

### `Omit<T, K>` 去除属性

从类型 `T` 中移除一组属性 `K` 。

```ts
type Obj = { foo: number; bar: string; baz: boolean };

type A = Omit<Obj, 'foo' | 'bar'>;

/* 
type A = {
    baz: boolean;
}
*/
```

### `Exclude<T, U>` 排除

从类型 `T` 中排除可以赋值给类型 `U` 的所有属性。

```ts
type Union = 'a' | 'b' | 'c';

type A = Exclude<Union, 'a'>;

// type A = "b" | "c"
```

### `Extract<T, U>` 提取

从类型 `T` 中提取可以赋值给类型 `U` 的所有属性。

```ts
type Union = 'a' | 'b' | 'c' | 'd';

type A = Extract<Union, 'a' | 'd'>;

// type A = "a" | "d"
```

### `NonNullable<T>` 排除 `null` 和 `undefined`

从类型 `T` 中排除 `null` 和 `undefined`。

```ts
type Union = string | number | null | undefined;

type A = NonNullable<Union>;

// type A = string | number
```

### `ReturnType<T>` 获取函数类型返回值类型

获取函数类型 `T` 的返回类型。

```ts
type Fn = () => number;

type A = ReturnType<Fn>;

// type A = number
```

### `Parameters<T>` 获取函数类型参数类型元组

获取函数类型 `T` 的参数类型元组。

```ts
type Fn = (a: number, b: string) => void;

type A = Parameters<Fn>;

// type A = [a: number, b: string]
```

### `ConstructorParameters<T>` 获取构造函数参数类型元组

获取构造函数类型 `T` 的参数类型组成的元组类型。

```ts
class C {
	constructor(a: number, b: string) {}
}

type A = ConstructorParameters<typeof C>;

// type A = [a: number, b: string]
```

### `InstanceType<T>` 获取构造函数类型实例类型

获取构造函数类型 `T` 的实例类型。

```ts
class Person {
	constructor(name: string, age: number) {}
}

type A = InstanceType<typeof Person>;

// type A = Person
```

### `Uppercase<T>` 转大写

将字符串类型 `T` 中的所有字符转换为大写。

```ts
type S = 'hello';
type A = Uppercase<S>; // 'HELLO'
```

### `Lowercase<T>` 转小写

将字符串类型 `T` 中的所有字符转换为小写。

```ts
type S = 'HELLO';
type A = Lowercase<S>; // 'hello'
```

### `Capitalize<T>` 首字符大写

将字符串类型 `T` 的第一个字符转换为大写。

```ts
type S = 'hello';
type A = Capitalize<S>; // 'Hello'
```

### `Uncapitalize<T>` 首字符小写

将字符串类型 `T` 的第一个字符转换为小写。

```ts
type S = 'Hello';
type A = Uncapitalize<S>; // 'hello'
```
