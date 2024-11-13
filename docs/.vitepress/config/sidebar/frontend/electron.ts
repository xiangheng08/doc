import { define } from '../../../utils';
import { DefaultTheme } from 'vitepress';

export default {
  '/frontend/electron/': define<DefaultTheme.SidebarItem[]>([
    { link: '/frontend/electron/docsNav' },
    { link: '/frontend/electron/qa' },
  ]),
};
