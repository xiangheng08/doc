# 浏览器事件循环

## 基本概念

### 为什么需要事件循环？
JavaScript 是**单线程**的，为了避免线程阻塞，浏览器采用异步回调的方式处理非阻塞任务。事件循环就是实现这种异步编程模型的核心机制。

### 核心组件
- **调用栈 (Call Stack)**：执行同步代码的地方
- **Web APIs**：浏览器提供的异步功能（setTimeout、DOM事件、HTTP请求等）
- **任务队列 (Task Queue)**：存放异步任务回调（宏任务）
- **微任务队列 (Microtask Queue)**：存放优先级更高的异步回调（微任务）
- **事件循环 (Event Loop)**：协调这些组件运行的机制

## 运行机制

### 执行顺序
1. 执行全局同步代码（属于宏任务）
2. 执行过程中：
   - 同步代码直接执行
   - 异步任务交给 Web APIs 处理
   - Promise等微任务进入微任务队列
   - 定时器、事件等宏任务进入任务队列
3. 当前调用栈清空后：
   - 立即执行所有微任务队列中的任务
   - 微任务执行完毕，取出一个宏任务执行
   - 重复上述过程

### 代码示例
```js
console.log('1'); // 同步

setTimeout(() => console.log('2'), 0); // 宏任务

Promise.resolve().then(() => {
    console.log('3'); // 微任务
});

console.log('4'); // 同步

// 输出顺序：1 → 4 → 3 → 2
```

## 任务分类

### 宏任务 (Macrotasks)
- `setTimeout` / `setInterval`
- I/O 操作
- UI 渲染
- 事件回调（click、scroll等）
- `setImmediate`（Node.js）

### 微任务 (Microtasks)
- `Promise.then` / `catch` / `finally`
- `MutationObserver`
- `process.nextTick`（Node.js）
- `queueMicrotask`

## 执行流程图解

```
同步代码执行 → 微任务队列清空 → 宏任务队列取一个执行 → 
→ 微任务队列清空 → 宏任务队列取一个执行 → (循环)
```

## 重要特性

### 微任务优先级
- 微任务在当前宏任务结束后立即执行
- 微任务执行期间添加的新微任务会继续在当前周期执行

### 渲染时机
- GUI 渲染发生在宏任务之间
- 微任务会阻塞渲染（因为在一个宏任务周期内）

### 经典面试题分析
```js
console.log('1');

setTimeout(() => {
    console.log('2');
    Promise.resolve().then(() => console.log('3'));
}, 0);

Promise.resolve().then(() => {
    console.log('4');
    setTimeout(() => console.log('5'), 0);
});

console.log('6');

// 输出顺序：1 → 6 → 4 → 2 → 3 → 5
```

## 实际应用注意事项

1. **避免微任务阻塞**：不要在所有微任务完成前进行大量计算
2. **合理使用任务拆分**：长时间任务可使用 `setTimeout` 或 `queueMicrotask` 拆分
3. **渲染优化**：在宏任务中进行 DOM 操作，让浏览器有机会渲染

## 总结

| 特性       | 宏任务                 | 微任务                   |
| ---------- | ---------------------- | ------------------------ |
| 典型代表   | setTimeout/setInterval | Promise.then             |
| 触发时机   | 每个事件循环周期一次   | 当前宏任务结束后立即执行 |
| 执行优先级 | 低                     | 高                       |

**事件循环口诀**：同步优先，微任务其次，宏任务最后，循环往复。
