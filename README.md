# Doc

## 目录结构

- 每个技术栈在 src 目录下都有一个单独的目录，如 src/react、src/vue 等。
- 组件放在各自的 components 目录下，比如 vue 的 transition 组件需要演示组件，则放在 src/vue/components 目录下，如果 transition 有单独的目录则放在 src/vue/transition/components 目录下。
- 图片与组件存放规则一样

## 侧边栏

如果需要自动生成侧边栏，请将 sidebar 的 text 按照以下格式书写：

```ts
{
  // $[原 text 属性值](需要生成的目录路径)
  text: '$[text](/src/js)',
}
```

## 代办

- [ ] 实现“自动生成侧边栏”（不急）
- [x] 添加图片预览[参考](https://www.whbbit.cn/2024/01/06/%E7%BB%99%E4%BD%A0%E7%9A%84vitepress%E6%B7%BB%E5%8A%A0%E5%9B%BE%E7%89%87%E9%A2%84%E8%A7%88%E5%8A%9F%E8%83%BD/)
- [ ] 实现 demo 容器展开/收起时的高度动画
