# ResizeObserver

## 简介

ResizeObserver API 提供了一种高性能的解决方案，用于监听元素内容盒尺寸或边框盒尺寸的大小变化。在 ResizeObserver 出现之前，监听元素大小变化通常需要使用 window.resize 事件或者通过不断轮询元素尺寸的方式，这些方法要么性能较差，要么实现复杂。ResizeObserver 允许我们异步监听元素大小变化，并在变化发生时执行回调函数。

ResizeObserver 特别适用于以下场景：
- 响应式设计中根据容器大小调整内容
- 监听元素内容变化导致的尺寸改变
- 实现自定义的图表或组件的自适应布局

## 核心概念

在深入了解 API 之前，我们需要理解几个关键概念：

- **目标元素（Target Element）**：被观察的元素，我们需要监听其大小变化
- **内容盒（Content Box）**：元素的内容区域，不包括内边距（padding）、边框（border）和外边距（margin）
- **边框盒（Border Box）**：元素的区域，包括内容、内边距和边框，但不包括外边距
- **设备像素比（Device Pixel Ratio）**：物理像素与 CSS 像素的比例

## 基本语法

创建一个 ResizeObserver 实例的基本语法如下：

```js
const observer = new ResizeObserver(callback);
observer.observe(target);
```

其中：
- `callback`：当元素大小变化时触发的回调函数
- `target`：需要观察大小变化的元素

## 实际应用

### 响应式图表

```js
const chartContainer = document.querySelector('#chart');
const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    // 当容器大小变化时重绘图表
    redrawChart(entry.contentRect.width, entry.contentRect.height);
  }
});

resizeObserver.observe(chartContainer);
```

### 动态调整文本大小

```js
const textElement = document.querySelector('.auto-resize-text');
const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    const { width, height } = entry.contentRect;
    // 根据容器大小动态调整字体大小
    const fontSize = Math.min(width / 10, height / 2);
    textElement.style.fontSize = `${fontSize}px`;
  }
});

resizeObserver.observe(textElement);
```

### 监听多个元素

```js
const resizeObserver = new ResizeObserver(entries => {
  entries.forEach(entry => {
    console.log('元素大小变化:', entry.target);
    console.log('新的尺寸:', entry.contentRect);
  });
});

// 观察多个元素
document.querySelectorAll('.resizable').forEach(el => {
  resizeObserver.observe(el);
});
```

## 配置选项

ResizeObserver 不像其他 Observer API 那样有复杂的配置选项，它的观察行为是固定的，总是观察目标元素的内容盒大小变化。

但是，可以通过配置项来控制观察的行为：

### box选项

通过 `boxOptions` 可以指定观察元素的哪个盒子模型：

```js
// 观察内容盒（默认）
observer.observe(element, { box: 'content-box' });

// 观察边框盒
observer.observe(element, { box: 'border-box' });

// 观察设备像素内容盒
observer.observe(element, { box: 'device-pixel-content-box' });
```

## 回调函数参数

回调函数接收一个参数，是一个 ResizeObserverEntry 对象数组：

```js
const callback = (entries) => {
  entries.forEach(entry => {
    // entry 是 ResizeObserverEntry 对象
    console.log(entry.contentRect);     // 内容矩形信息
    console.log(entry.target);          // 目标元素
    console.log(entry.borderBoxSize);   // 边框盒大小（数组）
    console.log(entry.contentBoxSize);  // 内容盒大小（数组）
    console.log(entry.devicePixelContentBoxSize); // 设备像素内容盒大小（数组）
  });
};

const observer = new ResizeObserver(callback);
```

### ResizeObserverEntry属性详解

- `contentRect`：返回目标元素的内容矩形信息，包含 x、y、width、height 属性
- `target`：观察的目标元素
- `borderBoxSize`：目标元素的边框盒大小，是一个包含 blockSize 和 inlineSize 属性的对象数组
- `contentBoxSize`：目标元素的内容盒大小，是一个包含 blockSize 和 inlineSize 属性的对象数组
- `devicePixelContentBoxSize`：目标元素在设备像素中的内容盒大小

## 实例方法

### observe()

开始观察目标元素的大小变化：

```js
const observer = new ResizeObserver(callback);
const target = document.querySelector('#target');

// 观察内容盒大小变化（默认）
observer.observe(target);

// 观察边框盒大小变化
observer.observe(target, { box: 'border-box' });
```

### unobserve()

停止观察特定目标元素：

```js
observer.unobserve(target);
```

### disconnect()

停止观察所有目标元素：

```js
observer.disconnect();
```

## 实际应用场景

### 响应式组件

```js
class ResponsiveComponent {
  constructor(element) {
    this.element = element;
    this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
    this.resizeObserver.observe(this.element);
  }
  
  handleResize(entries) {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      
      // 根据宽度调整布局
      if (width < 300) {
        this.element.classList.add('compact');
      } else {
        this.element.classList.remove('compact');
      }
    }
  }
  
  destroy() {
    this.resizeObserver.disconnect();
  }
}

// 使用
const component = new ResponsiveComponent(document.querySelector('.my-component'));
```

### 自适应视频播放器

```js
const videoContainer = document.querySelector('.video-container');
const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    const { width, height } = entry.contentRect;
    
    // 根据容器大小调整视频尺寸
    const video = videoContainer.querySelector('video');
    video.width = width;
    video.height = height;
    
    // 调整控件大小
    const controls = videoContainer.querySelector('.video-controls');
    controls.style.width = `${width}px`;
  }
});

resizeObserver.observe(videoContainer);
```

### 文本截断检测

```js
const textElement = document.querySelector('.ellipsis-text');
const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    const element = entry.target;
    const isOverflowing = element.scrollHeight > element.clientHeight || 
                         element.scrollWidth > element.clientWidth;
    
    // 根据是否溢出来显示/隐藏"更多"按钮
    const moreButton = element.parentNode.querySelector('.more-button');
    if (isOverflowing) {
      moreButton.style.display = 'block';
    } else {
      moreButton.style.display = 'none';
    }
  }
});

resizeObserver.observe(textElement);
```

## 浏览器兼容性

ResizeObserver 在现代浏览器中有良好的支持，但在一些较老的浏览器中可能需要 polyfill：

```js
// 检查浏览器支持
if ('ResizeObserver' in window) {
  // 使用 ResizeObserver
  const observer = new ResizeObserver(callback);
} else {
  // 降级处理方案
  // 可以使用 resize 事件或第三方 polyfill
  window.addEventListener('resize', handleResize);
}
```

## 性能优化建议

1. **及时取消观察**：当不再需要监听元素大小变化时，使用 `unobserve()` 或 `disconnect()` 方法
2. **批量处理**：ResizeObserver 的回调是批量执行的，合理利用这一特性
3. **避免在回调中进行复杂操作**：在回调函数中执行复杂操作可能会影响性能
4. **合理选择观察的盒子模型**：根据实际需求选择 content-box 或 border-box

## 与其他技术对比

| 特性 | ResizeObserver | window.resize 事件 | 轮询检查 |
|------|----------------|-------------------|----------|
| 性能 | 高（异步、仅在需要时触发） | 中（每次窗口大小变化都会触发） | 低（定时执行） |
| 精确度 | 高（元素级别的监听） | 低（仅窗口级别） | 高但效率低 |
| 实现复杂度 | 简单 | 简单 | 复杂 |
| 浏览器支持 | 现代浏览器 | 所有浏览器 | 所有浏览器 |

## 相关资源

- [MDN ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)
- [MDN ResizeObserverEntry](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserverEntry)
- [W3C Resize Observer Specification](https://www.w3.org/TR/resize-observer/)
- [Can I Use: ResizeObserver](https://caniuse.com/resizeobserver)