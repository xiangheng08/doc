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

## Class 类型

### 实例类型

TypeScript 的类本身就是一种类型，但是它代表该类的实例类型，而不是 class 的自身类型。

```ts
class Color {
  name: string

  constructor(name: string) {
    this.name = name
  }
}

const green: Color = new Color('green')
```

对于引用实例对象的变量来说，既可以声明类型为 Class，也可以声明类型为 interface，因为两者都代表实例对象的类型。

```ts
interface MotorVehicle {}

class Car implements MotorVehicle {}

// 写法一
const c1: Car = new Car()
// 写法二
const c2: MotorVehicle = new Car()
```

作为类型使用时，类名只能表示实例的类型，不能表示类的自身类型。

```ts
class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

// 错误
function createPoint(PointClass: Point, x: number, y: number) {
  return new PointClass(x, y)
}
```

由于类名作为类型使用，实际上代表一个对象，因此可以把类看作为对象类型起名。事实上，TypeScript 有三种方法可以为对象类型起名：`type`、`interface` 和 `class`。

### 类的自身类型

要获得一个类的自身类型，一个简便的方法就是使用 `typeof` 运算符。

```ts
function createPoint(
  PointClass: typeof Point,
  x: number,
  y: number,
): Point {
  return new PointClass(x, y)
}
```

JavaScript 语言中，类只是构造函数的一种语法糖，本质上是构造函数的另一种写法。所以，类的自身类型可以写成构造函数的形式。

```ts
function createPoint(
  PointClass: new (x: number, y: number) => Point,
  x: number,
  y: number,
): Point {
  return new PointClass(x, y)
}
```

构造函数也可以写成对象形式，所以参数 `PointClass` 的类型还有另一种写法。

```ts
function createPoint(
  PointClass: {
    new (x: number, y: number): Point
  },
  x: number,
  y: number,
): Point {
  return new PointClass(x, y)
}
```

根据上面的写法，可以把构造函数提取出来，单独定义一个接口（`interface`），这样可以大大提高代码的通用性。

```ts
interface PointConstructor {
  new (x: number, y: number): Point
}

function createPoint(
  PointClass: PointConstructor,
  x: number,
  y: number,
): Point {
  return new PointClass(x, y)
}
```

总结一下，类的自身类型就是一个构造函数，可以单独定义一个接口来表示。

### 结构类型原则

Class 也遵循“结构类型原则”。一个对象只要满足 Class 的实例结构，就跟该 Class 属于同一个类型。

```ts
class Foo {
  id!: number
}

function fn(arg: Foo) {
  // ...
}

const bar = {
  id: 10,
  amount: 100,
}

fn(bar) // 正确
```

如果两个类的实例结构相同，那么这两个类就是兼容的，可以用在对方的使用场合。

```ts
class Person {
  name: string
}

class Customer {
  name: string
}

// 正确
const cust: Customer = new Person()
```

现在修改一下代码，`Person` 类添加一个属性。

```ts
class Person {
  name: string
  age: number
}

class Customer {
  name: string
}

// 正确
const cust: Customer = new Person()
```

这是因为根据“结构类型原则”，只要 `Person` 类具有 `name` 属性，就满足 `Customer` 类型的实例结构，所以可以代替它。反过来就不行，如果 `Customer` 类多出一个属性，就会报错。

```ts
class Person {
  name: string
}

class Customer {
  name: string
  age: number
}

// 报错
const cust: Customer = new Person()
```

总之，只要 A 类具有 B 类的结构，哪怕还有额外的属性和方法，TypeScript 也认为 A 兼容 B 的类型。

不仅是类，如果某个对象跟某个 class 的实例结构相同，TypeScript 也认为两者的类型相同。

```ts
class Person {
  name: string
}

const obj = { name: 'John' }
const p: Person = obj // 正确
```

由于这种情况，运算符 `instanceof` 不适用于判断某个对象是否跟某个 class 属于同一类型。

```ts
obj instanceof Person // false
```

空类不包含任何成员，任何其他类都可以看作与空类结构相同。因此，凡是类型为空类的地方，所有类（包括对象）都可以使用。

```ts
class Empty {}

function fn(x: Empty) {
  // ...
}

fn({})
fn(window)
fn(fn)
```

注意，确定两个类的兼容关系时，只检查实例成员，不考虑静态成员和构造方法。

```ts
class Point {
  x: number
  y: number
  static t: number
  constructor(x: number) {}
}

class Position {
  x: number
  y: number
  z: number
  constructor(x: string) {}
}

const point: Point = new Position('')
```

如果类中存在私有成员（`private`）或保护成员（`protected`），那么确定兼容关系时，TypeScript 要求私有成员和保护成员来自同一个类，这意味着两个类需要存在继承关系。

```ts
// 情况一
class A {
  private name = 'a'
}

class B extends A {}

const a: A = new B()

// 情况二
class A {
  protected name = 'a'
}

class B extends A {
  protected name = 'b'
}

const a: A = new B()
```

## 类的继承

类（这里又称“子类”）可以使用 `extends` 关键字继承另一个类（这里又称“基类”）的所有属性和方法。

```ts
class A {
  greet() {
    console.log('Hello, world!')
  }
}

class B extends A {}

const b = new B()
b.greet() // "Hello, world!"
```

根据结构类型原则，子类也可以用于类型为基类的场合。

```ts
const a: A = b
a.greet()
```

子类可以覆盖基类的同名方法。

```ts
class B extends A {
  greet(name?: string) {
    if (name === undefined) {
      super.greet()
    } else {
      console.log(`Hello, ${name}`)
    }
  }
}
```

但是，子类的同名方法不能与基类的类型定义相冲突。

```ts
class A {
  greet() {
    console.log('Hello, world!')
  }
}

class B extends A {
  // 报错
  greet(name: string) {
    console.log(`Hello, ${name}`)
  }
}
```

如果基类包括保护成员（`protected` 修饰符），子类可以将该成员的可访问性设置为公开（`public` 修饰符），也可以保持保护成员不变，但是不能改用私有成员（`private` 修饰符），详见后文。

```ts
class A {
  protected x: string = ''
  protected y: string = ''
  protected z: string = ''
}

class B extends A {
  // 正确
  public x: string = ''

  // 正确
  protected y: string = ''

  // 报错
  private z: string = ''
}
```

注意，`extends` 关键字后面不一定是类名，可以是一个表达式，只要它的类型是构造函数就可以了。

```ts
// 例一
class MyArray extends Array<number> {}

// 例二
class MyError extends Error {}

// 例三
class A {
  greeting() {
    return 'Hello from A'
  }
}
class B {
  greeting() {
    return 'Hello from B'
  }
}

interface Greeter {
  greeting(): string
}

interface GreeterConstructor {
  new (): Greeter
}

function getGreeterBase(): GreeterConstructor {
  return Math.random() >= 0.5 ? A : B
}

class Test extends getGreeterBase() {
  sayHello() {
    console.log(this.greeting())
  }
}
```

## override 关键字

子类继承父类时，可以覆盖父类的同名方法。

```ts
class A {
  show() {
    // ...
  }
  hide() {
    // ...
  }
}
class B extends A {
  show() {
    // ...
  }
  hide() {
    // ...
  }
}
```

但是有些时候，我们继承他人的类，可能会在不知不觉中，就覆盖了他人的方法。为了防止这种情况，TypeScript 4.3 引入了 [override 关键字](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#override-and-the---noimplicitoverride-flag)。

```ts
class B extends A {
  override show() {
    // ...
  }
  override hide() {
    // ...
  }
}
```

但是，这依然没有解决，子类无意中覆盖父类同名方法的问题。因此，TypeScript 又提供了一个编译参数 `noImplicitOverride`。一旦打开这个参数，子类覆盖父类的同名方法就会报错，除非使用了 `override` 关键字。

## 可访问性修饰符

类的内部成员的外部可访问性，由三个可访问性修饰符（access modifiers）控制：`public`、`private` 和 `protected`。

这三个修饰符的位置，都写在属性或方法的最前面。

### public

`public` 修饰符表示这是公开成员，外部可以自由访问。

```ts
class Greeter {
  public greet() {
    console.log('hi!')
  }
}

const g = new Greeter()
g.greet()
```

`public` 修饰符是默认修饰符，如果省略不写，实际上就带有该修饰符。因此，类的属性和方法默认都是外部可访问的。

正常情况下，除非为了醒目和代码可读性，`public` 都是省略不写的。

### private

`private` 修饰符表示私有成员，只能用在当前类的内部，类的实例和子类都不能使用该成员。

```ts
class A {
  private x: number = 0
}

const a = new A()
a.x // 报错

class B extends A {
  showX() {
    console.log(this.x) // 报错
  }
}
```

注意，子类不能定义父类私有成员的同名成员。

```ts
class A {
  private x = 0
}

class B extends A {
  x = 1 // 报错
}
```

如果在类的内部，当前类的实例可以获取私有成员。

```ts
class A {
  private x = 10

  f(obj: A) {
    console.log(obj.x)
  }
}

const a = new A()
a.f(a) // 10
```

严格地说，`private` 定义的私有成员，并不是真正意义的私有成员。一方面，编译成 JavaScript 后，`private` 关键字就被剥离了，这时外部访问该成员就不会报错。另一方面，由于前一个原因，TypeScript 对于访问 `private` 成员没有严格禁止，使用方括号写法（`[]`）或者 `in` 运算符，实例对象就能访问该成员。

```ts
class A {
  private x = 1
}

const a = new A()
a['x'] // 1

// 正确
if ('x' in a) {
  // ...
}
```

由于 `private `存在这些问题，加上它是 ES2022 标准发布前出台的，而 ES2022 引入了自己的私有成员写法 `#propName`。因此建议不使用 `private`，改用 ES2022 的写法，获得真正意义的私有成员。

```ts
class A {
  #x = 1
}

const a = new A()
a['x'] // 报错
```

构造方法也可以是私有的，这就直接防止了使用 `new` 命令生成实例对象，只能在类的内部创建实例对象。

这时一般会有一个静态方法，充当工厂函数，强制所有实例都通过该方法生成。


```ts
class Singleton {
  private static instance?: Singleton

  private constructor() {}

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton()
    }
    return Singleton.instance
  }
}

const s = Singleton.getInstance()
```

上面示例使用私有构造方法，实现了单例模式。想要获得 `Singleton` 的实例，不能使用`new`命令，只能使用 `getInstance()` 方法。

### protected

`protected` 修饰符表示该成员是保护成员，只能在类的内部使用该成员，实例无法使用该成员，但是子类内部可以使用。

```ts
class A {
  protected x = 1
}

class B extends A {
  getX() {
    return this.x
  }
}

const a = new A()
const b = new B()

a.x // 报错
b.getX() // 1
```

子类不仅可以拿到父类的保护成员，还可以定义同名成员。

```ts
class A {
  protected x = 1
}

class B extends A {
  x = 2
}
```

在类的外部，实例对象不能读取保护成员，但是在类的内部可以。

```ts
class A {
  protected x = 1

  f(obj: A) {
    console.log(obj.x)
  }
}

const a = new A()

a.x // 报错
a.f(a) // 1
```

### 实例属性的简写形式

实际开发中，很多实例属性的值，是通过构造方法传入的。

```ts
class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}
```

这样的写法等于对同一个属性要声明两次类型，一次在类的头部，另一次在构造方法的参数里面。这有些累赘，TypeScript 就提供了一种简写形式。

```ts
class Point {
  constructor(public x: number, public y: number) {}
}

const p = new Point(10, 10)
p.x // 10
p.y // 10
```

除了 `public` 修饰符，构造方法的参数名只要有 `private`、`protected`、`readonly` 修饰符，都会自动声明对应修饰符的实例属性。

```ts
class A {
  constructor(
    public a: number,
    protected b: number,
    private c: number,
    readonly d: number,
  ) {}
}

// 编译结果
class A {
  a
  b
  c
  d
  constructor(a, b, c, d) {
    this.a = a
    this.b = b
    this.c = c
    this.d = d
  }
}
```

`readonly` 还可以与其他三个可访问性修饰符，一起使用。

```ts
class A {
  constructor(
    public readonly x: number,
    protected readonly y: number,
    private readonly z: number,
  ) {}
}
```

## 顶层属性的处理方法

对于类的顶层属性，TypeScript 早期的处理方法，与后来的 ES2022 标准不一致。这会导致某些代码的运行结果不一样。

类的顶层属性在 TypeScript 里面，有两种写法。

```ts
class User {
  // 写法一
  age = 25

  // 写法二
  constructor(private currentYear: number) {}
}
```

写法一是直接声明一个实例属性 `age`，并初始化；写法二是顶层属性的简写形式，直接将构造方法的参数 `currentYear` 声明为实例属性。

TypeScript 早期的处理方法是，先在顶层声明属性，但不进行初始化，等到运行构造方法时，再完成所有初始化。

```ts
class User {
  age = 25
}

// TypeScript 的早期处理方法
class User {
  age: number

  constructor() {
    this.age = 25
  }
}
```

ES2022 标准里面的处理方法是，先进行顶层属性的初始化，再运行构造方法。这在某些情况下，会使得同一段代码在 TypeScript 和 JavaScript 下运行结果不一致。

这种不一致一般发生在两种情况。第一种情况是，顶层属性的初始化依赖于其他实例属性。

```ts
class User {
  age = this.currentYear - 1998

  constructor(private currentYear: number) {
    // 输出结果将不一致
    console.log('Current age:', this.age)
  }
}

const user = new User(2023)
```

上面示例中，顶层属性 `age` 的初始化值依赖于实例属性 `this.currentYear`。按照 TypeScript 的处理方法，初始化是在构造方法里面完成的，会输出结果为 `25`。但是，按照 ES2022 标准的处理方法，初始化在声明顶层属性时就会完成，这时 `this.currentYear` 还等于 `undefined`，所以 `age` 的初始化结果为 `NaN`，因此最后输出的也是 `NaN`。

第二种情况与类的继承有关，子类声明的顶层属性在父类完成初始化。

```ts
interface Animal {
  animalStuff: any
}

interface Dog extends Animal {
  dogStuff: any
}

class AnimalHouse {
  resident: Animal

  constructor(animal: Animal) {
    this.resident = animal
  }
}

class DogHouse extends AnimalHouse {
  resident: Dog

  constructor(dog: Dog) {
    super(dog)
  }
}
```

上面示例中，类 `DogHouse` 继承自 `AnimalHouse`。它声明了顶层属性 `resident`，但是该属性的初始化是在父类`AnimalHouse` 完成的。不同的设置运行下面的代码，结果将不一致。

```ts
const dog = {
  animalStuff: 'animal',
  dogStuff: 'dog',
}

const dogHouse = new DogHouse(dog)

console.log(dogHouse.resident) // 输出结果将不一致
```

上面示例中，TypeScript 的处理方法，会使得 `resident` 属性能够初始化，所以输出参数对象的值。但是，ES2022 标准的处理方法是，顶层属性的初始化先于构造方法的运行。这使得 `resident` 属性不会得到赋值，因此输出为 `undefined`。

为了解决这个问题，同时保证以前代码的行为一致，TypeScript 从3.7版开始，引入了编译设置 `useDefineForClassFields`。这个设置设为 `true`，则采用 ES2022 标准的处理方法，否则采用 TypeScript 早期的处理方法。

它的默认值与 `target` 属性有关，如果输出目标设为 `ES2022` 或者更高，那么 `useDefineForClassFields` 的默认值为`true`，否则为 `false`。关于这个设置的详细说明，参见官方 3.7 版本的[发布说明](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#the-usedefineforclassfields-flag-and-the-declare-property-modifier)。

如果希望避免这种不一致，让代码在不同设置下的行为都一样，那么可以将所有顶层属性的初始化，都放到构造方法里面。

```ts
class User {
  age: number

  constructor(private currentYear: number) {
    this.age = this.currentYear - 1998
    console.log('Current age:', this.age)
  }
}

const user = new User(2023)
```

对于类的继承，还有另一种解决方法，就是使用 `declare` 命令，去声明子类顶层属性的类型，告诉 TypeScript 这些属性的初始化由父类实现。

```ts
class DogHouse extends AnimalHouse {
  declare resident: Dog

  constructor(dog: Dog) {
    super(dog)
  }
}
```

上面示例中，`resident` 属性的类型声明前面用了 `declare` 命令。这种情况下，这一行代码在编译成 JavaScript 后就不存在，那么也就不会有行为不一致，无论是否设置 `useDefineForClassFields`，输出结果都是一样的。

## 静态成员

类的内部可以使用 `static` 关键字，定义静态成员。

静态成员是只能通过类本身使用的成员，不能通过实例对象使用。

```ts
class MyClass {
  static x = 0
  static printX() {
    console.log(MyClass.x)
  }
}

MyClass.x // 0
MyClass.printX() // 0
```

`static` 关键字前面可以使用 `public`、`private`、`protected` 修饰符。

```ts
class MyClass {
  private static x = 0
}

MyClass.x // 报错
```

静态私有属性也可以用 ES6 语法的 `#` 前缀表示，上面示例可以改写如下。

```ts
class MyClass {
  static #x = 0
}
```

`public` 和 `protected` 的静态成员可以被继承。

```ts
class A {
  public static x = 1
  protected static y = 1
}

class B extends A {
  static getY() {
    return B.y
  }
}

B.x // 1
B.getY() // 1
```

## 泛型类

类也可以写成泛型，使用类型参数。

```ts
class Box<Type> {
  contents: Type;

  constructor(value:Type) {
    this.contents = value;
  }
}

const b:Box<string> = new Box('hello!');
```

注意，静态成员不能使用泛型的类型参数。

```ts
class Box<Type> {
  static defaultContents: Type // 报错
}
```

## 抽象类，抽象成员

TypeScript 允许在类的定义前面，加上关键字 `abstract`，表示该类不能被实例化，只能当作其他类的模板。这种类就叫做“抽象类”（abstract class）。

```ts
abstract class A {
  id = 1
}

const a = new A() // 报错
```

抽象类只能当作基类使用，用来在它的基础上定义子类。

```ts
abstract class A {
  id = 1
}

class B extends A {
  amount = 100
}

const b = new B()

b.id // 1
b.amount // 100
```

抽象类的子类也可以是抽象类，也就是说，抽象类可以继承其他抽象类。

```ts
abstract class A {
  foo: number
}

abstract class B extends A {
  bar: string
}
```

抽象类的内部可以有已经实现好的属性和方法，也可以有还未实现的属性和方法。后者就叫做“抽象成员”（abstract member），即属性名和方法名有 `abstract` 关键字，表示该方法需要子类实现。如果子类没有实现抽象成员，就会报错。

```ts
abstract class A {
  abstract foo: string
  bar: string = ''
}

class B extends A {
  foo = 'b'
}
```

下面是抽象方法的例子。如果抽象类的方法前面加上 `abstract`，就表明子类必须给出该方法的实现。

```ts
abstract class A {
  abstract execute(): string
}

class B extends A {
  execute() {
    return `B executed`
  }
}
```

这里有几个注意点。

1. 抽象成员只能存在于抽象类，不能存在于普通类。
2. 抽象成员不能有具体实现的代码。也就是说，已经实现好的成员前面不能加 `abstract` 关键字。
3. 抽象成员前也不能有 `private` 修饰符，否则无法在子类中实现该成员。
4. 一个子类最多只能继承一个抽象类。

总之，抽象类的作用是，确保各种相关的子类都拥有跟基类相同的接口，可以看作是模板。其中的抽象成员都是必须由子类实现的成员，非抽象成员则表示基类已经实现的、由所有子类共享的成员。

## this 问题

类的方法经常用到 `this` 关键字，它表示该方法当前所在的对象。

```ts
class A {
  name = 'A'

  getName() {
    return this.name
  }
}

const a = new A()
a.getName() // 'A'

const b = {
  name: 'b',
  getName: a.getName,
}
b.getName() // 'b'
```

有些场合需要给出 `this` 类型，但是 JavaScript 函数通常不带有 `this` 参数，这时 TypeScript 允许函数增加一个名为 `this` 的参数，放在参数列表的第一位，用来描述函数内部的 `this` 关键字的类型。

```ts
// 编译前
function fn(this: SomeType, x: number) {
  /* ... */
}

// 编译后
function fn(x) {
  /* ... */
}
```

函数 `fn()` 的第一个参数是 `this`，用来声明函数内部的 `this` 的类型。编译时，TypeScript 一旦发现函数的第一个参数名为 `this`，则会去除这个参数，即编译结果不会带有该参数。

```ts
class A {
  name = 'A'

  getName(this: A) {
    return this.name
  }
}

const a = new A()
const b = a.getName

b() // 报错
```

`this` 参数的类型可以声明为各种对象。

```ts
function foo(this: { name: string }) {
  this.name = 'Jack'
  this.name = 0 // 报错
}

foo.call({ name: 123 }) // 报错
```

TypeScript 提供了一个 `noImplicitThis` 编译选项。如果打开了这个设置项，如果 `this` 的值推断为 `any` 类型，就会报错。

```ts
// noImplicitThis 打开

class Rectangle {
  constructor(public width: number, public height: number) {}

  getAreaFunction() {
    return function () {
      return this.width * this.height // 报错
    }
  }
}

```

在类的内部，`this` 本身也可以当作类型使用，表示当前类的实例对象。

```ts
class Box {
  contents: string = ''

  set(value: string): this {
    this.contents = value
    return this
  }
}
```

注意，`this` 类型不允许应用于静态成员。

```ts
class A {
  static a: this // 报错
}
```

有些方法返回一个布尔值，表示当前的 `this` 是否属于某种类型。这时，这些方法的返回值类型可以写成 `this is Type` 的形式，其中用到了 `is` 运算符。

```ts
class FileSystemObject {
  isFile(): this is FileRep {
    return this instanceof FileRep
  }

  isDirectory(): this is Directory {
    return this instanceof Directory
  }

  // ...
}
```

## 参考链接

- [TypeScript Constructor in Interface](http://fritzthecat-blog.blogspot.com/2018/06/typescript-constructor-in-interface.html)
- [TypeScript: useDefineForClassFields – How to avoid future Breaking Changes](https://angular.schule/blog/2022-11-use-define-for-class-fields) 
