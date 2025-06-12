import { DefaultTheme } from 'vitepress'

export default [
  {
    text: '起步',
    link: '/js/index',
  },
  {
    text: '基本语法',
    link: '/js/basic-syntax',
  },
  {
    text: '新语法',
    link: '/js/new-syntax',
  },
  { link: '/js/functions' },
  { link: '/js/tips' },
  { link: '/js/regex' },
  { link: '/js/runtime' },
  {
    text: 'JS 高阶语法',
    items: [
      {
        text: 'Promise',
        link: '/js/advanced/syntax/promise',
      },
    ],
  },
  {
    text: 'JS 高阶函数',
    items: [
      {
        text: '并发执行任务',
        link: '/js/advanced/function/parallel-task',
      },
      {
        text: '惰性函数',
        link: '/js/advanced/function/lazy',
      },
      {
        text: '任务队列',
        link: '/js/advanced/function/task-queue',
      },
      { link: '/js/advanced/function/parallel-task-queue' }
    ],
  },
  // {
  //   text: '语法',
  //   link: '/js/syntax',
  // },
  {
    text: '数据类型',
    items: [
      {
        text: '概述',
        link: '/js/types/general',
      },
      {
        text: 'null 和 undefined',
        link: '/js/types/null-undefined',
      },
      {
        text: '布尔值',
        link: '/js/types/boolean',
      },
      {
        text: '数值',
        link: '/js/types/number',
      },
      {
        text: '字符串',
        link: '/js/types/string',
      },
      {
        text: '对象',
        link: '/js/types/object',
      },
      {
        text: '函数',
        link: '/js/types/function',
      },
      {
        text: '数组',
        link: '/js/types/array',
      },
      {
        text: 'Symbol',
        link: '/js/types/symbol',
      },
      {
        text: 'BigInt',
        link: '/js/types/bigint',
      },
      {
        text: '数据类型的转换',
        link: '/js/types/conversion',
      },
    ],
  },
  {
    text: '运算符',
    items: [
      {
        text: '算术运算符',
        link: '/js/operators/arithmetic',
      },
      {
        text: '比较运算符',
        link: '/js/operators/comparison',
      },
      {
        text: '布尔运算符',
        link: '/js/operators/boolean',
      },
      {
        text: '二进制位运算符',
        link: '/js/operators/bit',
      },
      {
        text: '其他运算符，运算顺序',
        link: '/js/operators/priority',
      },
    ],
  },
  {
    link: '/js/error',
  },
  {
    link: '/js/console',
  },
  {
    text: '标准库',
    items: [
      { link: '/js/stdlib/object' },
      { link: '/js/stdlib/attributes' },
      { link: '/js/stdlib/array' },
      { link: '/js/stdlib/wrapper' },
      { link: '/js/stdlib/number' },
      { link: '/js/stdlib/string' },
      { link: '/js/stdlib/date' },
      { link: '/js/stdlib/math' },
      { link: '/js/stdlib/regexp' },
      { link: '/js/stdlib/json' },
    ],
  },
  {
    text: '面向对象编程',
    items: [
      { link: '/js/oop/new' },
      { link: '/js/oop/this' },
      { link: '/js/oop/prototype' },
      { link: '/js/oop/object' },
      { link: '/js/oop/strict' },
    ],
  },
  {
    text: '异步操作',
    items: [
      { link: '/js/async/general' },
      { link: '/js/async/timer' },
      { link: '/js/async/promise' },
    ],
  },
  {
    text: 'DOM',
    items: [
      {
        text: '概述',
        link: '/js/dom/index',
      },
      {
        text: '选择元素',
        link: '/js/dom/select',
      },
      { link: '/js/dom/general' },
      { link: '/js/dom/node' },
      { link: '/js/dom/nodelist' },
      { link: '/js/dom/parentnode' },
      { link: '/js/dom/document' },
      { link: '/js/dom/element' },
      { link: '/js/dom/attributes' },
      { link: '/js/dom/text' },
      { link: '/js/dom/css' },
      { link: '/js/dom/mutationobserver' },
    ],
  },
  {
    text: '事件',
    items: [
      { link: '/js/events/eventtarget' },
      { link: '/js/events/model' },
      { link: '/js/events/event' },
      { link: '/js/events/mouse' },
      { link: '/js/events/keyboard' },
      { link: '/js/events/progress' },
      { link: '/js/events/form' },
      { link: '/js/events/touch' },
      { link: '/js/events/drag' },
      { link: '/js/events/common' },
      { link: '/js/events/globaleventhandlers' },
    ],
  },
  {
    text: '浏览器模型',
    items: [
      { link: '/js/bom/engine' },
      { link: '/js/bom/window' },
      { link: '/js/bom/navigator' },
      { link: '/js/bom/cookie' },
      { link: '/js/bom/xmlhttprequest' },
      { link: '/js/bom/same-origin' },
      { link: '/js/bom/cors' },
      { link: '/js/bom/storage' },
      { link: '/js/bom/history' },
      { link: '/js/bom/location' },
      { link: '/js/bom/arraybuffer' },
      { link: '/js/bom/file' },
      { link: '/js/bom/form' },
      { link: '/js/bom/indexeddb' },
      { link: '/js/bom/webworker' },
      { link: '/js/bom/fetch' },
    ],
  },
  {
    text: '网页元素接口',
    items: [
      { link: '/js/elements/a' },
      { link: '/js/elements/img' },
      { link: '/js/elements/form' },
      { link: '/js/elements/input' },
      { link: '/js/elements/button' },
      { link: '/js/elements/option' },
      { link: '/js/elements/video' },
    ],
  },
  {
    text: 'WebAPI',
    link: '/web-api/'
  },
  { link: '/js/ecma-version-changelog' },
  {
    text: '其他',
    items: [
      {
        text: '输出',
        link: '/js/output',
      },
      {
        text: '关键字、保留字、其他不建议使用的标识符',
        link: '/js/other/identifier-list',
      },
      {
        link: '/js/other/style',
      },
    ],
  },
] satisfies DefaultTheme.Sidebar
