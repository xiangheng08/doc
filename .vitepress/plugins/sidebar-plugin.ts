import path from 'node:path'
import { existsSync } from 'node:fs'
import { readFile, stat } from 'node:fs/promises'
import { Plugin, UserConfig } from 'vite'
import { DefaultTheme, SiteConfig } from 'vitepress'
import { debounce } from '.vitepress/utils/common'

const isMultiSidebar = (
  sidebar: any,
): sidebar is DefaultTheme.SidebarMulti => {
  return typeof sidebar === 'object' && !Array.isArray(sidebar)
}

// 匹配文章标题
const articleTitleRegex = /^#\s*(.+)/m

const getArticleTitle = (content: string) => {
  const match = content.match(articleTitleRegex)
  return match?.[1].trim()
}

type ArticleMeta = {
  text?: string
}

const getArticleMeta = async (fullPath: string): Promise<ArticleMeta> => {
  const content = await readFile(fullPath, 'utf-8')
  let text = getArticleTitle(content)
  return {
    text: text ? escapeHtml(text) : void 0,
  }
}

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

  const regExp = /[&<>"'/`]/g

  return input.replace(regExp, (match) => map[match])
}

// 比较两个 ArticleMeta 看是否需要重启服务
const compareArticleMeta = (meta1: ArticleMeta, meta2: ArticleMeta) => {
  return meta1.text !== meta2.text
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
  const sidebarTargetPathCache = new Set<string>() // 所有 sidebar 中指向的文件路径
  const needUpdateTextPathCache = new Set<string>() // 需要更新 text 属性的路径
  let srcDir = ''

  const handleSidebarItem = async (item: DefaultTheme.SidebarItem) => {
    if (!item.link) return

    if (item.link.endsWith('.md')) {
      console.warn(`sidebar item link should not end with '.md'`)
    }

    let fullPath = path.join(srcDir, item.link + '.md')

    if (!existsSync(fullPath)) {
      const dir = path.join(srcDir, item.link)
      if (existsSync(dir) && (await stat(dir)).isDirectory()) {
        // 如果 link 是目录，则指向目录下的 index.md
        fullPath = path.join(dir, 'index.md')
      } else {
        // 如果 link 指向的文件不存在，则忽略
        return
      }
    }

    if (!existsSync(fullPath)) return

    sidebarTargetPathCache.add(fullPath)

    // 设置 sidebar 的 text 属性
    if (!item.text || needUpdateTextPathCache.has(fullPath)) {
      try {
        const meta = await getArticleMeta(fullPath)

        item.text = meta.text

        articleMetaCache.set(fullPath, meta)
      } catch (error) {
        console.error(error)
      }

      needUpdateTextPathCache.delete(fullPath)
    }
  }

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
      sidebarTargetPathCache.clear()

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
      const _restart = debounce(() => restart(), restartWait)
      watcher.add('**/*.md').on('all', async (type, path, Stats) => {
        // 不是 .md 文件，或者没有 sidebar 指向这个文件，则忽略
        if (!path.endsWith('.md') && !sidebarTargetPathCache.has(path)) {
          return
        }

        if (type === 'add') {
          _restart()
        } else if (type === 'change') {
          const meta = await getArticleMeta(path)
          const oldMeta = articleMetaCache.get(path)
          if (!oldMeta || compareArticleMeta(meta, oldMeta)) {
            _restart()
            articleMetaCache.set(path, meta)
            needUpdateTextPathCache.add(path)
          }
        }
      })
    },
  }
}
