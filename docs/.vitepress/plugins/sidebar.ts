import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import type { Plugin, UserConfig } from 'vite';
import { DefaultTheme, SiteConfig } from 'vitepress';
// import { debounce } from '../utils';

export const sidebarPlugin = (): Plugin => {
  const cache = new Map<string, Meta>();

  const handleSidebar = async (sidebar: DefaultTheme.SidebarItem[], srcDir: string) => {
    for (const item of sidebar) {
      if (!item.text && item.link) {
        const fullPath = path.join(srcDir, item.link + '.md');
        if (existsSync(fullPath)) {
          try {
            const meta = await getArticleMeta(fullPath);
            Object.assign(item, meta);
            cache.set(fullPath, meta);
          } catch (error) {
            // console.error(error);
          }
        }
      }

      if (item.items) {
        await handleSidebar(item.items, srcDir);
      }
    }

    return sidebar;
  };

  return {
    name: 'vitepress-sidebar-plugin',
    config: async (config) => {
      console.log('> sidebar processing');

      const sidebar = (config as VitePressUserConfig).vitepress.site.themeConfig.sidebar;
      const srcDir = (config as VitePressUserConfig).vitepress.srcDir;

      if (isMultiSidebar(sidebar)) {
        for (const key in sidebar) {
          if (Array.isArray(sidebar[key])) {
            await handleSidebar(sidebar[key], srcDir);
          } else {
            await handleSidebar(sidebar[key].items, srcDir);
          }
        }
      } else if (sidebar) {
        await handleSidebar(sidebar, srcDir);
      }

      console.log('> sidebar processed');

      return config;
    },
    // configureServer({ watcher, restart }) {
    //   watcher.add('**/*.md').on(
    //     'all',
    //     debounce(async (type, path) => {
    //       if(!path.endsWith('.md')) return;
    //       if (type === 'change') {
    //         const oldMeta = cache.get(path);
    //         // 没有缓存，不更新
    //         if (!oldMeta) return;
    //         const meta = await getArticleMeta(path);
    //         // 元数据一样，不更新
    //         if (JSON.stringify(meta) === JSON.stringify(oldMeta)) return;
    //       }

    //       try {
    //         await restart();
    //         console.log('> sidebar updated');
    //       } catch {
    //         console.log('> failed to update sidebar');
    //       }
    //     }, 300)
    //   );
    // },
  };
};

const isMultiSidebar = (sidebar: any): sidebar is DefaultTheme.SidebarMulti => {
  return typeof sidebar === 'object' && !Array.isArray(sidebar);
};

const articleTitleRegex = /^#\s*(.+)/m;

const getArticleTitle = (content: string) => {
  const match = content.match(articleTitleRegex);
  return match?.[1].trim();
};

const getArticleMeta = async (fullPath: string): Promise<Meta> => {
  const content = await readFile(fullPath, 'utf-8');
  let text = getArticleTitle(content);
  return {
    text: text ? escapeHtml(text) : void 0,
  };
};

const escapeHtml = (input: string) => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '',
  };

  const regExp = /[&<>"'/`]/g;

  return input.replace(regExp, (match) => map[match]);
};

interface VitePressUserConfig extends UserConfig {
  vitepress: SiteConfig<DefaultTheme.Config>;
}

type Meta = {
  text?: string;
};

export default sidebarPlugin;
