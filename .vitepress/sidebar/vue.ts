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
      { link: '/vue/vue3/reactivity-core' },
      { link: '/vue/vue3/reactivity-utilities' },
      { link: '/vue/vue3/reactivity-advanced' },
      { link: '/vue/vue3/lifecycle' },
      { link: '/vue/vue3/lifecycle-hook' },
      { link: '/vue/vue3/dependency-injection' },
      { link: '/vue/vue3/helpers' },
      { link: '/vue/vue3/global-api' },
      { link: '/vue/vue3/reactivity' },
      { link: '/vue/vue3/components' },
      { link: '/vue/vue3/composables' },
    ],
  },
  { link: '/vue/built-in-directives' },
  { link: '/vue/modifiers' },
  { link: '/vue/style-penetration' },
  { link: '/vue/built-ins/special-elements' },
  {
    text: '内置组件',
    items: [
      { link: '/vue/built-ins/transition' },
      { link: '/vue/built-ins/transition-group' },
      { link: '/vue/built-ins/keep-alive' },
      { link: '/vue/built-ins/teleport' },
      { link: '/vue/built-ins/suspense' },
    ],
  },
  {
    text: '实践应用',
    items: [{ link: '/vue/practice/batch-render' }],
  },
  {
    text: 'Hooks',
    items: [
      { link: '/vue/hooks/lock' },
      { link: '/vue/hooks/paging' },
      { link: '/vue/hooks/paging-js' },
      { link: '/vue/hooks/appearance' },
      { link: '/vue/hooks/broadcast' },
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
  { text: 'Vite', link: '/vite/' },
  { text: 'Vue CLI', link: '/vue/cli' },
  { text: 'Vue DevTools', link: 'https://devtools.vuejs.org/' },
  {
    text: 'Vue - Official（VS Code）',
    link: 'https://marketplace.visualstudio.com/items?itemName=Vue.volar',
  },
] satisfies DefaultTheme.Sidebar
