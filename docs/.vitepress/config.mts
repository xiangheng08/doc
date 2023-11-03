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
				text: '其他',
				items: [{ text: '小技巧', link: '/other/tips/' }],
			},
		],

		sidebar,

		outline: {
			label: '本页目录',
			level: [2, 4], // 层级
		},

		// socialLinks: [
		//   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
		// ]

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
			copyright:
				'Copyright © 2022-present <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">湘ICP备2023023348号</a>',
		},

		lastUpdated: {
			text: '上次更新',
		},
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
