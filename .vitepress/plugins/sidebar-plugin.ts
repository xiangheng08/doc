import path from 'node:path'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
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
  const sidebarTargetPathCache = new Set<string>()
  const needUpdateTextPathCache = new Set<string>()

  const handleSidebar = async (
    sidebar: DefaultTheme.SidebarItem[],
    srcDir: string,
  ) => {
    for (const item of sidebar) {
      if (item.link) {
        if (item.link.endsWith('.md')) {
          console.warn(`sidebar item link should not end with '.md'`)
        }

        const fullPath = path.join(srcDir, item.link + '.md')
        sidebarTargetPathCache.add(fullPath)

        // 设置 sidebar 的 text 属性
        if (!item.text || needUpdateTextPathCache.has(fullPath)) {
          if (existsSync(fullPath)) {
            try {
              const meta = await getArticleMeta(fullPath)

              item.text = meta.text

              articleMetaCache.set(fullPath, meta)
            } catch (error) {
              console.error(error)
            }
          }

          needUpdateTextPathCache.delete(fullPath)
        }
      }

      if (item.items) {
        await handleSidebar(item.items, srcDir)
      }
    }

    return sidebar
  }

  return {
    name: 'vitepress-sidebar-plugin',
    config: async (config) => {
      const sidebar = (config as VitePressUserConfig).vitepress.site
        .themeConfig.sidebar
      const srcDir = (config as VitePressUserConfig).vitepress.srcDir

      if (isMultiSidebar(sidebar)) {
        for (const key in sidebar) {
          if (Array.isArray(sidebar[key])) {
            await handleSidebar(sidebar[key], srcDir)
          } else {
            await handleSidebar(sidebar[key].items, srcDir)
          }
        }
      } else if (sidebar) {
        await handleSidebar(sidebar, srcDir)
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
