---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: My doc
  text: 我的笔记
  tagline: 在这里，留下学习的痕迹
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: 关于本站
      link: /about

features:
  - title: 知识体系化
    details: 采用结构化文档分类 + 标签索引系统，支持思维导图式知识导航
  - title: 技术实践
    details: 包含可交互的Vue组件示例，配套完整代码片段与最佳实践指南
  - title: 多端同步
    details: 自适应PC/移动端访问，支持PWA离线缓存，GitHub实时内容同步
---

```js
console.log('Hello World!')
```

<script setup>
import { onMounted } from 'vue'
onMounted(() => console.log('Hello World!'))
</script>
