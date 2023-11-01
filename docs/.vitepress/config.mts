import { defineConfig } from 'vitepress';
import sidebar from './config/sidebar';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'My Doc',
	description: 'My Doc',
	lang: 'zh-CN',

	head: [['link', { rel: 'icon', href: '/vitepress-logo-mini.svg' }]],

	themeConfig: {
		logo: '/vitepress-logo-mini.svg',
		// https://vitepress.dev/reference/default-theme-config

		nav: [
			{ text: '主页', link: '/' },
			{ text: '前端', link: '/frontend/' },
			{ text: '后端', link: '/backend/' },
			{ text: 'Git', link: '/git/commandList' },
			{
				text: '其他', items: [
					{ text: '小技巧', link: '/other/tips/'}
			] },
		],

		sidebar,

		outline: {
			label: '本页目录',
			level: [2, 4], // 层级
		},

		// socialLinks: [
		//   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
		// ]

		notFound: {
			title: '找不到页面( T﹏T )',
			quote: '请检查您输入的网址是否正确。',
			linkText: '返回首页',
		},

		docFooter: { prev: '上一篇', next: '下一篇' },

		footer: {
			// message: 'my doc',
			copyright:
				'<a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">Copyright &copy; 2023-present 湘ICP备2023023348号</a>',
		},

		lastUpdated: {
			text: '上次更新',
		}
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
				dirs: ['.vitepress/theme/components'],
				dts: '.vitepress/components.d.ts',
				include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
				resolvers: [
					TDesignResolver({
						library: 'vue-next',
					}),
				],
			}),
		],
	},
});
