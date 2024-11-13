import { define } from '../../../utils';
import { DefaultTheme } from 'vitepress';

export default {
  '/frontend/manager/': define<DefaultTheme.SidebarItem[]>([
    {
      text: '命令大全',
      link: '/frontend/manager/command-list',
    },
    {
      text: '收集的包',
      link: '/frontend/manager/collected-packages',
    },
  ]),
};
