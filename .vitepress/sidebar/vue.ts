import { DefaultTheme } from 'vitepress'

export default [
  {
    text: 'Vue2',
    items: [
      { link: '/vue/vue2/intro' },
      { link: '/vue/vue2/options-api' },
      { link: '/vue/vue2/lifecycle' },
      { link: '/vue/vue2/reactivity' },
    ],
  },
  {
    text: 'Vue3',
    items: [
      { link: '/vue/vue3/intro' },
      { link: '/vue/vue3/vue2-vs-vue3' },
      { link: '/vue/vue3/composition-api' },
      { link: '/vue/vue3/global-api' },
      { link: '/vue/vue3/reactivity' },
      { link: '/vue/vue3/lifecycle' },
      { link: '/vue/vue3/components' },
      { link: '/vue/vue3/composables' },
    ],
  },
  { link: '/vue/style-penetration' },
  { link: '/vue/modifiers' },
  { link: '/vue/built-in-directives' },
  {
    text: '生态系统',
    items: [
      {
        text: 'Pinia',
        items: [
          { link: '/vue/pinia/' },
          { link: '/vue/pinia/basic-usage' },
          { link: '/vue/pinia/advanced-usage' },
          { link: '/vue/pinia/examples' },
          { link: '/vue/pinia/getters' },
          { link: '/vue/pinia/actions' },
          { link: '/vue/pinia/vscode-snippets' },
        ],
      },
      {
        text: 'Vue Router',
        items: [
          { link: '/vue/router/intro' },
          { link: '/vue/router/v3' },
          { link: '/vue/router/v4' },
          { link: '/vue/router/server-config' },
        ],
      },
      {
        text: 'Vuex',
        items: [
          { link: '/vue/vuex/' },
          { link: '/vue/vuex/vuex3' },
          { link: '/vue/vuex/vuex4' },
          { link: '/vue/vuex/vuex3-vs-vuex4' },
        ],
      },
      { text: 'Axios', link: '/axios/' },
      { text: 'Element UI', link: '/element-ui/' },
      { text: 'Element Plus', link: '/element-plus/' },
      { text: 'Echarts', link: '/echarts/' },
      { text: 'Quill', link: '/quill/' },
    ],
  },
  {
    text: '工具链',
    items: [
      { text: 'Vite', link: '/vite/' },
      { text: 'Vue CLI', link: '/vue/cli' },
      { text: 'Vue DevTools', link: 'https://devtools.vuejs.org/' },
      {
        text: 'Vue - Official（VS Code）',
        link: 'https://marketplace.visualstudio.com/items?itemName=Vue.volar',
      },
    ],
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
      { link: '/vue/generic-component/proportional-split-bar/' },
      { link: '/vue/generic-component/github-contributions/' },
    ],
  },
  {
    text: 'Hooks',
    items: [
      { link: '/vue/hooks/lock' },
      { link: '/vue/hooks/paging' },
      { link: '/vue/hooks/paging-js' },
    ],
  },
  {
    text: 'Directives',
    items: [{ link: '/vue/directives/slide-in' }],
  },
  {
    text: 'Mixins',
    items: [{ link: '/vue/mixins/paging' }],
  },

  // TODO: 后面连同md文件一起删除
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
] satisfies DefaultTheme.Sidebar
