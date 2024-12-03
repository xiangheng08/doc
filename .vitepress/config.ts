import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My doc',
  description: 'A VitePress Site',

  srcDir: 'src',

  head: [['link', { rel: 'icon', href: '/logo.svg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
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
