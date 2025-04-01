import { DefaultTheme } from 'vitepress'

export default [
  { link: '/ts/intro' },
  { link: '/ts/basic' },
  { link: '/ts/types' },
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
] satisfies DefaultTheme.Sidebar
