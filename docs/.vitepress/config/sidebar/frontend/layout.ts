import { define } from '../../../utils';
import { DefaultTheme } from 'vitepress';

export default {
  '/frontend/layout/': define<DefaultTheme.SidebarItem[]>([
    {
      text: '瀑布流布局',
      link: '/frontend/layout/waterfall',
    },
  ]),
};
