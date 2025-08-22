import { DefaultTheme } from 'vitepress'

export default [
  { link: '/browser/reflow-repaint' },
  {
    text: '开发者工具',
    items: [{ link: '/browser/devtools/lighthouse' }],
  },
] satisfies DefaultTheme.Sidebar
