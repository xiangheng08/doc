import { DefaultTheme } from 'vitepress'

export default [
  { link: '/vscode/tips' },
  { link: '/vscode/shortcut' },
  { link: '/vscode/extension-list' },
  {
    text: '扩展',
    items: [{ link: '/vscode/extension/yzhang.markdown-all-in-one' }],
  },
] satisfies DefaultTheme.Sidebar
