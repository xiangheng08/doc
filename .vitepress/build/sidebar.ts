import { unlink } from 'fs/promises'
import { extname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'rolldown'
import fg from 'fast-glob'
import type { DefaultTheme } from 'vitepress'

export async function buildSidebar() {
  const sidebar: DefaultTheme.SidebarMulti = {}
  const outDir = join(import.meta.dirname, '../cache/sidebar')
  const inputDir = join(import.meta.dirname, '../sidebar')

  for (const file of await fg('**/*', { cwd: outDir })) {
    await unlink(join(outDir, file))
  }

  const files = await fg('**/*.ts', { cwd: inputDir, absolute: true })

  await build({
    input: files,
    output: {
      dir: outDir,
      format: 'esm',
    },
  })

  for (const file of await fg('**/*', { cwd: outDir })) {
    const module = await import(pathToFileURL(join(outDir, file)).href)
    if (!module.default) continue
    if (!Array.isArray(module.default)) {
      console.warn(`${file} is not a valid sidebar file`)
      continue
    }
    const sidebarPath = file.replace(extname(file), '')
    sidebar[`/${sidebarPath}/`] = module.default
  }

  console.log('build sidebar done.')

  return sidebar
}
