import { define } from '../../../utils';
import { DefaultTheme } from 'vitepress';

export default {
  '/frontend/css/': define<DefaultTheme.SidebarItem[]>([
    {
      text: '起步',
      link: '/frontend/css/index',
    },
    {
      text: '选择器',
      link: '/frontend/css/selector',
    },
    {
      text: '盒子模型',
      link: '/frontend/css/box-model',
    },
    {
      text: '样式',
      collapsed: true,
      items: [
        {
          text: '背景样式',
          link: '/frontend/css/style/background',
        },
        {
          text: '文本样式',
          link: '/frontend/css/style/text',
        },
        {
          text: '字体样式',
          link: '/frontend/css/style/font',
        },
        {
          text: '链接样式',
          link: '/frontend/css/style/link',
        },
        {
          text: '列表样式',
          link: '/frontend/css/style/list',
        },
        {
          text: '表格样式',
          link: '/frontend/css/style/table',
        },
        {
          text: '轮廓样式',
          link: '/frontend/css/style/outline',
        },
        {
          text: '显示特征',
          link: '/frontend/css/style/display',
        },
        {
          text: '边框样式',
          link: '/frontend/css/style/border',
        },
        {
          text: '鼠标样式',
          link: '/frontend/css/style/cursor',
        },
        {
          text: '浮动',
          link: '/frontend/css/style/float',
        },
        {
          text: '定位',
          link: '/frontend/css/style/position',
        },
        {
          text: '溢出处理与滚动样式',
          link: '/frontend/css/style/overflow-scroll',
        },
        {
          text: 'transform 变换',
          link: '/frontend/css/style/transform',
        },
        {
          text: 'transition 过渡',
          link: '/frontend/css/style/transition',
        },
        {
          text: 'animation 动画',
          link: '/frontend/css/style/animation',
        },
      ],
    },
    {
      text: '属性',
      collapsed: true,
      items: [{ link: '/frontend/css/properties/clip-path' }],
    },
    {
      text: '布局',
      collapsed: true,
      items: [
        {
          text: '浮动布局',
          link: '/frontend/css/layout/float',
        },
        {
          text: '响应式布局',
          link: '/frontend/css/layout/responsive',
        },
        {
          text: '弹性布局',
          link: '/frontend/css/layout/flex',
        },
        {
          text: '网格布局',
          link: '/frontend/css/layout/grid',
        },
        {
          text: '表格布局',
          link: '/frontend/css/layout/table',
        },
        {
          text: '多列布局',
          link: '/frontend/css/layout/multiple-column',
        },
      ],
    },
    {
      text: '媒体查询',
      link: '/frontend/css/media-query',
    },
    {
      text: '效果',
      link: '/frontend/css/effect',
    },
    {
      text: '其他',
      collapsed: true,
      items: [
        {
          text: '值与单位',
          link: '/frontend/css/values-and-units',
        },
        {
          text: '数据类型',
          collapsed: true,
          items: [
            {
              text: '&lt;blend-mode&gt;',
              link: '/frontend/css/types/blend-mode',
            },
          ],
        },
      ],
    },
  ]),
};
