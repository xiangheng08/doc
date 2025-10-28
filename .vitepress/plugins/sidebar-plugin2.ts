import { existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import type {
  DefaultTheme,
  SiteConfig,
  Plugin,
  UserConfig,
} from 'vitepress'

class SidebarManager {
  /**
   * 匹配需要转义的字符的正则
   */
  static readonly ESCAPE_REGEX = /[&<>"'/]/g

  /**
   * 需要转义的字符映射
   */
  static readonly ESCAPE_MAP: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }

  /**
   * 文章元数据地图
   */
  readonly articleMetaMap = new Map<string, ArticleMeta>()

  /**
   * 文章根目录
   */
  declare srcDir: string

  /**
   * vitepress 配置项
   */
  declare config: VitePressUserConfig

  constructor(options?: SidebarPluginOptions) {
    const { restartWait } = options || {}
  }

  /**
   * 转义文章标题
   */
  escapeArticleTitle(title: string): string {
    SidebarManager.ESCAPE_REGEX.lastIndex = 0

    title = title.replace(
      SidebarManager.ESCAPE_REGEX,
      (match) => SidebarManager.ESCAPE_MAP[match],
    )

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

    if (!existsSync(fullPath)) return

    return fullPath
  }
}

interface SidebarPluginOptions {
  restartWait?: number
}

function sidebarPlugin(options?: SidebarPluginOptions): Plugin {
  const manager = new SidebarManager(options)

  return {
    name: 'vitepress-sidebar-plugin',
    config: (config: UserConfig) => {
      manager.config = config as VitePressUserConfig
      manager.srcDir = manager.config.vitepress.srcDir
      return config
    },
    configureServer({ watcher, restart }) {},
  }
}

interface VitePressUserConfig extends UserConfig {
  vitepress: SiteConfig<DefaultTheme.Config>
}

interface ArticleMeta {
  /**
   * 标题
   */
  title?: string
  /**
   * 需要更新
   */
  needUpdate?: boolean
}

export default sidebarPlugin
