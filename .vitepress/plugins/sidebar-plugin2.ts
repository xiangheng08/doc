import { existsSync, statSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type {
  DefaultTheme,
  SiteConfig,
  Plugin,
  UserConfig,
} from 'vitepress'
import { debounce } from '../utils/common'
import { buildSidebar } from '.vitepress/build/sidebar'

class SidebarManager {
  /** 匹配文章标题的正则 */
  static readonly ARTICLE_TITLE_REGEX = /^#\s+(.+)/m

  /** 匹配外部链接的正则 */
  static readonly EXTERNAL_LINK_REGEX = /^https?:\/\//

  /** 匹配需要转义的字符的正则 */
  static readonly ESCAPE_REGEX = /[&<>"'/]/g

  /** 需要转义的字符映射 */
  static readonly ESCAPE_MAP: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }

  /** 文章元数据地图 */
  readonly articleMetaMap = new Map<string, ArticleMeta>()

  /** 文章根目录 */
  declare srcDir: string

  /** vitepress 配置项 */
  declare config: VitePressUserConfig

  isBuildMode = false

  /**
   * 处理 Sidebar
   */
  handleSidebar() {
    const sidebar = this.config.vitepress.site.themeConfig.sidebar
    if (!sidebar) return

    const dfs = (items: DefaultTheme.SidebarItem[]) => {
      for (const item of items) {
        this.handleSidebarItem(item)
        if (item.items) dfs(item.items)
      }
    }

    if (this.isMultiSidebar(sidebar)) {
      for (const key in sidebar) {
        if (Array.isArray(sidebar[key])) {
          dfs(sidebar[key])
        } else {
          dfs(sidebar[key].items)
        }
      }
    } else {
      dfs(sidebar)
    }
  }

  /**
   * 处理单个 SidebarItem
   */
  handleSidebarItem(item: DefaultTheme.SidebarItem) {
    // 有 link 但没有 text
    if (item.link && !item.text) {
      if (this.isExternalLink(item.link)) return

      const file = this.resolveLink(item.link)
      if (!file) return

      const meta = this.getArticleMeta(file, item)
      this.articleMetaMap.set(file, meta)
      item.text = meta.title
    } else if (item.text) {
      item.text = this.escapeArticleTitle(item.text)
    }
  }

  /**
   * 转义文章标题
   */
  escapeArticleTitle(title: string): string {


    if (!this.isBuildMode) {
      // 因为 vitepress 在构建模式下会将 sidebar.text 已纯文本展示，所以不需要处理
      SidebarManager.ESCAPE_REGEX.lastIndex = 0
      title = title.replace(
        SidebarManager.ESCAPE_REGEX,
        (match) => SidebarManager.ESCAPE_MAP[match],
      )
    }

    // 转义单行代码
    let i = 0
    let start = -1
    while (i < title.length) {
      if (title[i] === '\\') {
        // 遇到转义符，去除转义符 title.length - 1
        // 下一次循环正好到要转义的字符后面一个字符
        title = title.slice(0, i) + title.slice(i + 1)
      } else if (title[i] === '`') {
        if (start === -1) {
          start = i
        } else {
          const oldLength = title.length
          const escaped = `<code>${title.slice(start + 1, i)}</code>`
          const beginning = title.slice(0, start)
          const ending = title.slice(i + 1)
          title = beginning + escaped + ending
          i += title.length - oldLength
          start = -1
        }
      }
      i++
    }

    return title
  }

  /**
   * 解析链接为绝对路径
   */
  resolveLink(link: string): string | undefined {
    if (!link) return

    let ext = '.md'
    if (link.endsWith('.md')) {
      ext = ''
      console.warn(`sidebar item link should not end with '.md'`)
    }

    let fullPath = join(this.srcDir, link + ext)

    if (!existsSync(fullPath)) {
      const dir = join(this.srcDir, link)
      if (existsSync(dir) && statSync(dir).isDirectory()) {
        // 如果 link 是目录，则将其指向目录下的 index.md
        fullPath = join(dir, 'index.md')
      } else {
        // 如果 link 指向的文件不存在，则忽略
        return
      }
    }

    return existsSync(fullPath) ? fullPath : void 0
  }

  /**
   * 是否为多级侧边栏
   */
  isMultiSidebar(sidebar: unknown): sidebar is DefaultTheme.SidebarMulti {
    return typeof sidebar === 'object' && !Array.isArray(sidebar)
  }

  /**
   * 获取文章元数据
   */
  getArticleMeta(
    file: string,
    sidebarItem: DefaultTheme.SidebarItem,
  ): ArticleMeta {
    const content = this.readArticle(file)
    const title = this.getArticleTitle(content)
    return { sidebarItem, file, title }
  }

  /**
   * 读取文章内容
   */
  readArticle(file: string) {
    return readFileSync(file, 'utf-8')
  }

  /**
   * 获取文章标题
   */
  getArticleTitle(content: string) {
    const match = content.match(SidebarManager.ARTICLE_TITLE_REGEX)
    return match ? this.escapeArticleTitle(match[1].trim()) : void 0
  }

  /**
   * 是否为外部链接
   */
  isExternalLink(link: string) {
    return SidebarManager.EXTERNAL_LINK_REGEX.test(link)
  }
}

interface SidebarPluginOptions {
  restartWait?: number
}

const sidebarDir = join(import.meta.dirname, '../sidebar')

function sidebarPlugin(options?: SidebarPluginOptions): Plugin {
  const { restartWait = 200 } = options || {}

  const manager = new SidebarManager()
  let rebuildSidebar = false

  return {
    name: 'vitepress-sidebar-plugin',
    config: async (config: UserConfig, env) => {
      manager.isBuildMode = env.command === 'build'
      manager.config = config as VitePressUserConfig
      manager.srcDir = manager.config.vitepress.srcDir

      const themeConfig = manager.config.vitepress.site.themeConfig

      if (rebuildSidebar || !themeConfig.sidebar) {
        const sidebar = await buildSidebar()
        themeConfig.sidebar = sidebar
        manager.articleMetaMap.clear()
      }

      manager.handleSidebar()
      return config
    },
    configureServer(server) {
      const restartServer = debounce(() => server.restart(), restartWait)

      server.watcher.add(sidebarDir)
      server.watcher.on('all', async (type, path) => {
        if (path.startsWith(sidebarDir)) {
          rebuildSidebar = true
          restartServer()
        } else if (
          path.endsWith('.md') &&
          manager.articleMetaMap.has(path)
        ) {
          if (type === 'add') {
            restartServer()
          } else if (type === 'change') {
            const content = manager.readArticle(path)
            const title = manager.getArticleTitle(content)
            const meta = manager.articleMetaMap.get(path)
            if (meta && meta.title !== title) {
              meta.title = title
              meta.sidebarItem.text = title
              restartServer()
            }
          } else if (type === 'unlink') {
            // 文件删除，移除文件元数据
            manager.articleMetaMap.delete(path)
          }
        }
      })
    },
  }
}

interface VitePressUserConfig extends UserConfig {
  vitepress: SiteConfig<DefaultTheme.Config>
}

interface ArticleMeta {
  /**
   * SidebarItem
   */
  sidebarItem: DefaultTheme.SidebarItem
  /**
   * MD 文件路径
   */
  file: string
  /**
   * 标题
   */
  title?: string
}

export default sidebarPlugin
