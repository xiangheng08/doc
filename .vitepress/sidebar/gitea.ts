import { DefaultTheme } from 'vitepress'

export default [
  { link: '/gitea/index' },
  {
    text: '安装',
    items: [{ link: '/gitea/install/docker' }],
   },
  {
    text: 'act_runner',
    items: [
      { link: '/gitea/act_runner/index' },
      { link: '/gitea/act_runner/config_yaml' },
    ],
  },
  {
    text: 'Gitea Actions',
    items: [
      { link: '/gitea/actions/index' },
      {
        text: '示例',
        items: [
          { link: '/gitea/actions/examples/build_vue_pnpm' },
        ],
       },
    ],

  },
] satisfies DefaultTheme.Sidebar
