import { define } from '../../../utils';
import { DefaultTheme } from "vitepress";

export default {
  '/frontend/html/': define<DefaultTheme.SidebarItem[]>([
    // {
    // 	text: '起步',
    // 	link: '/frontend/html/index',
    // },
    { link: '/frontend/html/intro' },
    { link: '/frontend/html/url' },
    { link: '/frontend/html/attribute' },
    { link: '/frontend/html/encode' },
    { link: '/frontend/html/semantic' },
    {
      text: '标签',
      collapsed: true,
      items: [
        { link: '/frontend/html/tags/text' },
        { link: '/frontend/html/tags/list' },
        { link: '/frontend/html/tags/image' },
        { link: '/frontend/html/tags/a' },
        { link: '/frontend/html/tags/link' },
        { link: '/frontend/html/tags/meta' },
        { link: '/frontend/html/tags/script' },
        { link: '/frontend/html/tags/multimedia' },
        { link: '/frontend/html/tags/iframe' },
        { link: '/frontend/html/tags/table' },
        { link: '/frontend/html/tags/form' },
        { link: '/frontend/html/tags/elements' },
        { link: '/frontend/html/tags/tag-list' },
      ],
    },
    {
      text: '其他',
      collapsed: true,
      items: [
        {
          link: '/frontend/html/other/escape-character',
        },
      ],
    },
  ])
}