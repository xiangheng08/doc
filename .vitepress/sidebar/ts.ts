import { DefaultTheme } from 'vitepress'

export default [
  { link: '/ts/intro' },
  { link: '/ts/functions' },
  { link: '/ts/build-qa' },
  { link: '/ts/tips' },
  { link: '/ts/tool-type' },
  { link: '/ts/type-annotation-template' },
  { link: '/ts/event-target' },
  { link: '/ts/event-emitter' },
  {
    text: 'Utils',
    items: [{ link: '/ts/utils/paste/' }],
  },
  {
    text: '文档',
    items: [
      { link: '/ts/basic' },
      { link: '/ts/types' },
      { link: '/ts/special-type' },
      { link: '/ts/array' },
      { link: '/ts/tuple' },
    ],
  },
] satisfies DefaultTheme.Sidebar
