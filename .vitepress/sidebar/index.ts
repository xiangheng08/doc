import { DefaultTheme } from 'vitepress'

export default [
  {
    text: 'Examples',
    items: [
      { text: 'Markdown Examples', link: '/markdown-examples' },
      { text: 'Runtime API Examples', link: '/api-examples' },
      { link: '/test/test' },
    ],
  },
] satisfies DefaultTheme.Sidebar
