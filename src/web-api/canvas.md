# Canvas API

## 简介

Canvas API 提供了一个通过 JavaScript 在网页上绘制图形的方式。它是一个可以在其中绘制图形、制作图片集合，甚至实现动画效果的 HTML 元素。`<canvas>` 元素只是一个绘图容器，必须使用 JavaScript 来实际绘制图形。

Canvas API 主要聚焦于 2D 图形，而 WebGL API 则用于硬件加速的 2D 和 3D 图形。

## 基本用法

### 创建 Canvas 元素

要使用 Canvas API，首先需要在 HTML 中创建一个 `<canvas>` 元素：

```html
<canvas id="myCanvas" width="400" height="250">
  您的浏览器不支持 Canvas
</canvas>
```

如果浏览器不支持 Canvas，会显示 `<canvas>` 标签中的替代文本。

注意：`<canvas>` 元素只有两个属性——`width` 和 `height`。这些是可选的，默认情况下 canvas 的宽度为 300 像素，高度为 150 像素。

### 获取绘图上下文

在 JavaScript 中，需要先获取 Canvas 的绘图上下文，然后才能进行绘制操作：

```js
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
```

`getContext('2d')` 方法返回一个 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 对象，所有绘图操作都通过这个对象完成。

## 绘制基本图形

### 矩形

Canvas 提供了三个方法来绘制矩形：

- [fillRect(x, y, width, height)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillRect)：绘制一个填充的矩形
- [strokeRect(x, y, width, height)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeRect)：绘制一个矩形的边框
- [clearRect(x, y, width, height)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/clearRect)：清除指定矩形区域，让清除部分完全透明

```js
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 绘制一个填充的矩形
ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100);

// 绘制一个矩形边框
ctx.strokeStyle = 'red';
ctx.strokeRect(120, 10, 100, 100);

// 清除一个矩形区域
ctx.clearRect(140, 30, 60, 60);
```

### 绘制路径

要绘制复杂图形，需要使用路径（Path）功能。路径是一系列相连的线段和曲线。

绘制路径的基本步骤：

1. 调用 [beginPath()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/beginPath) 开始绘制新路径
2. 使用绘图命令设置路径
3. 调用 [closePath()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/closePath) 闭合路径（可选）
4. 调用 [stroke()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/stroke) 或 [fill()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fill) 进行绘制

常用的路径绘制方法：

- [moveTo(x, y)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/moveTo)：将笔触移动到指定坐标
- [lineTo(x, y)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineTo)：从当前点绘制直线到指定坐标
- [arc(x, y, radius, startAngle, endAngle, anticlockwise)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/arc)：绘制圆弧或圆形
- [arcTo(x1, y1, x2, y2, radius)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/arcTo)：根据给定的控制点和半径绘制圆弧

```js
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 绘制三角形
ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(200, 200);
ctx.lineTo(100, 200);
ctx.closePath();
ctx.fill();

// 绘制圆形
ctx.beginPath();
ctx.arc(300, 150, 50, 0, Math.PI * 2, true);
ctx.stroke();
```

### 绘制文本

Canvas 提供了绘制文本的方法：

- [fillText(text, x, y [, maxWidth])](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillText)：绘制填充文本
- [strokeText(text, x, y [, maxWidth])](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeText)：绘制文本边框
- [measureText(text)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/measureText)：测量文本的宽度

相关的文本属性：

- [font](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/font)：设置字体样式
- [textAlign](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/textAlign)：设置文本对齐方式
- [textBaseline](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/textBaseline)：设置文本基线

```js
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

ctx.font = '30px Arial';
ctx.fillText('Hello Canvas', 50, 50);

ctx.textAlign = 'center';
ctx.strokeText('Centered Text', 200, 100);
```

## 样式和颜色

### 颜色

- [fillStyle](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillStyle)：设置填充颜色
- [strokeStyle](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeStyle)：设置描边颜色

```js
// 使用颜色名称
ctx.fillStyle = 'red';

// 使用十六进制值
ctx.fillStyle = '#FF0000';

// 使用 RGB 值
ctx.fillStyle = 'rgb(255, 0, 0)';

// 使用 RGBA 值（带透明度）
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
```

### 线型

- [lineWidth](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineWidth)：设置线条宽度
- [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)：设置线条端点样式
- [lineJoin](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin)：设置线条连接点样式
- [setLineDash(segments)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/setLineDash)：设置虚线样式
- [getLineDash()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getLineDash)：获取虚线样式

```js
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.setLineDash([10, 5]); // 10像素实线，5像素空白
```

## 渐变和图案

### 渐变

Canvas 支持创建线性渐变和径向渐变：

- [createLinearGradient(x0, y0, x1, y1)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createLinearGradient)：创建线性渐变
- [createRadialGradient(x0, y0, r0, x1, y1, r1)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createRadialGradient)：创建径向渐变
- [addColorStop(offset, color)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasGradient/addColorStop)：为渐变添加颜色断点

```js
// 创建线性渐变
const gradient = ctx.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop(0, 'red');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;
ctx.fillRect(10, 10, 200, 100);
```

### 图案

- [createPattern(image, repetition)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createPattern)：创建图案

```js
const img = document.getElementById('myImage');
const pattern = ctx.createPattern(img, 'repeat');
ctx.fillStyle = pattern;
ctx.fillRect(0, 0, 300, 300);
```

## 变换

Canvas 提供了多种变换方法来改变绘图坐标系：

- [translate(x, y)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/translate)：移动坐标系原点
- [rotate(angle)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/rotate)：旋转坐标系
- [scale(x, y)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/scale)：缩放坐标系
- [transform(a, b, c, d, e, f)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/transform)：应用自定义变换矩阵
- [setTransform(a, b, c, d, e, f)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/setTransform)：重置并应用变换矩阵
- [save()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/save) 和 [restore()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/restore)：保存和恢复绘图状态

```js
// 保存当前状态
ctx.save();

// 移动并旋转坐标系
ctx.translate(100, 100);
ctx.rotate(Math.PI / 4);

// 绘制图形（会受到变换影响）
ctx.fillRect(0, 0, 50, 50);

// 恢复之前的状态
ctx.restore();
```

## 图像处理

Canvas 可以用于处理图像：

- [drawImage(image, dx, dy)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)：在指定位置绘制图像
- [drawImage(image, dx, dy, dWidth, dHeight)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)：在指定位置绘制并缩放图像
- [drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)：从源图像剪切并绘制到指定位置

```js
const img = document.getElementById('myImage');
ctx.drawImage(img, 0, 0);

// 缩放图像
ctx.drawImage(img, 0, 0, 100, 100);

// 剪切并绘制图像的一部分
ctx.drawImage(img, 30, 30, 50, 50, 0, 0, 100, 100);
```

## 像素操作

Canvas 允许直接操作像素数据：

- [createImageData(width, height)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createImageData)：创建新的 ImageData 对象
- [getImageData(sx, sy, sw, sh)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData)：获取指定区域的图像数据
- [putImageData(imageData, dx, dy)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/putImageData)：将图像数据绘制到画布上

```js
// 获取图像数据
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;

// 修改像素数据（例如：增加红色分量）
for (let i = 0; i < data.length; i += 4) {
  data[i] = 255;     // 红色分量
  // data[i+1] 是绿色分量
  // data[i+2] 是蓝色分量
  // data[i+3] 是 alpha 分量
}

// 将修改后的数据放回画布
ctx.putImageData(imageData, 0, 0);
```

## 合成

Canvas 提供了控制图形如何合成的方法：

- [globalAlpha](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalAlpha)：设置全局透明度
- [globalCompositeOperation](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)：设置图形合成方式

```js
// 设置透明度
ctx.globalAlpha = 0.5;

// 设置合成操作
ctx.globalCompositeOperation = 'multiply';
```

## 实际应用

### 动画

Canvas 常用于创建动画效果。基本的动画模式包括：

1. 清除画布
2. 保存画布状态
3. 绘制动画图形
4. 恢复画布状态
5. 使用 `requestAnimationFrame()` 重复执行

```js
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let x = 0;

function draw() {
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 绘制移动的矩形
  ctx.fillRect(x, 50, 50, 50);
  
  // 更新位置
  x++;
  if (x > canvas.width) {
    x = 0;
  }
  
  // 请求下一帧
  requestAnimationFrame(draw);
}

// 启动动画
draw();
```

### 数据可视化

Canvas 适合用于创建图表和数据可视化：

```js
function drawBarChart(data, canvas) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const barWidth = width / data.length;
  
  ctx.clearRect(0, 0, width, height);
  
  data.forEach((value, index) => {
    const barHeight = (value / Math.max(...data)) * (height - 20);
    const x = index * barWidth;
    const y = height - barHeight;
    
    ctx.fillStyle = 'blue';
    ctx.fillRect(x, y, barWidth - 2, barHeight);
  });
}
```

## 浏览器兼容性

Canvas API 在现代浏览器中有很好的支持，包括：

- Chrome 1+
- Firefox 1.5+
- Safari 2+
- Edge 12+
- IE 9+

对于不支持 Canvas 的旧浏览器，可以使用 [ExplorerCanvas](https://github.com/arv/ExplorerCanvas) 等 polyfill。

## 相关资源

- [MDN Canvas API 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)
- [CanvasRenderingContext2D API](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)
- [HTML5 Canvas 规范](https://html.spec.whatwg.org/multipage/canvas.html)
- [Can I Use: Canvas](https://caniuse.com/#feat=canvas)