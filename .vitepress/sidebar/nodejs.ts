import { DefaultTheme } from 'vitepress'

export default [
  { link: '/nodejs/index' },
  { link: '/nodejs/functions' },
  {
    text: '子进程',
    items: [{ link: '/nodejs/child-process/scenarios' }],
  },
  {
    text: '项目开发',
    items: [
      {
        link: '/nodejs/project/env',
      },
    ],
  },
] satisfies DefaultTheme.Sidebar
