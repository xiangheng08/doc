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
      { link: '/css/style/outline' },
      { link: '/css/style/display' },
      { link: '/css/style/border' },
      { link: '/css/style/cursor' },
    ],
  },
  {
    text: '基础概念',
    items: [
      { link: '/css/overflow-scroll' },
      { link: '/css/float' },
      { link: '/css/position' },
      { link: '/css/transform' },
      { link: '/css/transition' },
      { link: '/css/animation' },
      { link: '/css/selector' },
      { link: '/css/box-model' },
      { link: '/css/media-query' },
      { link: '/css/var' },
    ],
  },
  {
    text: '布局',
    items: [
      { link: '/css/layout/float' },
      { link: '/css/layout/responsive' },
      { link: '/css/layout/flex' },
      { link: '/css/layout/grid' },
      { link: '/css/layout/table' },
      { link: '/css/layout/multiple-column' },
    ],
  },
  { text: '属性', items: [{ link: '/css/property/clip-path' }] },
  { link: '/css/values-and-units' },
  {
    text: '数据类型',
    items: [
      { link: '/css/type/blend-mode' },
      { link: '/css/type/easing-function' },
    ],
  },
] satisfies DefaultTheme.Sidebar
