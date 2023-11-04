import { define } from '../../utils'
import { DefaultTheme } from 'vitepress'

export default define<DefaultTheme.SidebarItem[]>([
  {
    text: '后端', items: [
      {
        text: 'MySql',
        items: [
          {
            text: '错误',
            link: '/backend/mysql/error'
          }
        ]
      }
  ] }
]);
