# 函数柯里化

柯里化（Currying）是一种函数式编程技术，它将接受多个参数的函数转换为一系列只接受单一参数的函数。这种技术在函数式编程中非常有用，能够提高代码的灵活性和可复用性。

## 什么是柯里化

柯里化是一种将使用多个参数的函数转换成一系列使用一个参数的函数的技术。柯里化函数会接受一个参数并返回一个新的函数，这个新函数接受下一个参数，依此类推，直到所有参数都被处理完毕。

```js
// 普通函数
function add(x, y, z) {
  return x + y + z;
}

// 柯里化版本
function curriedAdd(x) {
  return function(y) {
    return function(z) {
      return x + y + z;
    };
  };
}

// 使用方式
console.log(add(1, 2, 3)); // 6
console.log(curriedAdd(1)(2)(3)); // 6

// 也可以分步调用
const add1 = curriedAdd(1);
const add1And2 = add1(2);
const result = add1And2(3);
console.log(result); // 6
```

## 柯里化的实现方式

### 1. 手动实现柯里化

我们可以手动实现柯里化函数：

```js
// 简单的柯里化实现
function curry(fn) {
  return function curried(...args) {
    // 如果参数数量足够，执行原函数
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } 
    // 否则返回一个新函数，继续接收参数
    else {
      return function(...nextArgs) {
        return curried(...args, ...nextArgs);
      };
    }
  };
}

// 使用示例
function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curry(multiply);

console.log(curriedMultiply(2)(3)(4)); // 24
console.log(curriedMultiply(2, 3)(4)); // 24
console.log(curriedMultiply(2)(3, 4)); // 24
console.log(curriedMultiply(2, 3, 4)); // 24
```

### 2. 更通用的柯里化实现

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

// 支持箭头函数的版本
const curryES6 = fn => 
  function curried(...args) {
    return args.length >= fn.length 
      ? fn.apply(this, args)
      : (...nextArgs) => curried(...args, ...nextArgs);
  };
```

## 柯里化的优势

### 1. 参数复用

柯里化可以复用部分参数，创建专用函数：

```js
function greet(greeting, punctuation) {
  return function(name) {
    return greeting + ', ' + name + punctuation;
  };
}

const sayHello = greet('Hello', '!');
const sayHi = greet('Hi', '.');

console.log(sayHello('张三')); // Hello, 张三!
console.log(sayHi('李四')); // Hi, 李四.
```

### 2. 延迟执行

柯里化支持延迟执行，可以在需要时才提供剩余参数：

```js
function calculate(operation, a, b) {
  switch(operation) {
    case 'add': return a + b;
    case 'subtract': return a - b;
    case 'multiply': return a * b;
    case 'divide': return a / b;
  }
}

const curriedCalculate = curry(calculate);

// 创建专用的计算函数
const add = curriedCalculate('add');
const multiply = curriedCalculate('multiply');

console.log(add(5)(3)); // 8
console.log(multiply(4)(6)); // 24
```

### 3. 函数组合

柯里化使得函数组合更加容易：

```js
// 工具函数
const compose = (f, g) => x => f(g(x));

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

const curriedAdd = curry(add);
const curriedMultiply = curry(multiply);

// 创建组合函数
const add5AndMultiplyBy2 = compose(
  curriedMultiply(2),
  curriedAdd(5)
);

console.log(add5AndMultiplyBy2(3)); // (3 + 5) * 2 = 16
```

## 实际应用场景

### 1. 事件处理

```js
// 通用事件处理函数
function handleClick(component, action, event) {
  console.log(`Component ${component} performed ${action}`);
}

const curriedHandleClick = curry(handleClick);

// 为不同组件创建专用处理函数
const handleButtonClick = curriedHandleClick('Button');
const handleMenuClick = curriedHandleClick('Menu');

// 绑定事件
document.getElementById('button1').addEventListener(
  'click', 
  handleButtonClick('clicked')
);

document.getElementById('menu1').addEventListener(
  'click', 
  handleMenuClick('opened')
);
```

### 2. 数据处理

```js
// 通用数据过滤函数
function filterBy(property, value, array) {
  return array.filter(item => item[property] === value);
}

const curriedFilterBy = curry(filterBy);

// 创建专用过滤函数
const filterByAge = curriedFilterBy('age');
const filterByName = curriedFilterBy('name');

const users = [
  { name: '张三', age: 25 },
  { name: '李四', age: 30 },
  { name: '王五', age: 25 }
];

const filterAge25 = filterByAge(25);
const filterZhang = filterByName('张三');

console.log(filterAge25(users)); // [{ name: '张三', age: 25 }, { name: '王五', age: 25 }]
console.log(filterZhang(users)); // [{ name: '张三', age: 25 }]
```

### 3. 配置函数

```js
// 通用请求函数
function request(method, url, headers, body) {
  // 实际的请求逻辑
  console.log(`Sending ${method} request to ${url}`);
  return fetch(url, { method, headers, body });
}

const curriedRequest = curry(request);

// 创建专用请求函数
const get = curriedRequest('GET');
const post = curriedRequest('POST');

// 设置默认配置
const apiRequest = get('https://api.example.com');
const jsonHeaders = { 'Content-Type': 'application/json' };

// 使用
apiRequest('/users')({}); // GET 请求
post('/users')(jsonHeaders)({ name: '张三' }); // POST 请求
```

## 高级柯里化技术

### 1. 反柯里化（Uncurrying）

有时我们需要将柯里化函数转换回普通函数：

```js
function uncurry(fn) {
  return function(...args) {
    let result = fn;
    for (let arg of args) {
      result = result(arg);
    }
    return result;
  };
}

const curriedAdd = x => y => z => x + y + z;
const uncurriedAdd = uncurry(curriedAdd);

console.log(uncurriedAdd(1, 2, 3)); // 6
```

### 2. 部分应用（Partial Application）

部分应用与柯里化相关但不完全相同：

```js
function partial(fn, ...presetArgs) {
  return function(...restArgs) {
    // 合并预设参数和剩余参数
    let args = [];
    let presetIndex = 0;
    let restIndex = 0;
    
    for (let i = 0; i < fn.length; i++) {
      if (presetArgs[i] !== undefined) {
        args[i] = presetArgs[i];
      } else {
        args[i] = restArgs[restIndex++];
      }
    }
    
    return fn.apply(this, args);
  };
}

function greet(greeting, name, punctuation) {
  return greeting + ', ' + name + punctuation;
}

const sayHello = partial(greet, 'Hello', undefined, '!');
console.log(sayHello('张三')); // Hello, 张三!
```

## 柯里化的注意事项

### 1. 函数长度问题

柯里化依赖于函数的 `length` 属性（参数个数），但有些函数可能没有明确的参数个数：

```js
// 不适合柯里化的函数
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

// 这种函数的 length 为 0，无法正确柯里化
console.log(sum.length); // 0
```

### 2. 性能考虑

柯里化会创建额外的函数嵌套，可能会带来轻微的性能开销：

```js
// 性能对比
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

console.time('普通函数');
for (let i = 0; i < 1000000; i++) {
  add(1, 2, 3);
}
console.timeEnd('普通函数');

console.time('柯里化函数');
for (let i = 0; i < 1000000; i++) {
  curriedAdd(1)(2)(3);
}
console.timeEnd('柯里化函数');
```

## TS 类型标注

[点击查看](/ts/currying-type)

## 总结

柯里化是函数式编程中的重要概念，它提供了以下优势：

1. **参数复用** - 可以创建预设部分参数的专用函数
2. **延迟执行** - 支持逐步提供参数，按需执行
3. **函数组合** - 便于创建更复杂的函数组合
4. **代码复用** - 提高代码的灵活性和可维护性

虽然柯里化在某些场景下可能带来轻微的性能开销，但它在函数式编程、事件处理、数据处理等方面的应用价值很高。掌握柯里化技术有助于编写更加优雅和灵活的 JavaScript 代码。
