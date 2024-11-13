import { define } from '../../../utils';
import { DefaultTheme } from 'vitepress';

export default {
  '/frontend/react/': define<DefaultTheme.SidebarItem[]>([
    {
      text: '未整理',
      link: '/frontend/react/raw',
    },
  ]),
};
