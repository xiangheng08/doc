import type { DefaultTheme } from 'vitepress'

export default [
  {
    text: '前端',
    items: [
      {
        text: '核心技术',
        items: [
          { text: 'HTML', link: '/html/intro' },
          { text: 'CSS', link: '/css/' },
          { text: 'JavaScript', link: '/js/' },
          { text: 'TypeScript', link: '/ts/intro' },
          { text: 'WebAPI', link: '/web-api/' },
          { text: 'HTTP', link: '/http/' },
          { text: 'Web Assembly', link: '/web-assembly/' },
          { text: 'Web Component', link: '/web-component/' },
        ],
      },
      {
        text: '框架',
        items: [
          { text: 'Vue', link: '/vue/' },
          { text: 'React', link: '/react/' },
          { text: 'UI 框架', link: '/ui/element-plus/' },
          { text: 'VitePress', link: '/vitepress/' },
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
        text: '工程化',
        items: [{ text: '前端工程化', link: '/front-end-engineering/' }],
      },
      {
        text: '实用工具和库',
        items: [
          { text: 'Axios', link: '/axios/' },
          { text: 'ECharts', link: '/echarts/' },
          { text: 'Eslint', link: '/eslint/issues' },
          { text: 'Day.js', link: '/dayjs/' },
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
          { text: 'Github', link: '/github/' },
          { text: 'Gitea', link: '/gitea/' },
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
        items: [{ text: 'Windows', link: '/windows/tips' }],
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
      { text: 'VitePress', link: '/vitepress/' },
      { text: 'PotPlayer', link: '/potplayer/' },
      { text: 'Links', link: '/links' },
      { text: '关于本站', link: '/about' },
    ],
  },
  {
    text: 'Utils',
    link: "/utils/"
  }
] satisfies DefaultTheme.NavItem[]
