import { DefaultTheme } from 'vitepress'

export default [
  {
    text: 'Element Plus',
    items: [
      { link: '/ui/element-plus/issues' },
      { link: '/ui/element-plus/tree-select-display-full-path' },
      { link: '/ui/element-plus/generate-theme-color/' },
      {
        text: 'Directives',
        items: [{ link: '/ui/element-plus/directives/hover-column' }],
      },
    ],
  },
  {
    text: 'Element UI',
    items: [
      {
        text: '封装',
        items: [
          { link: '/ui/element-ui/encapsulation/native-input-suggestions' },
        ],
      },
    ],
  },
  {
    text: 'Vant UI',
    items: [
      { text: '简介', link: '/ui/vant/' }
    ]
  },
] satisfies DefaultTheme.Sidebar
