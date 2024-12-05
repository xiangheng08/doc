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
