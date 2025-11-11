import { DefaultTheme } from 'vitepress'

export default [
  { link: '/front-end-engineering/' },
  // {
  //   text: '构建工具',
  //   items: [{ text: '简介', link: '/front-end-engineering/build-tools/' }],
  // },
  // {
  //   text: '代码规范',
  //   items: [
  //     { text: '简介', link: '/front-end-engineering/code-standards/' },
  //   ],
  // },
  // {
  //   text: '部署',
  //   items: [{ text: '简介', link: '/front-end-engineering/deployment/' }],
  // },
  // {
  //   text: '性能优化',
  //   items: [{ text: '简介', link: '/front-end-engineering/performance/' }],
  // },
  // {
  //   text: '测试',
  //   items: [{ text: '简介', link: '/front-end-engineering/testing/' }],
  // },
  // {
  //   text: '模块化',
  //   items: [{ text: '简介', link: '/front-end-engineering/modules/' }],
  // },
  {
    text: 'Monorepo',
    items: [
      { text: '简介', link: '/front-end-engineering/monorepo/' },
      { link: '/front-end-engineering/monorepo/pnpm' },
    ],
  },
  { text: 'Prettier', link: '/prettier/' },
] satisfies DefaultTheme.Sidebar
