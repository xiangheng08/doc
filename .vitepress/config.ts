import { isProd } from './env'
import { fileURLToPath, URL } from 'node:url'

import { DefaultTheme, defineConfig } from 'vitepress'
import sidebar from './sidebar'
import { withBase } from './utils/url'
import sidebarPlugin from './plugins/sidebar-plugin'

const searchConfig: Pick<DefaultTheme.Config, 'search'> = {}

if (isProd) {
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
  description: 'My Doc',
  lang: 'zh-CN',

  srcDir: 'src',

  base: process.env.BASE_URL,

  head: [['link', { rel: 'icon', href: withBase('/logo.svg') }]],

  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

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
    theme: 'github-dark',
    lineNumbers: false, // 启用行号
    math: true, // 启用数学公式
    image: {
      lazyLoading: true, // 启用图片懒加载
    },
  },

  cleanUrls: true, // 去除url中的.html
  metaChunk: true, // 将公共的js提取出来

  vite: {
    base: process.env.BASE_URL,

    server: {
      port: 9527,
    },

    resolve: {
      alias: {
        '@theme': fileURLToPath(new URL('./theme', import.meta.url)),
      },
    },

    plugins: [sidebarPlugin()],

    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
})
