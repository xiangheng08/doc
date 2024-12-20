import { DefaultTheme } from 'vitepress'

export default [
  { link: '/css/index' },
  { link: '/css/effect' },
  {
    text: '样式',
    items: [
      { link: '/css/style/text' },
      { link: '/css/style/background' },
      { link: '/css/style/font' },
      { link: '/css/style/link' },
      { link: '/css/style/list' },
      { link: '/css/style/table' },
      { link: '/css/style/cursor' },
    ],
  },
  { link: '/css/selector' },
  { link: '/css/box-model' },
  { link: '/css/media-query' },
] satisfies DefaultTheme.Sidebar
