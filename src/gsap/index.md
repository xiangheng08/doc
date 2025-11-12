# GSAP 简介

## 什么是 GSAP

GSAP (GreenSock Animation Platform) 是一个强大的 JavaScript 动画库，它允许开发者创建高性能、流畅的动画效果。无论是简单的淡入淡出效果还是复杂的交互动画，GSAP 都能胜任。

## GSAP 的历史和发展

GSAP 最初由 Jack Doyle 开发，最初专注于 ActionScript 动画。随着 Web 技术的发展，GSAP 转向 JavaScript，并不断更新迭代，目前已经成为业界领先的动画解决方案之一。

## 为什么选择 GSAP

相比 CSS 动画、jQuery animate 和 Anime.js 等其他动画解决方案，GSAP 具有以下优势：

- **卓越的性能**：专为高性能动画而设计，充分利用硬件加速
- **跨浏览器兼容性**：在各种浏览器和设备上都能提供一致的表现
- **丰富的功能集**：支持从简单到复杂的各种动画需求
- **可靠的缓动函数**：内置大量经过优化的缓动函数
- **灵活的时间轴控制**：可以精确控制动画序列和嵌套动画

## 安装与基础配置

### CDN 引入方式

最简单的使用方式是通过 CDN 引入：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
```

### npm/yarn 安装

对于模块化项目，可以通过包管理器安装：

```bash
npm install gsap
# 或者
yarn add gsap
```

### 模块化导入

安装完成后，可以根据需要导入特定的功能：

```js
import gsap from "gsap";
// 或者按需导入
import { gsap, TweenMax, TimelineLite } from "gsap";
```

## 第一个 GSAP 动画

让我们从一个简单的例子开始：

```js
// 基本语法结构
gsap.to(".box", { 
  x: 100, 
  duration: 1,
  ease: "power2.inOut"
});

// 更完整的示例
gsap.fromTo(".element", 
  { opacity: 0, y: 50 },           // 起始状态
  { opacity: 1, y: 0, duration: 0.5 } // 结束状态和配置
);
```

## 常见初始化问题排查

1. 确保脚本正确加载
2. 检查元素选择器是否正确
3. 验证 DOM 是否已完全加载后再执行动画
4. 查看浏览器控制台是否有错误信息
