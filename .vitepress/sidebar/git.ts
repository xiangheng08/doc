import { DefaultTheme } from 'vitepress'

export default [
  { link: '/git/command-list' },
  { link: '/git/install' },
  { link: '/git/vscode' },
  { link: '/git/pagination-shortcut' },
  { link: '/git/tips' },
  {
    link: '/git/error/index',
    // collapsed: false,
    // items: [],
  },
  {
    text: '脚本',
    items: [
      { link: '/git/script/auto_push' },
      { link: '/git/script/push-bundle' },
    ],
  },
] satisfies DefaultTheme.Sidebar
