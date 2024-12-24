import { DefaultTheme } from 'vitepress'

export default [
  {
    text: '效果',
    items: [
      { link: 'vitepress/effect/smooth-scroll' },
      // {
      //   text: '侧栏大纲自动滚动',
      //   link: 'vitepress/effect/outline-auto-scroll',
      // },
    ],
  },
  { link: 'vitepress/error' },
] satisfies DefaultTheme.Sidebar
