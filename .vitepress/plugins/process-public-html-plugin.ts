import { Plugin } from 'vite'
import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { SiteConfig } from 'vitepress'
import fg from 'fast-glob'

const transformHtml = (content: string, base: string = '') => {
  // 替换 BASE_URL 占位符
  content = content.replace(/%BASE_URL%/g, base)

  return content
}

export const processPublicHtmlBuildEndHook = async (
  siteConfig: SiteConfig,
) => {
  const publicDir = path.join(siteConfig.srcDir, 'public')
  const outDir = siteConfig.outDir

  if (existsSync(publicDir)) {
    const files = await fg('**/*.html', { cwd: publicDir })
    for (const file of files) {
      const outFilePath = path.join(outDir, file)
      if (!existsSync(outFilePath)) continue
      try {
        const content = await fs.readFile(outFilePath, 'utf-8')
        await fs.writeFile(
          path.join(outDir, file),
          transformHtml(content, siteConfig.userConfig.base),
          'utf-8',
        )
      } catch (error) {
        console.error(`Error processing ${file}:`, error)
      }
    }
  }
}

export default function processPublicHtml(): Plugin {
  return {
    name: 'process-public-html',
    enforce: 'pre', // 确保在 Vite 内置处理之前运行

    configureServer(server) {
      const base = server.config.base
      // 开发模式：拦截 public 文件夹中的 HTML 请求
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next()

        const url = new URL(
          req.url,
          `http://${req.headers.host || 'a.com'}`,
        )

        if (!url.pathname.endsWith('.html')) return next()

        const publicPath = path.join(
          server.config.publicDir,
          path.relative(base, url.pathname),
        )

        if (!existsSync(publicPath)) return next()

          try {
          let content = await fs.readFile(publicPath, 'utf-8')
          res.setHeader('Content-Type', 'text/html')
          res.end(transformHtml(content, server.config.base))
        } catch (err) {
          // 如果文件不存在或出现错误，继续处理下一个中间件
          next()
        }
      })
    },
  }
}
