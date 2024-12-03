import './env'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My doc',
  description: 'A VitePress Site',

  srcDir: 'src',

  base: process.env.BASE_URL,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },

  markdown: {
    theme: 'github-dark'
  },

  vite: {
    server: {
      port: 9527
    },
    resolve: {
      alias: {
        '@theme': fileURLToPath(new URL('./theme', import.meta.url))
      }
    }
  }
})
