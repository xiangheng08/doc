# Doc

## 简介

这是一个基于 VitePress 构建的技术文档站点，主要用于：

- 📚 整理前后端技术栈的核心知识点
- 🧩 展示可交互的组件化代码示例
- 🛠 实践文档站点最佳工程化实践

## 目录结构

- 每个技术栈在 src 目录下都有一个单独的目录，如 src/react、src/vue 等。
- 组件放在各自的 components 目录下，比如 vue 的 transition 组件需要演示组件，则放在 src/vue/components 目录下，如果 transition 有单独的目录则放在 src/vue/transition/components 目录下。
- 图片与组件存放规则一样

## 侧边栏

> [!WARNING]
> 暂未实现该功能

如果需要自动生成侧边栏，请将 sidebar 的 text 按照以下格式书写：

```ts
{
  // [原 text 属性值](需要生成的目录路径)
  text: '[text](/src/js)',
}
```
