import { define } from '../../utils';
import { DefaultTheme } from 'vitepress';

export default define<DefaultTheme.SidebarItem[]>([
  {
    text: 'HTML',
    collapsed: false,
    items: [
      {
        text: '起步',
        link: '/frontend/html/index',
      },
      {
        text: '标签',
        link: '/frontend/html/tag',
      },
    ],
  },
  {
    text: 'CSS',
    collapsed: false,
    items: [
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
    ],
  },
  {
    text: 'JavaScript',
    collapsed: false,
    items: [
      {
        text: '起步',
        link: '/frontend/js/index',
      },
      {
        text: '基本语法',
        link: '/frontend/js/basic-syntax',
      },
      {
        text: '新语法',
        link: '/frontend/js/new-syntax',
      },
      {
        text: '语法',
        link: '/frontend/js/syntax',
      },
      {
        text: '数据类型',
        collapsed: true,
        items: [
          {
            text: '概述',
            link: '/frontend/js/types/general',
          },
          {
            text: 'null 和 undefined',
            link: '/frontend/js/types/null-undefined',
          },
          {
            text: '布尔值',
            link: '/frontend/js/types/boolean',
          },
          {
            text: '数值',
            link: '/frontend/js/types/number',
          },
          {
            text: '字符串',
            link: '/frontend/js/types/string',
          },
          {
            text: '对象',
            link: '/frontend/js/types/object',
          },
          {
            text: '函数',
            link: '/frontend/js/types/function',
          },
          {
            text: '数组',
            link: '/frontend/js/types/array',
          },
        ],
      },
      {
        text: 'DOM',
        collapsed: true,
        items: [
          {
            text: '概述',
            link: '/frontend/js/dom/index',
          },
          {
            text: '选择元素',
            link: '/frontend/js/dom/select',
          },
        ],
      },
      {
        text: '对象',
        collapsed: true,
        items: [
          {
            text: 'Array',
            link: '/frontend/js/object/array',
          },
        ],
      },
      {
        text: '常用函数',
        link: '/frontend/js/func-list',
      },
      {
        text: 'JS 高阶语法',
        collapsed: true,
        items: [
          {
            text: 'Promise',
            link: '/frontend/js/advanced/syntax/promise',
          },
        ],
      },
      {
        text: 'JS 高阶函数',
        collapsed: true,
        items: [
          {
            text: '并发执行任务',
            link: '/frontend/js/advanced/function/parallel-task',
          },
          {
            text: '惰性函数',
            link: '/frontend/js/advanced/function/lazy',
          },
          {
            text: '任务队列',
            link: '/frontend/js/advanced/function/task-queue',
          },
        ],
      },
      {
        text: '其他',
        collapsed: true,
        items: [
          {
            text: '输出',
            link: '/frontend/js/output',
          },
          {
            text: '关键字、保留字、其他不建议使用的标识符',
            link: '/frontend/js/other/identifier-list',
          },
        ],
      }
    ],
  },
  {
    text: '布局',
    collapsed: false,
    items: [
      {
        text: '瀑布流布局',
        link: '/frontend/layout/waterfall',
      },
    ],
  },
  {
    text: 'Node.JS',
    collapsed: false,
    items: [
      {
        text: '实用方法',
        link: '/frontend/nodejs/func',
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
    ],
  },
  {
    text: '包管理工具',
    collapsed: false,
    items: [
      {
        text: '命令大全',
        link: '/frontend/manager/command-list',
      },
      {
        text: '收集的包',
        link: '/frontend/manager/collected-packages',
      },
    ],
  },
  {
    text: 'Vue',
    collapsed: false,
    items: [
      {
        text: 'Vue 基础',
        collapsed: true,
        items: [
          {
            text: '安装',
            link: '/frontend/vue/basic/install',
          },
          {
            text: 'Vue 开发者工具',
            link: '/frontend/vue/basic/devtools',
          },
          {
            text: 'Vue 实例',
            link: '/frontend/vue/basic/instance',
          },
          {
            text: '模板语法',
            link: '/frontend/vue/basic/syntax',
          },
          {
            text: '指令',
            link: '/frontend/vue/basic/directives',
          },
          {
            text: '计算属性和侦听器',
            link: '/frontend/vue/basic/computed-watch',
          },
          {
            text: 'class 与 style 绑定',
            link: '/frontend/vue/basic/class-style',
          },
          {
            text: '条件渲染',
            link: '/frontend/vue/basic/conditional',
          },
          {
            text: '列表渲染',
            link: '/frontend/vue/basic/list',
          },
          {
            text: '响应式原理',
            link: '/frontend/vue/basic/reactivity',
          },
          {
            text: '事件处理',
            link: '/frontend/vue/basic/events',
          },
          {
            text: '表单数据收集',
            link: '/frontend/vue/basic/forms',
          },
        ],
      },
      {
        text: 'Vue 核心',
        link: '/frontend/vue/core',
      },
    ],
  },
  {
    text: 'React',
    collapsed: false,
    items: [
      {
        text: '未整理',
        link: '/frontend/react/raw',
      },
    ],
  },
  {
    text: 'vite',
    collapsed: false,
  },
  {
    text: 'TypeScript',
    collapsed: false,
    items: [
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
    ],
  },
  {
    text: 'vitepress',
    collapsed: false,
    items: [
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
    ],
  },
  {
    text: '笔记',
    items: [
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
        link: '/frontend/note/code-point-and-code-unit'
      }
    ],
  }
]);
