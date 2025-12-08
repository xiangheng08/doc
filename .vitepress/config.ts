import { BASE_URL, COPYRIGHT } from './env'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitepress'
import type { DefaultTheme, MarkdownOptions } from 'vitepress'
import nav from './nav'

import { withBase } from './utils/url'

import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from 'vitepress-plugin-group-icons'

import sidebarPlugin from './plugins/sidebar-plugin2'
import codeDemoPlugin from './md-plugins/code-demo'
import demoDynamicImport from './plugins/demo-dynamic-import'
import processPublicHtml from './plugins/process-public-html-plugin'
import { processPublicHtmlBuildEndHook } from './plugins/process-public-html-plugin'

// https://vitepress.dev/reference/default-theme-config
const themeConfig: DefaultTheme.Config = {
  logo: '/logo.svg',

  nav,

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

  outline: {
    label: '页面导航',
    level: [2, 4], // 层级
  },

  notFound: {
    title: '找不到页面( T﹏T )',
    quote: '请检查您输入的网址是否正确。',
    linkText: '返回首页',
  },

  docFooter: { prev: '上一页', next: '下一页' },

  footer: {
    copyright: COPYRIGHT,
  },

  lastUpdated: {
    text: '最后更新于',
    formatOptions: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
  },

  langMenuLabel: '多语言',
  returnToTopLabel: '回到顶部',
  sidebarMenuLabel: '菜单',
  darkModeSwitchLabel: '主题',
  lightModeSwitchTitle: '切换到浅色模式',
  darkModeSwitchTitle: '切换到深色模式',
  skipToContentLabel: '跳转到内容',
}

const markdown: MarkdownOptions = {
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
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My doc',
  description: '我的文档',
  lang: 'zh-CN',
  srcDir: 'src',
  base: BASE_URL,
  head: [['link', { rel: 'icon', href: withBase('/logo.svg') }]],
  themeConfig,
  markdown,
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

    build: {
      chunkSizeWarningLimit: 2048, // 分块大小警告阈值
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
