import { define } from '../../../utils';
import { DefaultTheme } from 'vitepress';

export default {
  '/frontend/ts/': define<DefaultTheme.SidebarItem[]>([
    { link: '/frontend/ts/intro' },
    {
      text: '工具类型',
      link: '/frontend/ts/tool-type',
    },
    {
      text: 'TS 小技巧',
      link: '/frontend/ts/tips',
    },
    {
      text: '类型标注模板',
      link: '/frontend/ts/type-annotation-template',
    },
    { link: '/frontend/ts/build-qa' },
  ]),
};
