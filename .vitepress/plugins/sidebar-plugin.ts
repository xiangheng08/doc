import path from 'node:path'
import { existsSync } from 'node:fs'
import { readFile, stat } from 'node:fs/promises'
import { debounce } from '.vitepress/utils/common'
import type {
  DefaultTheme,
  SiteConfig,
  Plugin,
  UserConfig,
} from 'vitepress'

type ArticleMeta = {
  /**
   * 标题
   */
  title?: string
  /**
   * 需要更新
   */
  needUpdate?: boolean
}

interface VitePressUserConfig extends UserConfig {
  vitepress: SiteConfig<DefaultTheme.Config>
}

interface SidebarPluginOptions {
  restartWait?: number
}

export default function sidebarPlugin({
  restartWait = 200,
}: SidebarPluginOptions = {}): Plugin {
  const articleMetaCache = new Map<string, ArticleMeta>()
  let srcDir = ''
  let _restartServer: () => void

  // 处理单个 sidebarItem
  const handleSidebarItem = async (item: DefaultTheme.SidebarItem) => {
    // 没有 link 属性或有 text 属性跳过
    if (!item.link || item.text) return

    const fullPath = await resolveSidebarItemLinkPath(item.link, srcDir)

    if (!fullPath) return

    const meta = articleMetaCache.get(fullPath)

    if (meta && meta.needUpdate) {
      item.text = meta.title
    } else {
      // 设置 sidebar 的 text 属性
      try {
        const newMeta = await getArticleMeta(fullPath)

        item.text = newMeta.title

        articleMetaCache.set(fullPath, newMeta)
      } catch (error) {
        console.error(error)
      }
    }
  }

  // 处理 sidebar
  const handleSidebar = async (sidebar: DefaultTheme.SidebarItem[]) => {
    for (const item of sidebar) {
      await handleSidebarItem(item)

      if (item.items) {
        await handleSidebar(item.items)
      }
    }

    return sidebar
  }

  return {
    name: 'vitepress-sidebar-plugin',
    config: async (config) => {
      srcDir = (config as VitePressUserConfig).vitepress.srcDir

      const sidebar = (config as VitePressUserConfig).vitepress.site
        .themeConfig.sidebar

      if (isMultiSidebar(sidebar)) {
        for (const key in sidebar) {
          if (Array.isArray(sidebar[key])) {
            await handleSidebar(sidebar[key])
          } else {
            await handleSidebar(sidebar[key].items)
          }
        }
      } else if (sidebar) {
        await handleSidebar(sidebar)
      }

      return config
    },
    configureServer({ watcher, restart }) {
      _restartServer = debounce(() => restart(), restartWait)

      watcher.on('all', async (type, path) => {
        // 不是 .md 文件，或者没有处理过这个文件，则忽略
        if (!path.endsWith('.md') && !articleMetaCache.has(path)) return

        if (type === 'add') {
          _restartServer()
        } else if (type === 'change') {
          const meta = await getArticleMeta(path)
          const oldMeta = articleMetaCache.get(path)
          if (!oldMeta || compareArticleMeta(meta, oldMeta)) {
            meta.needUpdate = true
            articleMetaCache.set(path, meta)
            _restartServer()
          }
        } else if (type === 'unlink') {
          articleMetaCache.delete(path)
        }
      })
    },
  }
}

const isMultiSidebar = (
  sidebar: any,
): sidebar is DefaultTheme.SidebarMulti => {
  return typeof sidebar === 'object' && !Array.isArray(sidebar)
}

// 获取文章标题
const getArticleTitle = (content: string) => {
  const match = content.match(/^#\s+(.+)/m)
  if (!match) return void 0

  // 获取标题文本并去除首尾空格
  let title = match[1].trim()

  // 移除标题中的HTML标签，如<Badge>等
  title = title.replace(/<[^>]*>/g, '')

  // 处理内联代码标记，如`String` -> String
  title = title.replace(/`([^`]+)`/g, '$1')

  // 移除其他可能的标记，如*、**等
  title = title.replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1')

  // 移除链接语法 [text](link) -> text
  title = title.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

  // 最后去除首尾空格
  return title.trim() || void 0
}

// 转义 HTML 字符
const escapeHtml = (input: string) => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '',
  }

  const regex = /[&<>"'/`]/g

  return input.replaceAll('\\', '').replace(regex, (match) => map[match])
}

// 获取文章元数据
const getArticleMeta = async (fullPath: string): Promise<ArticleMeta> => {
  const content = await readFile(fullPath, 'utf-8')
  let title = getArticleTitle(content)
  return {
    title: title ? escapeHtml(title) : void 0,
  }
}

// 比较两个 ArticleMeta 看是否需要重启服务
const compareArticleMeta = (meta1: ArticleMeta, meta2: ArticleMeta) => {
  return meta1.title !== meta2.title
}

// 解析 SidebarItem.link 所指向的文件路径
const resolveSidebarItemLinkPath = async (
  link: string,
  srcDir: string,
) => {
  if (!link) return

  let ext = '.md'

  if (link.endsWith('.md')) {
    ext = ''
    console.warn(`sidebar item link should not end with '.md'`)
  }

  let fullPath = path.join(srcDir, link + ext)

  if (!existsSync(fullPath)) {
    const dir = path.join(srcDir, link)
    if (existsSync(dir) && (await stat(dir)).isDirectory()) {
      // 如果 link 是目录，则指向目录下的 index.md
      fullPath = path.join(dir, 'index.md')
    } else {
      // 如果 link 指向的文件不存在，则忽略
      return
    }
  }

  if (!existsSync(fullPath)) return

  return fullPath
}
