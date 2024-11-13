import { define } from '../../../utils';
import { DefaultTheme } from 'vitepress';

export default {
  '/frontend/js/': define<DefaultTheme.SidebarItem[]>([
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
    // {
    //   text: '语法',
    //   link: '/frontend/js/syntax',
    // },
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
        {
          text: 'Symbol',
          link: '/frontend/js/types/symbol',
        },
        {
          text: 'BigInt',
          link: '/frontend/js/types/bigint',
        },
        {
          text: '数据类型的转换',
          link: '/frontend/js/types/conversion',
        },
      ],
    },
    {
      text: '运算符',
      collapsed: true,
      items: [
        {
          text: '算术运算符',
          link: '/frontend/js/operators/arithmetic',
        },
        {
          text: '比较运算符',
          link: '/frontend/js/operators/comparison',
        },
        {
          text: '布尔运算符',
          link: '/frontend/js/operators/boolean',
        },
        {
          text: '二进制位运算符',
          link: '/frontend/js/operators/bit',
        },
        {
          text: '其他运算符，运算顺序',
          link: '/frontend/js/operators/priority',
        },
      ],
    },
    {
      link: '/frontend/js/error',
    },
    {
      link: '/frontend/js/console',
    },
    {
      text: '标准库',
      collapsed: true,
      items: [
        { link: '/frontend/js/stdlib/object' },
        { link: '/frontend/js/stdlib/attributes' },
        { link: '/frontend/js/stdlib/array' },
        { link: '/frontend/js/stdlib/wrapper' },
        { link: '/frontend/js/stdlib/number' },
        { link: '/frontend/js/stdlib/string' },
        { link: '/frontend/js/stdlib/date' },
        { link: '/frontend/js/stdlib/math' },
        { link: '/frontend/js/stdlib/regexp' },
        { link: '/frontend/js/stdlib/json' },
      ],
    },
    {
      text: '面向对象编程',
      collapsed: true,
      items: [
        { link: '/frontend/js/oop/new' },
        { link: '/frontend/js/oop/this' },
        { link: '/frontend/js/oop/prototype' },
        { link: '/frontend/js/oop/object' },
        { link: '/frontend/js/oop/strict' },
      ],
    },
    {
      text: '异步操作',
      collapsed: true,
      items: [
        { link: '/frontend/js/async/general' },
        { link: '/frontend/js/async/timer' },
        { link: '/frontend/js/async/promise' },
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
        { link: '/frontend/js/dom/general' },
        { link: '/frontend/js/dom/node' },
        { link: '/frontend/js/dom/nodelist' },
        { link: '/frontend/js/dom/parentnode' },
        { link: '/frontend/js/dom/document' },
        { link: '/frontend/js/dom/element' },
        { link: '/frontend/js/dom/attributes' },
        { link: '/frontend/js/dom/text' },
        { link: '/frontend/js/dom/css' },
        { link: '/frontend/js/dom/mutationobserver' },
      ],
    },
    {
      text: '事件',
      collapsed: true,
      items: [
        { link: '/frontend/js/events/eventtarget' },
        { link: '/frontend/js/events/model' },
        { link: '/frontend/js/events/event' },
        { link: '/frontend/js/events/mouse' },
        { link: '/frontend/js/events/keyboard' },
        { link: '/frontend/js/events/progress' },
        { link: '/frontend/js/events/form' },
        { link: '/frontend/js/events/touch' },
        { link: '/frontend/js/events/drag' },
        { link: '/frontend/js/events/common' },
        { link: '/frontend/js/events/globaleventhandlers' },
      ],
    },
    {
      text: '浏览器模型',
      collapsed: true,
      items: [
        { link: '/frontend/js/bom/engine' },
        { link: '/frontend/js/bom/window' },
        { link: '/frontend/js/bom/navigator' },
        { link: '/frontend/js/bom/cookie' },
        { link: '/frontend/js/bom/xmlhttprequest' },
        { link: '/frontend/js/bom/same-origin' },
        { link: '/frontend/js/bom/cors' },
        { link: '/frontend/js/bom/storage' },
        { link: '/frontend/js/bom/history' },
        { link: '/frontend/js/bom/location' },
        { link: '/frontend/js/bom/arraybuffer' },
        { link: '/frontend/js/bom/file' },
        { link: '/frontend/js/bom/form' },
        { link: '/frontend/js/bom/indexeddb' },
        { link: '/frontend/js/bom/webworker' },
        { link: '/frontend/js/bom/fetch' },
      ],
    },
    {
      text: '网页元素接口',
      collapsed: true,
      items: [
        { link: '/frontend/js/elements/a' },
        { link: '/frontend/js/elements/img' },
        { link: '/frontend/js/elements/form' },
        { link: '/frontend/js/elements/input' },
        { link: '/frontend/js/elements/button' },
        { link: '/frontend/js/elements/option' },
        { link: '/frontend/js/elements/video' },
      ],
    },
    {
      text: '常用函数',
      link: '/frontend/js/func-list',
    },
    { link: '/frontend/js/tips' },
    { link: '/frontend/js/regexp' },
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
        {
          link: '/frontend/js/other/style',
        },
      ],
    },
  ]),
};
