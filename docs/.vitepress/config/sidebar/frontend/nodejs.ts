import { define } from '../../../utils';
import { DefaultTheme } from 'vitepress';

export default {
  '/frontend/nodejs/': define<DefaultTheme.SidebarItem[]>([
    {
      link: '/frontend/nodejs/index',
    },
    {
      text: '实用方法',
      link: '/frontend/nodejs/func',
    },
    {
      text: '子进程',
      collapsed: true,
      items: [{ link: '/frontend/nodejs/child_process/scenarios' }],
    },
    {
      text: '项目开发',
      collapsed: true,
      items: [
        {
          text: '环境变量',
          link: '/frontend/nodejs/project/env',
        },
      ],
    },
  ]),
};
