import { DefaultTheme } from 'vitepress'

export default [
  { link: '/html' },
  { link: '/html/intro' },
  { link: '/html/url' },
  { link: '/html/attribute' },
  { link: '/html/encode' },
  { link: '/html/semantic' },
  {
    text: '标签',
    items: [
      { link: '/html/tags/text' },
      { link: '/html/tags/list' },
      { link: '/html/tags/image' },
      { link: '/html/tags/a' },
      { link: '/html/tags/link' },
      { link: '/html/tags/meta' },
      { link: '/html/tags/script' },
      { link: '/html/tags/multimedia' },
      { link: '/html/tags/iframe' },
      { link: '/html/tags/table' },
      { link: '/html/tags/form' },
      { link: '/html/tags/elements' },
      { link: '/html/tags/tag-list' },
    ],
  },
  {
    text: '其他',
    items: [
      {
        link: '/html/other/escape-character',
      },
    ],
  },
] satisfies DefaultTheme.Sidebar
