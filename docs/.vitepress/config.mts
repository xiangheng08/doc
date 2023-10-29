import { defineConfig } from 'vitepress';
import sidebar from './config/sidebar'
import path from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'My Doc',
  description: 'My Doc',
  lang: 'zh-CN',

  head: [
    ['link', { rel: 'icon', href: '/vitepress-logo-mini.svg' }]
  ],
  themeConfig: {
    logo: '/vitepress-logo-mini.svg',
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: '主页', link: '/' },
			{ text: '前端', link: '/frontend/' },
			{ text: 'Git', link: '/git/commandList' },
		],
    
    sidebar,

    outline: {
      label: '本页目录',
      level: 'deep', // 层级
    }

		// socialLinks: [
		//   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  },
  markdown: {
    theme: {
      dark: 'dark-plus',
      light: 'light-plus',
    },
    lineNumbers: true, // 启用行号
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
        '@theme': path.resolve(__dirname, './theme'),
      }
    }
  }
});
