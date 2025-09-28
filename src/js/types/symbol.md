# Symbol

## 概述

Symbol 是 ES6 引入的一种新的原始数据类型，表示独一无二的值，用于防止属性名冲突。

JavaScript 的原始数据类型包括：`undefined`、`null`、布尔值（Boolean）、字符串（String）、数值（Number）、大整数（BigInt）、Symbol。

Symbol 值通过 `Symbol()` 函数生成：

```js
const s = Symbol();

typeof s; // "symbol"
```

`Symbol()` 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述：

```js
const s1 = Symbol('foo');
const s2 = Symbol('bar');

s1; // Symbol(foo)
s2; // Symbol(bar)

s1.toString(); // "Symbol(foo)"
s2.toString(); // "Symbol(bar)"
```

相同参数的 `Symbol` 函数返回值不相等：

```js
const s1 = Symbol('foo');
const s2 = Symbol('foo');

s1 === s2; // false
```

Symbol 值不能与其他类型的值进行运算，但可以显式转为字符串或布尔值：

```js
const sym = Symbol('My symbol');

// 转为字符串
String(sym); // 'Symbol(My symbol)'
sym.toString(); // 'Symbol(My symbol)'

// 转为布尔值
Boolean(sym); // true
!sym; // false

// 不能转为数值
Number(sym); // TypeError
```

## Symbol.prototype.description

ES2019 提供了 `description` 属性，直接返回 Symbol 值的描述：

```js
const sym = Symbol('foo');
sym.description; // "foo"
```

## 作为属性名的 Symbol

Symbol 值可以作为对象属性名，保证属性名唯一：

```js
const mySymbol = Symbol();

// 定义属性的三种方法
const a = {};
a[mySymbol] = 'Hello!';

const b = {
  [mySymbol]: 'Hello!'
};

const c = {};
Object.defineProperty(c, mySymbol, { value: 'Hello!' });

a[mySymbol]; // "Hello!"
```

注意，Symbol 值作为属性名时不能用点运算符：

```js
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!'; // 这里是字符串 'mySymbol'
a[mySymbol]; // undefined
a['mySymbol']; // "Hello!"
```

Symbol 可用于定义一组常量，保证值都不相等：

```js
const log = {};

log.levels = {
  DEBUG: Symbol('debug'),
  INFO: Symbol('info'),
  WARN: Symbol('warn')
};

console.log(log.levels.DEBUG, 'debug message');
```

## 消除魔术字符串

魔术字符串指的是代码中多次出现的特定字符串或数值，使用 Symbol 可以消除这种强耦合：

```js
const shapeType = {
  triangle: Symbol()
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = 0.5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
```

## 属性名遍历

Symbol 值作为属性名时，不会出现在 `for...in`、`for...of` 循环中，也不会被 `Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()` 返回：

```js
const obj = {};
const a = Symbol('a');
const b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

// 获取 Symbol 属性名
const objectSymbols = Object.getOwnPropertySymbols(obj);
objectSymbols; // [Symbol(a), Symbol(b)]

// 获取所有类型的键名
Reflect.ownKeys(obj); // [Symbol(a), Symbol(b)]
```

## Symbol.for() 和 Symbol.keyFor()

`Symbol.for()` 方法可以重新使用同一个 Symbol 值，它会被登记在全局环境中供搜索：

```js
const s1 = Symbol.for('foo');
const s2 = Symbol.for('foo');

s1 === s2; // true
```

`Symbol.keyFor()` 方法返回一个已登记的 Symbol 值的 key：

```js
const s1 = Symbol.for('foo');
Symbol.keyFor(s1); // "foo"

const s2 = Symbol('foo');
Symbol.keyFor(s2); // undefined
```

## 内置的 Symbol 值

ES6 提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。

### Symbol.hasInstance

指向一个内部方法，当使用 instanceof 运算符时会调用：

```js
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}

[1, 2, 3] instanceof new MyClass(); // true
```

### Symbol.isConcatSpreadable

表示该对象用于 Array.prototype.concat() 时是否可以展开：

```js
const arr = ['c', 'd'];
arr[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr, 'e'); // ['a', 'b', ['c','d'], 'e']
```

### Symbol.species

指向一个构造函数，创建衍生对象时会使用该属性：

```js
class MyArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

const a = new MyArray(1, 2, 3);
const b = a.map(x => x);

b instanceof MyArray; // false
b instanceof Array; // true
```

### Symbol.iterator

指向对象的默认遍历器方法：

```js
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable]; // [1, 2, 3]
```

### Symbol.toPrimitive

对象被转为原始类型值时会调用：

```js
const obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
    }
  }
};

2 * obj; // 246
3 + obj; // '3default'
```

### Symbol.toStringTag

定制 `Object.prototype.toString()` 方法返回的字符串：

```js
({ [Symbol.toStringTag]: 'Foo' }).toString(); // "[object Foo]"

class Collection {
  get [Symbol.toStringTag]() {
    return 'xxx';
  }
}

const x = new Collection();
Object.prototype.toString.call(x); // "[object xxx]"
```

[参考: Symbol - ES6 教程 - 网道](https://wangdoc.com/es6/symbol)
