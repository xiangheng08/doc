# 原型与原型链

在 JavaScript 中，原型（Prototype）和原型链（Prototype Chain）是理解对象继承和属性查找机制的核心概念。它们是 JavaScript 实现面向对象编程的基础。

## 什么是原型（Prototype）

在 JavaScript 中，每个函数都有一个 `prototype` 属性，这个属性指向一个对象，我们称之为原型对象。当函数作为构造函数使用时（通过 `new` 关键字创建实例），这个原型对象会成为实例对象的原型。

```js
// 定义一个构造函数
function Person(name) {
  this.name = name;
}

// 在原型上添加方法
Person.prototype.sayHello = function() {
  console.log('Hello, I am ' + this.name);
};

// 创建实例
const person1 = new Person('张三');
const person2 = new Person('李四');

// 两个实例都可以访问原型上的方法
person1.sayHello(); // Hello, I am 张三
person2.sayHello(); // Hello, I am 李四

// 验证方法来自原型
console.log(person1.sayHello === person2.sayHello); // true
```

原型的主要作用是实现属性和方法的共享，避免在每个实例上都创建相同的属性和方法，节省内存空间。

## prototype、\_\_proto\_\_ 和 constructor 属性

在理解原型和原型链时，需要掌握三个重要属性：

### 1. prototype 属性

`prototype` 是函数独有的属性，指向该函数的原型对象。

```js
function Animal() {}
console.log(Animal.prototype); // {}
```

### 2. \_\_proto\_\_ 属性

`__proto__` 是对象的属性，指向该对象的原型。它是 `[[Prototype]]` 内部属性的访问器。

```js
function Animal() {}
const animal = new Animal();

console.log(animal.__proto__ === Animal.prototype); // true
```

### 3. constructor 属性

`constructor` 是原型对象上的属性，指向关联的构造函数。

```js
function Animal() {}
console.log(Animal.prototype.constructor === Animal); // true

const animal = new Animal();
console.log(animal.constructor === Animal); // true
```

## 原型链（Prototype Chain）

原型链是 JavaScript 实现继承的核心机制。每个对象都有一个原型对象，原型对象本身也是对象，所以它也有自己的原型，这样一层一层向上链接，就形成了原型链。

```js
function Animal() {}
Animal.prototype.eat = function() {
  console.log('eating...');
};

const animal = new Animal();

// 原型链关系
console.log(animal.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true
```

在上面的例子中，原型链是这样的：
```
animal -> Animal.prototype -> Object.prototype -> null
```

当我们访问对象的属性时，JavaScript 引擎会沿着原型链向上查找：

1. 首先在对象自身查找属性
2. 如果没找到，就在对象的原型（`__proto__`）上查找
3. 如果还没找到，继续在原型的原型上查找
4. 以此类推，直到找到属性或到达原型链的顶端（null）

```js
function Parent() {}
Parent.prototype.name = 'Parent';

function Child() {}
Child.prototype = new Parent();
Child.prototype.constructor = Child;

const child = new Child();
console.log(child.name); // Parent (从原型链上找到)
```

## 属性查找机制

JavaScript 的属性查找遵循以下规则：

```js
function Foo() {
  this.a = 1;
}

Foo.prototype.a = 2;
Foo.prototype.b = 3;

const obj = new Foo();
obj.a = 4;

console.log(obj.a); // 4 (自身属性)
console.log(obj.b); // 3 (原型属性)
console.log(obj.c); // undefined (找不到)
```

如果对象自身有该属性，就不会继续在原型链上查找，这就是所谓的"属性遮蔽"。

## 原型链的常用方法

### 1. Object.getPrototypeOf()

获取对象的原型：

```js
function Animal() {}
const animal = new Animal();

console.log(Object.getPrototypeOf(animal) === Animal.prototype); // true
```

### 2. Object.setPrototypeOf()

设置对象的原型：

```js
const obj = {};
const parent = { name: 'parent' };

Object.setPrototypeOf(obj, parent);
console.log(obj.name); // parent
```

### 3. instanceof 操作符

检查对象是否是某个构造函数的实例：

```js
function Animal() {}
const animal = new Animal();

console.log(animal instanceof Animal); // true
console.log(animal instanceof Object); // true
```

### 4. isPrototypeOf() 方法

检查对象是否在另一个对象的原型链上：

```js
function Animal() {}
const animal = new Animal();

console.log(Animal.prototype.isPrototypeOf(animal)); // true
```

## 经典示例：实现继承

通过原型链可以实现继承：

```js
// 父类
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(this.name + ' makes a sound.');
};

// 子类
function Dog(name, breed) {
  Animal.call(this, name); // 调用父类构造函数
  this.breed = breed;
}

// 设置原型链实现继承
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// 添加子类特有方法
Dog.prototype.bark = function() {
  console.log(this.name + ' barks.');
};

// 使用
const dog = new Dog('旺财', '金毛');
dog.speak(); // 旺财 makes a sound.
dog.bark();  // 旺财 barks.
```

## 注意事项和最佳实践

### 1. 避免直接修改内置对象的原型

```js
// 不推荐
Array.prototype.myMethod = function() {
  // ...
};

// 推荐使用工具函数
function myArrayMethod(arr) {
  // ...
}
```

### 2. 正确设置构造函数属性

在实现继承时，记得重新设置 constructor 属性：

```js
function Parent() {}
function Child() {}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child; // 重要！
```

### 3. 使用 Object.create() 创建对象

`Object.create()` 创建一个新对象，以一个现有对象作为原型，创建一个新对象。

```js
const parent = { name: 'parent' };
const child = Object.create(parent);
console.log(child.name); // parent
```

## 总结

原型和原型链是 JavaScript 的核心概念，理解它们对于掌握 JavaScript 至关重要：

1. 每个函数都有 `prototype` 属性，指向其原型对象
2. 每个对象都有 `__proto__` 属性，指向其原型对象
3. 原型对象的 `constructor` 属性指向关联的构造函数
4. 原型链是对象查找属性的路径，从自身开始，逐级向上查找
5. 通过原型链可以实现继承和属性共享
6. 使用 `Object.getPrototypeOf()` 和 `Object.setPrototypeOf()` 可以安全地操作原型

掌握这些概念有助于更好地理解 JavaScript 的对象模型和继承机制。
