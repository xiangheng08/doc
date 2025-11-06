import { DefaultTheme } from 'vitepress'

export default [
  { link: '/web-component/' },
  {
    text: 'Lit',
    items: [
      { link: '/web-component/lit/' },
      { link: '/web-component/lit/intro' },
      { link: '/web-component/lit/concepts' },
      { link: '/web-component/lit/template-syntax' },
      { link: '/web-component/lit/component-structure' },
      { link: '/web-component/lit/lifecycle' },
      { link: '/web-component/lit/event-handling' },
      { link: '/web-component/lit/styling' },
      { link: '/web-component/lit/tooling' },
      { link: '/web-component/lit/best-practices' },
      { link: '/web-component/lit/cheatsheet' },
    ],
  },
] satisfies DefaultTheme.Sidebar
