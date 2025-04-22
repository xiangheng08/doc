import { DefaultTheme } from 'vitepress'

export default [
  {
    text: 'Vue 基础',
    items: [
      {
        text: '安装',
        link: '/vue/basic/install',
      },
      {
        text: 'Vue 开发者工具',
        link: '/vue/basic/devtools',
      },
      {
        text: 'Vue 实例',
        link: '/vue/basic/instance',
      },
      {
        text: '模板语法',
        link: '/vue/basic/syntax',
      },
      {
        text: '指令',
        link: '/vue/basic/directives',
      },
      {
        text: '计算属性和侦听器',
        link: '/vue/basic/computed-watch',
      },
      {
        text: 'class 与 style 绑定',
        link: '/vue/basic/class-style',
      },
      {
        text: '条件渲染',
        link: '/vue/basic/conditional',
      },
      {
        text: '列表渲染',
        link: '/vue/basic/list',
      },
      {
        text: '响应式原理',
        link: '/vue/basic/reactivity',
      },
      {
        text: '事件处理',
        link: '/vue/basic/events',
      },
      {
        text: '表单数据收集',
        link: '/vue/basic/forms',
      },
    ],
  },
  {
    text: 'Vue 核心',
    link: '/vue/core',
  },
  {
    text: '实践应用',
    items: [{ link: '/vue/practice/batch-render' }],
  },
  {
    text: '通用组件',
    items: [
      { link: '/vue/generic-component/file-drop/' },
      { link: '/vue/generic-component/infinite-scroll/' },
    ],
  },
  { link: '/vue/style-penetration' },
  {
    text: 'Hooks',
    items: [
      { link: '/vue/hooks/lock' },
      { link: '/vue/hooks/paging' },
      { link: '/vue/hooks/paging-js' },
    ],
  },
] satisfies DefaultTheme.Sidebar
