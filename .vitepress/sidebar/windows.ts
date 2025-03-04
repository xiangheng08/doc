import { DefaultTheme } from 'vitepress'

export default [
  { link: '/windows/tips' },
  {
    text: '脚本',
    items: [
      { link: '/windows/script/powershell-history' },
      { link: '/windows/script/silent-runner' },
    ],
  },
] satisfies DefaultTheme.Sidebar
