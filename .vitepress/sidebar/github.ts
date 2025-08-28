import { DefaultTheme } from 'vitepress'

export default [
  { link: '/github/' },
  { link: '/github/personal_access_token' },
  { text: 'Actions', items: [{ link: '/github/actions/publish-npm' }] },
] satisfies DefaultTheme.Sidebar
