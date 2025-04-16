# class

## 简介

类（class）是面向对象编程的基本构件，封装了属性和方法，TypeScript 给予了全面支持。

### 属性的类型

类的属性可以在顶层声明，也可以在构造方法内部声明。

对于顶层声明的属性，可以在声明时同时给出类型。

```ts
class Point {
  x: number
  y: number
}
```

如果不给出类型，TypeScript 会认为 `x` 和 `y` 的类型都是 `any`。

```ts
class Point {
  x
  y
}
```

如果声明时给出初值，可以不写类型，TypeScript 会自行推断属性的类型。

```ts
class Point {
  x = 0
  y = 0
}
```

TypeScript 有一个配置项 `strictPropertyInitialization`，只要打开（默认是打开的），就会检查属性是否设置了初值，如果没有就报错。

```ts
// 打开 strictPropertyInitialization
class Point {
  x: number; // 报错
  y: number; // 报错
}
```

如果不希望出现报错，可以使用非空断言。

```ts
class Point {
  x!: number
  y!: number
}
```

### readonly 修饰符

属性名前面加上 `readonly` 修饰符，就表示该属性是只读的。实例对象不能修改这个属性。

```ts
class A {
  readonly id = 'foo'
}

const a = new A()
a.id = 'bar' // 报错
```

`readonly` 属性的初始值，可以写在顶层属性，也可以写在构造方法里面。

```ts
class A {
  readonly id: string

  constructor() {
    this.id = 'bar' // 正确
  }
}
```

构造方法中修改只读属性的值也是可以的。或者说，如果两个地方都设置了只读属性的值，以构造方法为准。在其他方法修改只读属性都会报错。

```ts
class A {
  readonly id: string = 'foo'

  constructor() {
    this.id = 'bar' // 正确
  }
}
```

### 方法的类型

类的方法就是普通函数，类型声明方式与函数一致。

```ts
class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(point: Point) {
    return new Point(this.x + point.x, this.y + point.y)
  }
}
```

类的方法跟普通函数一样，可以使用参数默认值，以及函数重载。

```ts
class Point {
  x: number
  y: number

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}
```

下面是函数重载的例子。

```ts
class Point {
  constructor(x: number, y: string)
  constructor(s: string)
  constructor(xs: number | string, y?: string) {
    // ...
  }
}
```

另外，构造方法不能声明返回值类型，否则报错，因为它总是返回实例对象。

```ts
class B {
  constructor(): object {
    // 报错
    // ...
  }
}
```

### 存取器方法

存取器（accessor）是特殊的类方法，包括取值器（getter）和存值器（setter）两种方法。

它们用于读写某个属性，取值器用来读取属性，存值器用来写入属性。

```ts
class C {
  _name = ''
  get name() {
    return this._name
  }
  set name(value) {
    this._name = value
  }
}
```

`set name()` 是存值器，其中 `set `是关键词，`name` 是属性名。外部写入 `name` 属性时，实例对象会自动调用这个方法，并将所赋的值作为函数参数传入。

TypeScript 对存取器有以下规则。

（1）如果某个属性只有 `get` 方法，没有 `set` 方法，那么该属性自动成为只读属性。

```ts
class C {
  _name = 'foo'

  get name() {
    return this._name
  }
}

const c = new C()
c.name = 'bar' // 报错
```

（2）TypeScript 5.1 版之前，`set` 方法的参数类型，必须兼容 `get` 方法的返回值类型，否则报错。

```ts
// TypeScript 5.1 版之前
class C {
  _name = ''
  get name(): string {
    // 报错
    return this._name
  }
  set name(value: number) {
    this._name = String(value)
  }
}
```

改成下面这样，就不会报错。

```ts
class C {
  _name = ''
  get name(): string {
    return this._name
  }
  set name(value: number | string) {
    this._name = String(value)
  }
}
```

TypeScript 5.1 版做出了[改变](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-1.html#unrelated-types-for-getters-and-setters)，现在两者可以不兼容。

（3）`get` 方法与 `set` 方法的可访问性必须一致，要么都为公开方法，要么都为私有方法。

### 属性索引

类允许定义属性索引。

```ts
class MyClass {
  [s: string]: boolean | ((s: string) => boolean)

  get(s: string) {
    return this[s] as boolean
  }
}
```

注意，由于类的方法是一种特殊属性（属性值为函数的属性），所以属性索引的类型定义也涵盖了方法。如果一个对象同时定义了属性索引和方法，那么前者必须包含后者的类型。

```ts
class MyClass {
  [s: string]: boolean
  f() {
    // 报错
    return true
  }
}
```

正确的写法是下面这样。

```ts
class MyClass {
  [s: string]: boolean | (() => boolean)
  f() {
    return true
  }
}
```

属性存取器视同属性。

```ts
class MyClass {
  [s: string]: boolean

  get isInstance() {
    return true
  }
}
```

## 类的 interface 接口

### implements 关键字

`interface` 接口或 `type` 别名，可以用对象的形式，为 `class` 指定一组检查条件。然后，类使用 `implements` 关键字，表示当前类满足这些外部类型条件的限制。

```ts
interface Country {
  name: string
  capital: string
}
// 或者
type Country = {
  name: string
  capital: string
}

class MyCountry implements Country {
  name = ''
  capital = ''
}
```

`interface` 只是指定检查条件，如果不满足这些条件就会报错。它并不能代替 `class` 自身的类型声明。

```ts
interface A {
  get(name:string): boolean;
}

class B implements A {
  get(s) { // s 的类型是 any
    return true;
  }
}
```

`B` 类依然需要声明参数 `s` 的类型。

```ts
class B implements A {
  get(s: string) {
    return true
  }
}
```

下面是另一个例子

```ts
interface A {
  x: number
  y?: number
}

class B implements A {
  x = 0
}

const b = new B()
b.y = 10 // 报错
```

所以，`B` 类还是需要声明可选属性 `y`。

```ts
class B implements A {
  x = 0
  y?: number
}
```

同理，类可以定义接口没有声明的方法和属性。

```ts
interface Point {
  x: number;
  y: number;
}

class MyPoint implements Point {
  x = 1;
  y = 1;
  z:number = 1;
}
```

`implements` 关键字后面，不仅可以是接口，也可以是另一个类。这时，后面的类将被当作接口。

```ts
class Car {
  id: number = 1
  move(): void {}
}

class MyCar implements Car {
  id = 2 // 不可省略
  move(): void {} // 不可省略
}
```

注意，`interface` 描述的是类的对外接口，也就是实例的公开属性和公开方法，不能定义私有的属性和方法。这是因为 TypeScript 设计者认为，私有属性是类的内部实现，接口作为模板，不应该涉及类的内部代码写法。

```ts
interface Foo {
  private member: {} // 报错
}
```

### 实现多个接口

类可以实现多个接口（其实是接受多重限制），每个接口之间使用逗号分隔。

```ts
class Car implements MotorVehicle, Flyable, Swimmable {
  // ...
}
```

但是，同时实现多个接口并不是一个好的写法，容易使得代码难以管理，可以使用两种方法替代。

第一种方法是类的继承。

```ts
class Car implements MotorVehicle {}

class SecretCar extends Car implements Flyable, Swimmable {}
```

第二种方法是接口的继承。

```ts
interface A {
  a: number
}

interface B extends A {
  b: number
}
```

前一个例子可以用接口继承改写。

```ts
interface MotorVehicle {
  // ...
}
interface Flyable {
  // ...
}
interface Swimmable {
  // ...
}

interface SuperCar extends MotorVehicle, Flyable, Swimmable {
  // ...
}

class SecretCar implements SuperCar {
  // ...
}
```

注意，发生多重实现时（即一个接口同时实现多个接口），不同接口不能有互相冲突的属性。

```ts
interface Flyable {
  foo: number
}

interface Swimmable {
  foo: string
}
```

### 类与接口的合并

TypeScript 不允许两个同名的类，但是如果一个类和一个接口同名，那么接口会被合并进类。

```ts
class A {
  x: number = 1
}

interface A {
  y: number
}

let a = new A()
a.y = 10

a.x // 1
a.y // 10
```

注意，合并进类的非空属性（上例的 `y`），如果在赋值之前读取，会返回 `undefined`。

```ts
class A {
  x: number = 1
}

interface A {
  y: number
}

let a = new A()
a.y // undefined
```

TODO 未完待续...







