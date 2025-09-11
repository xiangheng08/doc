import { DefaultTheme } from 'vitepress'

export default [
  { link: '/browser/rendering-process' },
  { link: '/browser/reflow-repaint' },
  { link: '/browser/event-loop' },
  {
    text: '开发者工具',
    items: [{ link: '/browser/devtools/lighthouse' }],
  },
] satisfies DefaultTheme.Sidebar
