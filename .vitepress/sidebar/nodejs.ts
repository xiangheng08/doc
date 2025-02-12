import { DefaultTheme } from 'vitepress'

export default [
  { link: '/nodejs/index' },
  { link: '/nodejs/functions' },
  { link: '/nodejs/install' },
  { link: '/nodejs/run' },
  { link: '/nodejs/develop' },
  { link: '/nodejs/package' },
  { link: '/nodejs/commonjs' },
  { link: '/nodejs/esm' },
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
