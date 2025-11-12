# 资源

整理 GSAP 相关的官方资源、学习资料和实用工具，帮助开发者更好地学习和使用 GSAP。

## 官方资源

### 官方文档链接

- [GSAP 官方文档](https://greensock.com/docs/) - 最权威的 GSAP 使用文档
- [GSAP API 文档](https://greensock.com/docs/v3/GSAP) - 详细的 API 参考
- [GSAP 官方教程](https://greensock.com/starter-guides/) - 入门指南和进阶教程
- [GSAP 更新日志](https://greensock.com/docs/v3/CHANGELOG) - 版本更新和变更记录

### 示例库地址

- [GSAP 官方示例](https://greensock.com/examples-showcases/) - 官方提供的各种动画示例
- [CodePen 示例集合](https://codepen.io/collection/GJxgRx) - 社区贡献的 GSAP 示例
- [GSAP Playground](https://codepen.io/GreenSock/pen/ExWXqzb) - 在线代码实验场

### 社区论坛

- [GreenSock Forums](https://greensock.com/forums/) - 官方论坛，可以提问和交流
- [Stack Overflow GSAP 标签](https://stackoverflow.com/questions/tagged/gsap) - Stack Overflow 上的 GSAP 问题
- [Reddit GSAP 社区](https://www.reddit.com/r/gsap/) - Reddit 上的 GSAP 讨论区

### 更新日志跟踪

```js
// 检查 GSAP 版本更新的工具函数
function checkGSAPVersion() {
  console.log('当前 GSAP 版本:', gsap.version);
  
  // 可以通过 API 检查最新版本
  fetch('https://data.jsdelivr.com/v1/package/npm/gsap')
    .then(response => response.json())
    .then(data => {
      const latestVersion = data.tags.latest;
      console.log('最新 GSAP 版本:', latestVersion);
      
      if (latestVersion !== gsap.version) {
        console.warn('有新版本可用，请考虑升级');
      }
    })
    .catch(error => {
      console.error('检查版本失败:', error);
    });
}

// 在开发环境中定期检查更新
if (process.env.NODE_ENV === 'development') {
  checkGSAPVersion();
}
```

### GitHub 仓库

- [GSAP GitHub](https://github.com/greensock/GSAP) - GSAP 源码仓库
- [GSAP Discussions](https://github.com/greensock/GSAP/discussions) - GitHub 讨论区
- [GSAP Issues](https://github.com/greensock/GSAP/issues) - 问题追踪和反馈

## 学习资源

### 推荐教程列表

1. [Getting Started with GSAP](https://greensock.com/get-started/) - 官方入门教程
2. [GSAP Fundamentals](https://css-tricks.com/well-rounded-column/) - CSS-Tricks 的 GSAP 基础教程
3. [ScrollTrigger Tutorial](https://codingreflections.com/scrolltrigger-tutorial/) - ScrollTrigger 详细教程
4. [GSAP Best Practices](https://css-tricks.com/tips-for-writing-animation-code-that-is-easy-to-debug/) - 动画代码调试技巧

### 视频课程资源

- [GSAP 3 Fundamentals (YouTube)](https://www.youtube.com/watch?v=QjL39-ZzLSs) - 免费的 GSAP 3 基础视频教程
- [Advanced GSAP Animations](https://www.udemy.com/course/gsap-from-beginner-to-hero/) - Udemy 上的进阶课程
- [GSAP ScrollTrigger Course](https://www.youtube.com/playlist?list=PL7dF58EnA4E537B7F) - ScrollTrigger 专项课程
- [GreenSock Learning](https://www.youtube.com/user/GreenSockLearning) - GreenSock 官方 YouTube 频道

### 博客文章推荐

- [Why GSAP is the Best Animation Library](https://css-tricks.com/myth-busting-css-animations-vs-javascript/) - 为什么 GSAP 是最好的动画库
- [GSAP Performance Tips](https://greensock.com/why-gsap/#performance) - GSAP 性能优化技巧
- [Building Complex Animations with GSAP](https://tympanus.net/codrops/2021/01/19/inspirational-websites-roundup-10/) - 使用 GSAP 构建复杂动画
- [GSAP vs CSS Animations](https://greensock.com/css3/) - GSAP 与 CSS 动画的对比

### 开源项目参考

- [GSAP Examples Collection](https://github.com/GreenSock/gsap-examples) - 官方示例集合
- [Awesome GSAP](https://github.com/AjayPoshak/awesome-gsap) - 精选的 GSAP 资源列表
- [GSAP React Examples](https://github.com/GreenSock/gsap-react-examples) - React 中使用 GSAP 的示例
- [GSAP Vue Examples](https://github.com/GreenSock/gsap-vue-examples) - Vue 中使用 GSAP 的示例

### 书籍推荐

虽然专门介绍 GSAP 的书籍不多，但以下前端动画相关书籍值得参考：

1. 《动画原理》- 理解动画设计的基本原理
2. 《CSS 动画实战》- CSS 动画和过渡效果
3. 《前端架构：从入门到微前端》- 包含动画在前端架构中的应用
4. 《Web 性能权威指南》- 理解动画性能优化

## 工具与资源

### 在线缓动生成器

- [GSAP Ease Visualizer](https://greensock.com/ease-visualizer/) - 官方缓动函数可视化工具
- [Cubic-Bezier Generator](https://cubic-bezier.com/) - 贝塞尔曲线生成器
- [Easings.net](https://easings.net/) - 常用缓动函数可视化参考

### 动画调试工具

```js
// 自定义调试工具
class GSAPDebugger {
  // 显示动画信息
  static showAnimationInfo(animation) {
    console.group('GSAP Animation Info');
    console.log('Targets:', animation.targets());
    console.log('Duration:', animation.duration());
    console.log('Progress:', animation.progress());
    console.log('Time:', animation.time());
    console.log('TotalTime:', animation.totalTime());
    console.log('IsActive:', animation.isActive());
    console.log('IsPaused:', animation.paused());
    console.groupEnd();
  }
  
  // 高亮动画元素
  static highlightTargets(animation, color = 'red') {
    const targets = animation.targets();
    targets.forEach(target => {
      const originalOutline = target.style.outline;
      target.style.outline = `2px solid ${color}`;
      
      // 3秒后恢复
      setTimeout(() => {
        target.style.outline = originalOutline;
      }, 3000);
    });
  }
  
  // 监控动画性能
  static monitorPerformance(animation, callback) {
    const startTime = performance.now();
    
    animation.eventCallback('onComplete', () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      console.log('Animation Performance:', {
        duration: `${duration.toFixed(2)}ms`,
        fps: (1000 / (duration / animation.totalTime())).toFixed(2)
      });
      
      if (callback) callback(duration);
    });
  }
}

// 使用示例
const tween = gsap.to('.element', { x: 100, duration: 1 });

// 显示动画信息
GSAPDebugger.showAnimationInfo(tween);

// 高亮动画元素
GSAPDebugger.highlightTargets(tween, 'blue');

// 监控性能
GSAPDebugger.monitorPerformance(tween, (duration) => {
  if (duration > 1000) {
    console.warn('动画执行时间较长，请检查性能');
  }
});
```

### 代码片段库

```js
// 常用动画模式代码片段

// 1. 文本逐字动画
function animateText(element, duration = 1) {
  const text = element.textContent;
  element.innerHTML = text
    .split('')
    .map(char => `<span class="char">${char}</span>`)
    .join('');
  
  return gsap.from(element.querySelectorAll('.char'), {
    opacity: 0,
    y: 20,
    stagger: duration / text.length,
    duration: duration / 2
  });
}

// 2. 卡片翻转动画
function createFlipCard(frontElement, backElement) {
  const tl = gsap.timeline({ paused: true });
  
  tl.to(frontElement, {
    rotationY: -180,
    duration: 0.6
  })
  .set(backElement, {
    rotationY: 180,
    zIndex: 2
  }, 0)
  .to(backElement, {
    rotationY: 0,
    duration: 0.6
  });
  
  return tl;
}

// 3. 路径绘制动画
function drawSVGPath(pathElement, duration = 1) {
  const length = pathElement.getTotalLength();
  
  gsap.set(pathElement, {
    strokeDasharray: length,
    strokeDashoffset: length
  });
  
  return gsap.to(pathElement, {
    strokeDashoffset: 0,
    duration,
    ease: 'power2.out'
  });
}

// 4. 视差滚动效果
function createParallax(element, speed = 0.5) {
  return gsap.to(element, {
    y: () => -(window.scrollY * speed),
    scrollTrigger: {
      trigger: element,
      scrub: true
    }
  });
}

// 5. 数字计数动画
function animateNumber(element, start, end, duration = 1) {
  const obj = { value: start };
  
  return gsap.to(obj, {
    value: end,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.floor(obj.value);
    }
  });
}
```

### 设计师协作工具

- [Figma to GSAP](https://www.figma.com/community/plugin/735098390980346212/Figma-to-GSAP) - Figma 插件，导出 GSAP 代码
- [Principle](https://principleformac.com/) - 动画原型设计工具
- [Framer](https://www.framer.com/) - 交互原型设计工具
- [Lottie](https://lottiefiles.com/) - 与 After Effects 配合使用的动画工具

### 性能测试工具

```js
// 性能测试工具集
class AnimationPerformanceTester {
  // 测试动画帧率
  static testFPS(animation, testDuration = 3000) {
    return new Promise((resolve) => {
      let frameCount = 0;
      let startTime = performance.now();
      let testEndTime = startTime + testDuration;
      let results = [];
      
      const measureFPS = () => {
        frameCount++;
        const now = performance.now();
        
        if (now - startTime >= 1000) {
          const fps = frameCount;
          results.push(fps);
          frameCount = 0;
          startTime = now;
        }
        
        if (now < testEndTime && animation.isActive()) {
          requestAnimationFrame(measureFPS);
        } else {
          const averageFPS = results.reduce((a, b) => a + b, 0) / results.length;
          resolve({
            averageFPS: Math.round(averageFPS),
            minFPS: Math.min(...results),
            maxFPS: Math.max(...results),
            samples: results.length
          });
        }
      };
      
      measureFPS();
    });
  }
  
  // 内存使用测试
  static async testMemoryUsage(animationFn, iterations = 10) {
    // 强制垃圾回收（如果可用）
    if (window.gc) {
      window.gc();
    }
    
    const startMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
    
    // 执行多次动画
    const animations = [];
    for (let i = 0; i < iterations; i++) {
      animations.push(animationFn());
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // 等待动画完成
    await Promise.all(animations.map(anim => 
      new Promise(resolve => {
        if (anim) {
          anim.then ? anim.then(resolve) : resolve();
        } else {
          resolve();
        }
      })
    ));
    
    // 再次强制垃圾回收
    if (window.gc) {
      window.gc();
    }
    
    const endMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
    
    return {
      memoryIncrease: endMemory - startMemory,
      memoryIncreaseMB: Math.round((endMemory - startMemory) / 1024 / 1024 * 100) / 100
    };
  }
  
  // 综合性能报告
  static async generatePerformanceReport(animationFn) {
    console.log('开始性能测试...');
    
    // 测试帧率
    const animation = animationFn();
    const fpsResults = await this.testFPS(animation);
    
    // 测试内存
    const memoryResults = await this.testMemoryUsage(animationFn);
    
    console.group('=== 动画性能报告 ===');
    console.log('帧率测试结果:', fpsResults);
    console.log('内存使用结果:', memoryResults);
    
    // 性能评估
    const performanceRating = 
      fpsResults.averageFPS >= 50 ? '优秀' :
      fpsResults.averageFPS >= 30 ? '良好' : '需要优化';
    
    console.log('性能评级:', performanceRating);
    console.groupEnd();
    
    return {
      fps: fpsResults,
      memory: memoryResults,
      rating: performanceRating
    };
  }
}

// 使用示例
/*
AnimationPerformanceTester.generatePerformanceReport(() => {
  return gsap.to('.test-element', {
    x: 100,
    duration: 1,
    repeat: 2,
    yoyo: true
  });
});
*/
```

## 社区与生态

### 活跃社区平台

- [GreenSock 官方论坛](https://greensock.com/forums/) - 最活跃的 GSAP 社区
- [Discord 社区](https://discord.gg/7mVH3ZZT) - 实时聊天和交流
- [Twitter #GSAP](https://twitter.com/hashtag/gsap) - Twitter 上的 GSAP 讨论
- [CodePen 社区](https://codepen.io/tag/gsap/) - CodePen 上的 GSAP 作品

### 第三方工具生态

- [ScrollTrigger Inspector](https://chrome.google.com/webstore/detail/scrolltrigger-inspector/gnanidknkadhichkkmjaijlghcjoommj) - Chrome 扩展，用于调试 ScrollTrigger
- [GSAP DevTools](https://greensock.com/docs/v3/DevTools) - 官方开发工具
- [React Hooks for GSAP](https://github.com/ondigitalagency/useGSAP) - React 中使用 GSAP 的 Hooks
- [Vue Composables for GSAP](https://github.com/julienbourgain/vue-use-gsap) - Vue 3 中使用 GSAP 的 Composables

### 设计师资源

- [Animation Inspiration](https://www.awwwards.com/websites/animation/) - 优秀动画网站灵感
- [UI Movement](https://uimovement.com/) - UI 动画灵感库
- [Dribbble Animation](https://dribbble.com/tags/animation) - Dribbble 上的动画设计
- [Lapa Ninja](https://www.lapa.ninja/tag/animation/) - 带有动画效果的网站模板

### 未来趋势预测

1. **Web Animation API 集成** - 更好的原生动画支持
2. **WebGL 动画结合** - 3D 动画和复杂效果
3. **AI 驱动的动画** - 智能动画生成和优化
4. **增强现实动画** - AR/VR 中的动画应用
5. **性能优化** - 更高效的动画引擎和渲染优化

### 参与贡献指南

```js
// 开源贡献模板
/*
## 如何为 GSAP 生态做贡献

### 1. 报告问题
- 在 GitHub Issues 中搜索是否已有相同问题
- 提供详细的复现步骤和环境信息
- 包含代码示例和截图

### 2. 提交 Pull Request
- Fork 官方仓库
- 创建功能分支
- 编写清晰的提交信息
- 添加必要的测试用例
- 遵循代码风格指南

### 3. 分享知识
- 在社区论坛回答问题
- 编写教程和博客文章
- 创建示例项目和代码片段
- 在社交媒体上分享 GSAP 技巧

### 4. 支持社区
- 帮助新手解决问题
- 参与代码审查
- 组织或参与技术分享会
- 翻译文档和教程
*/

// 社区贡献检查清单
const contributionChecklist = {
  code: [
    '代码遵循项目风格指南',
    '包含适当的注释和文档',
    '通过所有测试用例',
    '没有引入新的错误或警告'
  ],
  
  documentation: [
    '语言清晰易懂',
    '包含实际代码示例',
    '提供多种使用场景',
    '更新相关文档链接'
  ],
  
  examples: [
    '代码可运行且无错误',
    '包含详细的说明',
    '展示最佳实践',
    '考虑可访问性和性能'
  ]
};
```

通过充分利用这些资源，开发者可以更高效地学习和使用 GSAP，创建出令人印象深刻的动画效果。
