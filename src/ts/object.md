# 对象类型

## 简介

除了原始类型，对象是 JavaScript 最基本的数据结构。TypeScript 对于对象类型有很多规则。

对象类型的最简单声明方法，就是使用大括号表示对象，在大括号内部声明每个属性和方法的类型。

```ts
const obj: {
  x: number;
  y: number;
} = { x: 1, y: 1 };
```

属性的类型可以用分号结尾，也可以用逗号结尾。

```ts
// 属性类型以分号结尾
type MyObj = {
  x: number;
  y: number;
};

// 属性类型以逗号结尾
type MyObj = {
  x: number,
  y: number,
};
```

最后一个属性后面，可以写分号或逗号，也可以不写。

一旦声明了类型，对象赋值时，就不能缺少指定的属性，也不能有多余的属性。

```ts
type MyObj = {
  x: number;
  y: number;
};

const o1: MyObj = { x: 1 }; // 报错
const o2: MyObj = { x: 1, y: 1, z: 1 }; // 报错
```

读写不存在的属性也会报错。

```ts
const obj: {
  x: number;
  y: number;
} = { x: 1, y: 1 };

console.log(obj.z); // 报错
obj.z = 1; // 报错
```

同样地，也不能删除类型声明中存在的属性，修改属性值是可以的。

```ts
const myUser = {
  name: 'Sabrina',
};

delete myUser.name; // 报错
myUser.name = 'Cynthia'; // 正确
```

对象的方法使用函数类型描述。

```ts
const obj: {
  x: number;
  y: number;
  add(x: number, y: number): number;
  // 或者写成
  // add: (x:number, y:number) => number;
} = {
  x: 1,
  y: 1,
  add(x, y) {
    return x + y;
  },
};
```

对象类型可以使用方括号读取属性的类型。

```ts
type User = {
  name: string;
  age: number;
};
type Name = User['name']; // string
```

除了 `type` 命令可以为对象类型声明一个别名，TypeScript 还提供了 `interface` 命令，可以把对象类型提炼为一个接口。

```ts
// 写法一
type MyObj = {
  x: number;
  y: number;
};

const obj: MyObj = { x: 1, y: 1 };

// 写法二
interface MyObj {
  x: number;
  y: number;
}

const obj: MyObj = { x: 1, y: 1 };
```

注意，TypeScript 不区分对象自身的属性和继承的属性，一律视为对象的属性。

```ts
interface MyInterface {
  toString(): string; // 继承的属性
  prop: number; // 自身的属性
}

const obj: MyInterface = {
  // 正确
  prop: 123,
};
```

## 可选属性

如果某个属性是可选的（即可以忽略），需要在属性名后面加一个问号。

```ts
const obj: {
  x: number;
  y?: number;
} = { x: 1 };
```

可选属性等同于允许赋值为 `undefined`，下面两种写法是等效的。

```ts
type User = {
  firstName: string;
  lastName?: string;
};
// 等同于
type User = {
  firstName: string;
  lastName?: string | undefined;
};
```

同样地，读取一个没有赋值的可选属性时，返回 `undefined`。

```ts
type MyObj = {
  x: string;
  y?: string;
};

const obj: MyObj = { x: 'hello' };
obj.y.toLowerCase(); // 报错
```

所以，读取可选属性之前，必须检查一下是否为 `undefined`。

```ts
const user: {
  firstName: string;
  lastName?: string;
} = { firstName: 'Foo' };

if (user.lastName !== undefined) {
  console.log(`hello ${user.firstName} ${user.lastName}`);
}
```

`lastName` 是可选属性，需要判断是否为 `undefined` 以后，才能使用。建议使用下面的写法。

```ts
// 写法一
let firstName = user.firstName === undefined ? 'Foo' : user.firstName;
let lastName = user.lastName === undefined ? 'Bar' : user.lastName;

// 写法二
let firstName = user.firstName ?? 'Foo';
let lastName = user.lastName ?? 'Bar';
```

TypeScript 提供编译设置 `ExactOptionalPropertyTypes`，只要同时打开这个设置和 `strictNullChecks`，可选属性就不能设为 `undefined`。

```ts
// 打开 ExactOptionsPropertyTypes 和 strictNullChecks
const obj: {
  x: number;
  y?: number;
} = { x: 1, y: undefined }; // 报错
```

注意，可选属性与允许设为 `undefined` 的必选属性是不等价的。

```ts
type A = { x: number; y?: number };
type B = { x: number; y: number | undefined };

const ObjA: A = { x: 1 }; // 正确
const ObjB: B = { x: 1 }; // 报错
```

## 只读属性

属性名前面加上 `readonly` 关键字，表示这个属性是只读属性，不能修改。

```ts
interface MyInterface {
  readonly prop: number;
}
```

```ts
const person: {
  readonly age: number;
} = { age: 20 };

person.age = 21; // 报错
```

只读属性只能在对象初始化期间赋值，此后就不能修改该属性。

```ts
type Point = {
  readonly x: number;
  readonly y: number;
};

const p: Point = { x: 0, y: 0 };

p.x = 100; // 报错
```

注意，如果属性值是一个对象，`readonly`修饰符并不禁止修改该对象的属性，只是禁止完全替换掉该对象。

```ts
interface Home {
  readonly resident: {
    name: string;
    age: number;
  };
}

const h: Home = {
  resident: {
    name: 'Vicky',
    age: 42,
  },
};

h.resident.age = 32; // 正确
h.resident = {
  name: 'Kate',
  age: 23,
}; // 报错
```

TODO 未完待续。。。
