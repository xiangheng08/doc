# TS 小技巧

## 去除 keyof 的 symbol 和 number

只需要在 keyof 后面加上 & string 即可

```ts
type Obj = { a: number; b: string; c: boolean };

type T = keyof Obj & string; // "a" | "b" | "c"
```

## 防抖函数类型标注

防抖函数返回的函数是没有返回值的，且参数列表还需要和传入的函数保持一致，下面的方式通过两个泛型分别拿到参数列表和返回值，再通过手动设置返回值类型为 `void` 即可达到完全符合防抖函数的类型标注。

<!-- prettier-ignore -->
```ts
declare function debounce<T extends any[], R>(
  fn: (...args: T) => R,
  wait?: number
): (...args: T) => void;
```
