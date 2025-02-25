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
  { link: '/nodejs/process' },
  {
    text: 'path 模块',
    items: [{ link: '/nodejs/path' }],
  },
  {
    text: 'fs 文件系统',
    items: [
      { link: '/nodejs/fs' },
      { link: '/nodejs/fs/file-system-basics' },
      { link: '/nodejs/fs/working-with-paths' },
      { link: '/nodejs/fs/file-stats-metadata' },
      { link: '/nodejs/fs/directory-operations' },
      { link: '/nodejs/fs/advanced-techniques' },
      { link: '/nodejs/fs/error-handling-debugging' },
      { link: '/nodejs/fs/best-practices-common-pitfalls' },
    ],
  },
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
