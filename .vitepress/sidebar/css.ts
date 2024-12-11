import { DefaultTheme } from 'vitepress'

export default [
  { link: '/css/index' },
  { link: '/css/selector' },
  { link: '/css/box-model' },
  { link: '/css/media-query' },
  {
    text: '样式',
    items: [{ link: '/css/style/cursor' }],
  },
] satisfies DefaultTheme.Sidebar
