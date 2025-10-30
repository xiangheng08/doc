import { DefaultTheme } from 'vitepress'

export default [
  { link: '/utils/debounce/' },
  { link: '/utils/throttle-and-debounces/' },
  { link: '/utils/get-error-message/' },
  { link: '/utils/format-amount/' },
  { link: '/utils/format-bytes/' },
  { link: '/utils/format-duration/' },
  { link: '/utils/add-thousands-separator/' },
  {
    text: '浏览器',
    items: [
      { link: '/utils/browser/select-file/' },
      { link: '/utils/browser/load-image/' },
    ],
  },
] satisfies DefaultTheme.Sidebar
