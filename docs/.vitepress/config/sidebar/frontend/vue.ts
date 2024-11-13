import { define } from '../../../utils';
import { DefaultTheme } from 'vitepress';

export default {
  '/frontend/vue/': define<DefaultTheme.SidebarItem[]>([
    {
      text: 'Vue 基础',
      collapsed: true,
      items: [
        {
          text: '安装',
          link: '/frontend/vue/basic/install',
        },
        {
          text: 'Vue 开发者工具',
          link: '/frontend/vue/basic/devtools',
        },
        {
          text: 'Vue 实例',
          link: '/frontend/vue/basic/instance',
        },
        {
          text: '模板语法',
          link: '/frontend/vue/basic/syntax',
        },
        {
          text: '指令',
          link: '/frontend/vue/basic/directives',
        },
        {
          text: '计算属性和侦听器',
          link: '/frontend/vue/basic/computed-watch',
        },
        {
          text: 'class 与 style 绑定',
          link: '/frontend/vue/basic/class-style',
        },
        {
          text: '条件渲染',
          link: '/frontend/vue/basic/conditional',
        },
        {
          text: '列表渲染',
          link: '/frontend/vue/basic/list',
        },
        {
          text: '响应式原理',
          link: '/frontend/vue/basic/reactivity',
        },
        {
          text: '事件处理',
          link: '/frontend/vue/basic/events',
        },
        {
          text: '表单数据收集',
          link: '/frontend/vue/basic/forms',
        },
      ],
    },
    {
      text: 'Vue 核心',
      link: '/frontend/vue/core',
    },
  ]),
};