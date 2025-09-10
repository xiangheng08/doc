# 闭包

闭包（Closure）是 JavaScript 中一个非常重要且强大的特性。理解闭包有助于我们更好地掌握 JavaScript 的作用域、变量生命周期等核心概念。

## 什么是闭包

闭包是指一个函数能够访问并操作其外部作用域中的变量，即使在其外部函数已经执行完毕后仍然可以访问这些变量。简单来说，闭包让我们能够在函数外部访问函数内部的变量。

```js
function outerFunction(x) {
  // 外部函数的局部变量
  const outerVariable = x;
  
  // 内部函数
  function innerFunction(y) {
    // 内部函数可以访问外部函数的变量
    console.log(outerVariable + y);
  }
  
  // 返回内部函数，形成闭包
  return innerFunction;
}

const closure = outerFunction(10);
closure(5); // 输出: 15
```

在上面的例子中，`innerFunction` 被返回并赋值给 `closure` 变量，即使 `outerFunction` 已经执行完毕，`innerFunction` 仍然可以访问 `outerVariable` 变量，这就是闭包的体现。

## 闭包的形成条件

闭包的形成需要满足以下条件：

1. 存在一个内部函数（子函数）
2. 内部函数引用了外部函数的变量
3. 外部函数返回了内部函数

```js
function createCounter() {
  let count = 0; // 外部函数的局部变量
  
  // 内部函数引用外部变量
  function increment() {
    count++;
    console.log(count);
  }
  
  return increment; // 返回内部函数
}

const counter = createCounter();
counter(); // 1
counter(); // 2
counter(); // 3
```

在这个例子中，每次调用 `counter()` 都会使 `count` 变量增加，说明 `count` 变量在 `createCounter()` 执行完毕后并没有被销毁，而是被闭包保存了下来。

## 闭包的作用和用途

### 1. 数据封装和私有变量

闭包可以创建私有变量，实现数据封装：

```js
function createPerson(name) {
  let _name = name; // 私有变量
  
  return {
    getName: function() {
      return _name;
    },
    setName: function(newName) {
      _name = newName;
    }
  };
}

const person = createPerson('张三');
console.log(person.getName()); // 张三
person.setName('李四');
console.log(person.getName()); // 李四

// 无法直接访问 _name 变量
console.log(person._name); // undefined
```

### 2. 创建函数工厂

闭包可以用来创建具有特定行为的函数：

```js
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### 3. 模块模式

闭包可以实现模块模式，创建具有私有状态的对象：

```js
const calculator = (function() {
  let result = 0; // 私有变量
  
  return {
    add: function(x) {
      result += x;
      return this;
    },
    subtract: function(x) {
      result -= x;
      return this;
    },
    getResult: function() {
      return result;
    },
    reset: function() {
      result = 0;
      return this;
    }
  };
})();

calculator.add(10).subtract(2);
console.log(calculator.getResult()); // 8
```

### 4. 回调函数和异步操作

闭包在回调函数和异步操作中非常有用：

```js
function delayedGreeting(name) {
  setTimeout(function() {
    console.log('Hello, ' + name);
  }, 1000);
}

delayedGreeting('张三'); // 1秒后输出: Hello, 张三
```

## 闭包的注意事项

### 1. 内存泄漏风险

闭包会保持对外部变量的引用，可能导致内存无法及时释放：

```js
function problematicClosure() {
  const largeData = new Array(1000000).fill('data');
  
  return function() {
    // 即使不使用 largeData，它也会被保留在内存中
    console.log('Hello');
  };
}

const closure = problematicClosure();
// largeData 会一直保存在内存中，直到 closure 被销毁
```

### 2. 循环中的闭包问题

在循环中创建闭包时容易出现问题：

```js
// 问题代码
const funcs = [];
for (var i = 0; i < 3; i++) {
  funcs[i] = function() {
    console.log(i); // 总是输出 3
  };
}

funcs[0](); // 3
funcs[1](); // 3
funcs[2](); // 3

// 解决方案1: 使用立即执行函数
const funcs1 = [];
for (var i = 0; i < 3; i++) {
  funcs1[i] = (function(index) {
    return function() {
      console.log(index);
    };
  })(i);
}

funcs1[0](); // 0
funcs1[1](); // 1
funcs1[2](); // 2

// 解决方案2: 使用 let 声明
const funcs2 = [];
for (let i = 0; i < 3; i++) {
  funcs2[i] = function() {
    console.log(i);
  };
}

funcs2[0](); // 0
funcs2[1](); // 1
funcs2[2](); // 2
```

## 闭包的实际应用场景

### 1. 防抖（Debouncing）

```js
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const debouncedSearch = debounce(function(query) {
  console.log('搜索:', query);
}, 300);
```

### 2. 节流（Throttling）

```js
function throttle(func, limit) {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

const throttledScroll = throttle(function() {
  console.log('滚动事件处理');
}, 1000);
```

### 3. 单例模式

```js
const Singleton = (function() {
  let instance;
  
  function createInstance() {
    return {
      // 单例对象的方法和属性
      getData: function() {
        return '单例数据';
      }
    };
  }
  
  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // true
```

## 总结

闭包是 JavaScript 中一个强大而重要的特性，它允许函数访问其外部作用域的变量。理解闭包对于编写高质量的 JavaScript 代码至关重要：

1. 闭包允许函数访问并操作其外部作用域的变量
2. 闭包可以实现数据封装和私有变量
3. 闭包在函数工厂、模块模式、回调函数等场景中广泛应用
4. 需要注意闭包可能导致的内存泄漏问题
5. 在循环中使用闭包时要特别小心变量的作用域问题

掌握闭包的概念和使用方法，能够帮助我们编写更加优雅和高效的 JavaScript 代码。
