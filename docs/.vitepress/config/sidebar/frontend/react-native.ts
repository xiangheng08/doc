import { define } from '../../../utils';
import { DefaultTheme } from 'vitepress';

export default {
  '/frontend/react-native/': define<DefaultTheme.SidebarItem[]>([
    {
      text: '自定义组件',
      collapsed: true,
      items: [{ link: '/frontend/react-native/cc/slider' }],
    },
    { link: '/frontend/react-native/link' },
  ]),
};