import { DefaultTheme } from 'vitepress'
import git from './git'

export default {
  '/git/': git,
} satisfies DefaultTheme.Sidebar
