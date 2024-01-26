# 类型标注模板

<!-- prettier-ignore -->
```ts
type JSTypeMap = {
  string: string;
  boolean: boolean;
  number: number;
  function: Function;
  object: Object;
  symbol: symbol;
};

type JSTypeName = keyof JSTypeMap;

type ArgsType<T extends JSTypeName[]> = {
  [I in keyof T]: JSTypeMap[T[I]];
};

declare function addImpl<T extends JSTypeName[]>(
  ...args: [
    ...T, 
    (...args: ArgsType<T>) => any
    ]
): void;

addImpl('number', 'boolean', 'string', (a, b, c) => {});
```
