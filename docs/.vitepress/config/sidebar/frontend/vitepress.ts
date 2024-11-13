import { define } from '../../../utils';
import { DefaultTheme } from 'vitepress';

export default {
  '/frontend/vitepress/': define<DefaultTheme.SidebarItem[]>([
    {
      text: '效果',

      collapsed: true,
      items: [
        {
          text: '平滑滚动',
          link: '/frontend/vitepress/effect/smooth-scroll',
        },
        {
          text: '侧栏大纲自动滚动',
          link: '/frontend/vitepress/effect/outline-auto-scroll',
        },
      ],
    },
    {
      text: '遇到的错误',
      link: '/frontend/vitepress/error',
    },
  ]),
};
