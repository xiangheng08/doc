import path from 'node:path'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { Plugin, UserConfig } from 'vite'
import { DefaultTheme, SiteConfig } from 'vitepress'

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

interface VitePressUserConfig extends UserConfig {
  vitepress: SiteConfig<DefaultTheme.Config>
}

export default function sidebarPlugin(): Plugin {
  const cache = new Map<string, ArticleMeta>()

  const handleSidebar = async (
    sidebar: DefaultTheme.SidebarItem[],
    srcDir: string,
  ) => {
    for (const item of sidebar) {
      // 设置 sidebar 的 text 属性
      if (!item.text && item.link) {
        const fullPath = path.join(srcDir, item.link + '.md')

        if (existsSync(fullPath)) {
          try {
            const meta = await getArticleMeta(fullPath)
            item.text = meta.text

            cache.set(fullPath, meta)
          } catch (error) {
            console.error(error)
          }
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
      watcher.add('**/*.md').on('all', async (type, path, Stats) => {
        if (!path.endsWith('.md')) return
        console.log(path)
      })
    },
  }
}
