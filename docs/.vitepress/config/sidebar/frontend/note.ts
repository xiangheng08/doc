import { define } from '../../../utils';
import { DefaultTheme } from 'vitepress';

export default {
  '/frontend/note/': define<DefaultTheme.SidebarItem[]>([
    {
      text: '触发迅雷下载',
      link: '/frontend/note/trigger-thunder-download',
    },
    {
      text: '利用延迟实现复杂动画',
      link: '/frontend/note/delayed-animation',
    },
    {
      text: '码元和码点',
      link: '/frontend/note/code-point-and-code-unit',
    },
  ]),
};
