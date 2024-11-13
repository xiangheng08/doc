import { ENV } from './utils/env';
import path from 'path';
import { defineConfig, UserConfig, DefaultTheme } from 'vitepress';
import sidebar from './config/sidebar';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import copyright from './config/copyright';
import { _withBase, getDirPaths } from './utils';
import { gitee_icon } from './theme/icons';
import sidebarPlugin from './plugins/sidebar';

// 附加配置
const append: UserConfig<DefaultTheme.Config> = {};
// 例子路径
const examplePath = path.join(__dirname, './examples');

if (ENV.base) {
  append.base = ENV.base;
}
if (ENV.outDir) {
  append.outDir = ENV.outDir;
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...append,
  title: 'My Doc',
  description: 'My Doc',
  lang: 'zh-CN',

  head: [['link', { rel: 'icon', href: _withBase('/vitepress-logo-mini.svg') }]],

  themeConfig: {
    logo: '/vitepress-logo-mini.svg',
    // https://vitepress.dev/reference/default-theme-config

    nav: [
      { text: '主页', link: '/' },
      {
        text: '前端',
        items: [
          { text: 'HTML', link: '/frontend/html/' },
          { text: 'CSS', link: '/frontend/css/' },
          { text: 'JavaScript', link: '/frontend/js/' },
          { text: '布局', link: '/frontend/layout/waterfall' },
          { text: 'Node.JS', link: '/frontend/nodejs/' },
          { text: '包管理工具', link: '/frontend/manager/command-list' },
          { text: 'Vue', link: '/frontend/vue/basic/install' },
          { text: 'React', link: '/frontend/react/raw' },
          { text: 'React Native', link: '/frontend/react-native/cc/slider' },
          { text: 'TypeScript', link: '/frontend/ts/intro' },
          { text: 'vitepress', link: '/frontend/vitepress/effect/smooth-scroll' },
          { text: 'Electron', link: '/frontend/electron/docsNav' },
          { text: '笔记', link: '/frontend/note/trigger-thunder-download' },
        ],
      },
      { text: '后端', link: '/backend/' },
      { text: 'Git', link: '/git/commandList' },
      { text: '面试题', link: '/question/' },
      { text: '其他', link: '/other/' },
    ],

    sidebar: sidebar,

    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '暗黑模式',

    outline: {
      label: '本页目录',
      level: [2, 4], // 层级
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/laowans' },
      { icon: { svg: gitee_icon }, link: 'https://gitee.com/laowans' },
    ],

    search: {
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
    },

    notFound: {
      title: '找不到页面( T﹏T )',
      quote: '请检查您输入的网址是否正确。',
      linkText: '返回首页',
    },

    docFooter: { prev: '上一篇', next: '下一篇' },

    footer: {
      // message: 'my doc',
      copyright: copyright,
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
  },
  markdown: {
    theme: {
      dark: 'dark-plus',
      light: 'light-plus',
    },
    lineNumbers: false, // 启用行号
    math: true, // 启用数学公式
    image: {
      lazyLoading: true, // 启用图片懒加载
    },
  },
  cleanUrls: true, // 去除url中的.html
  metaChunk: true, // 将公共的js提取出来
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
        '@theme': path.resolve(__dirname, './theme'),
        '@hooks': path.resolve(__dirname, './utils/hooks'),
      },
    },
    server: {
      port: 9527,
    },

    plugins: [
      AutoImport({
        imports: ['vue'],
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: '.vitepress/auto-imports.d.ts',
        resolvers: [
          TDesignResolver({
            library: 'vue-next',
          }),
        ],
      }),
      Components({
        dirs: ['.vitepress/theme/components', ...getDirPaths(examplePath)],
        dts: '.vitepress/components.d.ts',
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          TDesignResolver({
            library: 'vue-next',
          }),
        ],
      }),
      sidebarPlugin(),
    ],

    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
});
