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
      { link: '/ts/docs-explain' },
      { link: '/ts/basic' },
      { link: '/ts/types' },
      { link: '/ts/special-type' },
      { link: '/ts/array' },
      { link: '/ts/tuple' },
      { link: '/ts/symbol' },
      { link: '/ts/function' },
      { link: '/ts/object' },
      { link: '/ts/interface' },
      { link: '/ts/class' },
      { link: '/ts/generics' },
      { link: '/ts/enum' },
      { link: '/ts/assert' },
      { link: '/ts/module' },
      { link: '/ts/tsconfig-json' },
    ],
  },
] satisfies DefaultTheme.Sidebar
