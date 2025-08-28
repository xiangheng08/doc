# MutationObserver

## 简介

MutationObserver 是一个用于监听 DOM 变化（如节点添加、删除、属性更改等）的 Web API。它提供了一种异步的方式来监测 DOM 的变化，相比旧的 Mutation Events API，它具有更好的性能表现。

当需要监听 DOM 树的变化时，例如：
- 监听元素属性的更改
- 监听节点的添加或删除
- 监听文本内容的变化

MutationObserver 是一个非常有用的工具。

## 基本语法

创建一个 MutationObserver 实例的基本语法如下：

```js
const observer = new MutationObserver(callback);
observer.observe(target, options);
```

其中：
- `callback`：当 DOM 发生变化时触发的回调函数
- `target`：需要观察变化的 DOM 节点
- `options`：配置对象，指定观察哪些类型的更改

## 配置选项详解

### childList

设置为 `true` 时，监听目标节点添加或删除子节点的操作：

```js
const config = {
  childList: true
};
```

### attributes

设置为 `true` 时，监听目标节点属性值的变化：

```js
const config = {
  attributes: true
};
```

### characterData

设置为 `true` 时，监听目标节点数据的变化（适用于文本节点）：

```js
const config = {
  characterData: true
};
```

### subtree

设置为 `true` 时，将监听范围扩展到目标节点的整个子树：

```js
const config = {
  childList: true,
  subtree: true
};
```

### attributeOldValue

设置为 `true` 并且 `attributes` 也为 `true` 时，记录更改前的属性值：

```js
const config = {
  attributes: true,
  attributeOldValue: true
};
```

### characterDataOldValue

设置为 `true` 并且 `characterData` 也为 `true` 时，记录更改前的数据值：

```js
const config = {
  characterData: true,
  characterDataOldValue: true
};
```

### attributeFilter

用于指定需要监听的特定属性名称数组：

```js
const config = {
  attributes: true,
  attributeFilter: ['class', 'id', 'style']
};
```

## 实际应用

### 监听元素属性变化

```js
// 选择需要观察变动的节点
const targetNode = document.getElementById('myElement');

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: false, subtree: false };

// 当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
  for(let mutation of mutationsList) {
    if (mutation.type === 'attributes') {
      console.log('属性 ' + mutation.attributeName + ' 已修改');
    }
  }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
// observer.disconnect();
```

### 监听子节点变化

```js
const targetNode = document.getElementById('myList');
const config = { childList: true, subtree: true };

const callback = function(mutationsList, observer) {
  for(let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('子节点发生更新');
      console.log('新增的节点:', mutation.addedNodes);
      console.log('删除的节点:', mutation.removedNodes);
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
```

### 监听文本内容变化

```js
const targetNode = document.getElementById('myText');
const config = { 
  characterData: true, 
  subtree: true,
  characterDataOldValue: true
};

const callback = function(mutationsList, observer) {
  for(let mutation of mutationsList) {
    if (mutation.type === 'characterData') {
      console.log('文本内容从 "' + mutation.oldValue + '" 更改为 "' + mutation.target.data + '"');
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
```

## 回调函数参数

回调函数接收两个参数：

```js
const callback = function(mutationsList, observer) {
  mutationsList.forEach(function(mutation) {
    // mutation 是 MutationRecord 对象
    console.log(mutation.type);           // 变化类型
    console.log(mutation.target);         // 发生变化的节点
    console.log(mutation.addedNodes);     // 添加的节点
    console.log(mutation.removedNodes);   // 删除的节点
    console.log(mutation.attributeName);  // 更改的属性名
    console.log(mutation.oldValue);       // 变化前的值
  });
};
```

## 实例方法

### observe()

开始观察目标节点：

```js
const observer = new MutationObserver(callback);
const target = document.querySelector('#target');
const config = { childList: true, attributes: true };

observer.observe(target, config);
```

### disconnect()

停止观察所有节点：

```js
observer.disconnect();
```

### takeRecords()

清空观察器的记录队列并返回里面的内容：

```js
const mutations = observer.takeRecords();
// 处理剩余的变更记录
processMutations(mutations);
observer.disconnect();
```

## 使用场景

### 监听 DOM 动态变化

在 SPA（单页应用）中，经常需要监听某些 DOM 元素的动态添加，比如监听某个容器中是否添加了新的列表项：

```js
const container = document.querySelector('.dynamic-list');
const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('列表元素已更新');
      // 执行相关操作，如重新绑定事件监听器等
    }
  }
});

observer.observe(container, { childList: true });
```

### 监听样式变化

```js
const element = document.querySelector('.watched-element');
const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      console.log('CSS 类名已更改');
      // 响应样式变化
    }
  }
});

observer.observe(element, { 
  attributes: true, 
  attributeFilter: ['class', 'style'] 
});
```

### 表单验证增强

监听表单元素的变化以增强验证：

```js
const formField = document.querySelector('#email-input');
const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
      // 当值发生变化时进行验证
      validateEmail(formField.value);
    }
  }
});

observer.observe(formField, { 
  attributes: true,
  attributeFilter: ['value']
});
```

## 注意事项

### 性能考虑

- MutationObserver 是异步执行的，不会阻塞浏览器渲染
- 避免在回调函数中执行耗时操作
- 及时调用 `disconnect()` 停止观察，避免内存泄漏

### 兼容性

MutationObserver 在现代浏览器中得到了良好支持，但在较老的浏览器中可能需要使用 polyfill 或降级方案：

```js
const MutationObserver = window.MutationObserver || 
                        window.WebKitMutationObserver || 
                        window.MozMutationObserver;

if (MutationObserver) {
  // 使用 MutationObserver
} else {
  // 降级处理方案，如使用定时器轮询
}
```

## 与相关技术对比

| 特性 | MutationObserver | Mutation Events | 轮询检查 |
|------|------------------|-----------------|----------|
| 性能 | 高（异步批量处理） | 低（同步触发） | 中等（定时器） |
| 浏览器支持 | 现代浏览器 | 较老浏览器 | 所有浏览器 |
| 实现复杂度 | 简单 | 简单但性能差 | 简单 |
| 实时性 | 高 | 高 | 取决于轮询间隔 |

## 相关资源

- [MDN MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)
- [W3C DOM Living Standard](https://dom.spec.whatwg.org/#mutation-observers)
- [Can I Use: MutationObserver](https://caniuse.com/mutationobserver)