import { isProd, noSearch } from './env'
import { fileURLToPath, URL } from 'node:url'

import sidebar from './sidebar'
import sidebarPlugin from './plugins/sidebar-plugin'
import { withBase } from './utils/url'
import { defineConfig } from 'vitepress'
import processPublicHtml, {
  processPublicHtmlBuildEndHook,
} from './plugins/process-public-html-plugin'
import codeDemoPlugin from './md-plugins/code-demo'
import demoDynamicImport from './plugins/demo-dynamic-import'
import type { DefaultTheme } from 'vitepress'
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from 'vitepress-plugin-group-icons'

const nav: DefaultTheme.NavItem[] = [
  {
    text: '前端',
    items: [
      {
        text: '核心技术',
        items: [
          { text: 'HTML', link: '/html/intro' },
          { text: 'CSS', link: '/css/' },
          { text: 'JavaScript', link: '/js/' },
          { text: 'HTTP', link: '/http/' },
          { text: 'WebAPI', link: '/web-api/' },
          { text: 'TypeScript', link: '/ts/intro' },
        ],
      },
      {
        text: '框架',
        items: [
          { text: 'Vue', link: '/vue/' },
          { text: 'React', link: '/react/raw' },
          { text: 'Element UI', link: '/element-ui/' },
          { text: 'Element Plus', link: '/element-plus/issues' },
          { text: 'VitePress', link: '/vitepress/error' },
        ],
      },
      {
        text: '构建工具',
        items: [
          { text: 'Vite', link: '/vite/' },
          { text: 'Webpack', link: '/webpack/' },
          { text: 'Rollup', link: '/rollup/' },
        ],
      },
      {
        text: '实用工具和库',
        items: [
          { text: 'Axios', link: '/axios/' },
          { text: 'ECharts', link: '/echarts/' },
          { text: 'Eslint', link: '/eslint/issues' },
        ],
      },
      {
        text: '其他',
        items: [
          { text: '布局', link: '/layout/waterfall' },
          { text: '浏览器', link: '/browser/reflow-repaint' },
        ],
      },
    ],
  },
  {
    text: '后端',
    items: [
      {
        text: '服务端技术',
        items: [
          { text: 'NodeJS', link: '/nodejs/' },
          { text: 'Express', link: '/express/' },
          { text: 'Koa', link: '/koa/' },
        ],
      },
      {
        text: '数据库',
        items: [{ text: 'MySql', link: '/mysql/error' }],
      },
      {
        text: '网络和协议',
        items: [
          { text: 'Nginx', link: '/nginx/reverse-proxy' },
          { text: 'HTTP', link: '/http/' },
        ],
      },
    ],
  },
  {
    text: '应用',
    items: [
      {
        text: '桌面应用',
        items: [{ text: 'Electron', link: '/electron/docs-nav' }],
      },
      {
        text: 'APP',
        items: [
          { text: 'React Native', link: '/react-native/link' },
          { text: 'uni-app', link: '/uniapp/' },
        ],
      },
      {
        text: '小程序',
        items: [
          { text: '微信小程序', link: '/wx-mp/' },
          { text: 'uni-app', link: '/uniapp/' },
        ],
      },
    ],
  },
  {
    text: '工具/环境',
    items: [
      {
        text: '版本控制/DevOps',
        items: [
          { text: 'Git', link: '/git/command-list' },
          { text: 'Gitea', link: '/gitea/index' },
        ],
      },
      {
        text: '开发环境',
        items: [
          { text: 'Docker', link: '/docker/' },
          { text: 'NVM', link: '/nvm/index' },
          { text: '包管理工具', link: '/manager/collected-packages' },
        ],
      },
      {
        text: '编辑器/工具',
        items: [
          { text: 'VSCode', link: '/vscode/tips' },
          { text: 'Chrome', link: '/chrome/' },
        ],
      },
      {
        text: '操作系统',
        items: [
          { text: 'Windows', link: '/windows/tips' },
        ],
      },
      {
        text: '多媒体处理',
        items: [{ text: 'FFmpeg', link: '/ffmpeg/merge-audio-video' }],
      },
    ],
  },
  {
    text: '其他',
    items: [
      { text: '算法', link: '/algorithm/' },
      { text: '面试题', link: '/interview/question/unorganize/1' },
      { text: '常用单词', link: '/common-words' },
      { text: 'Emoji', link: '/emoji' },
      { text: '语义化版本规范', link: '/sem-ver' },
      { text: '笔记', link: '/note/code-point-and-code-unit' },
      { text: 'Links', link: '/links' },
      { text: '关于本站', link: '/about' },
    ],
  },
]

const searchConfig: Pick<DefaultTheme.Config, 'search'> = {}

if (isProd && !noSearch) {
  searchConfig.search = {
    provider: 'local', // 本地搜索
    options: {
      translations: {
        button: {
          buttonText: '搜索文档',
          buttonAriaLabel: '搜索文档',
        },
        modal: {
          noResultsText: '无法找到相关结果',
          resetButtonTitle: '清除查询条件',
          displayDetails: '显示详细列表',
          backButtonTitle: '清除查询条件',
          footer: {
            selectText: '选择',
            navigateText: '切换',
            closeText: '关闭',
          },
        },
      },
    },
  }
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My doc',
  description: '我的文档',
  lang: 'zh-CN',

  srcDir: 'src',

  base: process.env.BASE_URL,

  head: [['link', { rel: 'icon', href: withBase('/logo.svg') }]],

  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: '/logo.svg',

    nav,

    sidebar,

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/xiangheng08',
        ariaLabel: 'GitHub',
      },
      {
        icon: 'gitee',
        link: 'https://gitee.com/xiangheng08',
        ariaLabel: 'Gitee',
      },
    ],

    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '暗黑模式',

    outline: {
      label: '本页目录',
      level: [2, 4], // 层级
    },

    notFound: {
      title: '找不到页面( T﹏T )',
      quote: '请检查您输入的网址是否正确。',
      linkText: '返回首页',
    },

    docFooter: { prev: '上一篇', next: '下一篇' },

    footer: {
      // message: 'my doc',
      copyright: process.env.COPYRIGHT,
    },

    lastUpdated: {
      text: '上次更新',
      formatOptions: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      },
    },

    darkModeSwitchTitle: '切换到深色模式',
    lightModeSwitchTitle: '切换到浅色模式',

    ...searchConfig,
  },

  markdown: {
    config(md) {
      md.use(codeDemoPlugin)
      md.use(groupIconMdPlugin)
    },
    theme: { light: 'github-light', dark: 'github-dark' },
    lineNumbers: false, // 启用行号
    math: true, // 启用数学公式
    image: {
      lazyLoading: true, // 启用图片懒加载
    },
  },

  cleanUrls: true, // 去除url中的.html
  metaChunk: true, // 提取页面元数据到单独的 js 中

  vite: {
    server: {
      port: 9527,
    },

    resolve: {
      alias: {
        '@theme': fileURLToPath(new URL('./theme', import.meta.url)),
      },
    },

    plugins: [
      sidebarPlugin(),
      processPublicHtml(),
      demoDynamicImport(),
      groupIconVitePlugin(),
    ],

    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },

  async buildEnd(siteConfig) {
    await processPublicHtmlBuildEndHook(siteConfig)
  },
})
