import './env'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitepress'
import sidebar from './sidebar'
import { withBase } from './utils/url'
import sidebarPlugin from './plugins/sidebar-plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My doc',
  description: 'A VitePress Site',

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
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },

  markdown: {
    theme: 'github-dark',
  },

  vite: {
    server: {
      port: 9527,
    },
    resolve: {
      alias: {
        '@theme': fileURLToPath(new URL('./theme', import.meta.url)),
      },
    },
    plugins: [sidebarPlugin()],
  },
})
