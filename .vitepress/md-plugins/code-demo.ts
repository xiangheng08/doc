import fs from 'fs'
import path from 'path'
import mdContainer, { ContainerOpts } from 'markdown-it-container'
import type { MarkdownRenderer } from 'vitepress'

const regex = /^demo\s*(.*)$/

const createDemoContainer = (md: MarkdownRenderer): ContainerOpts => {
  return {
    validate(params) {
      return !!params.trim().match(regex)
    },
    render(tokens, idx, _, env) {
      const currentPath = env.realPath as string
      const m = tokens[idx].info.trim().match(regex)

      // means the tag is opening
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : ''
        const sourceFileToken = tokens[idx + 2]
        const sourceFile = sourceFileToken.children?.[0].content ?? ''

        let source = ''
        let componentName = ''
        if (sourceFileToken.type === 'inline') {
          const sourceFilePath = path.join(
            path.dirname(currentPath),
            sourceFile,
          )
          if (!fs.existsSync(sourceFilePath)) {
            throw new Error(`Incorrect source file: ${sourceFile}`)
          }
          if (!sourceFilePath.endsWith('.vue')) {
            throw new Error(`Incorrect source file: ${sourceFile}`)
          }
          source = fs.readFileSync(path.resolve(sourceFilePath), 'utf-8')
          componentName = path
            .relative(process.cwd(), sourceFilePath)
            .replace('.vue', '')
            .replace(/[\/\\\-]/g, '_')
        }
        if (!source) {
          throw new Error(`Incorrect source file: ${sourceFile}`)
        }
        // 组件占位符
        const componentPlaceholder = `%ep_${componentName}|${sourceFile}%`
        // 组件源码
        const rawCode = encodeURIComponent(source)
        // code render
        const codeRender = encodeURIComponent(
          md.render(`\`\`\` vue\n${source}\`\`\``),
        )

        return [
          `<code-demo path="${sourceFile}" description="${description}" raw-code="${rawCode}" code-render="${codeRender}">`,
          `<template #example>${componentPlaceholder}</template>`
        ].join('\n')
      } else {
        return '</code-demo>\n'
      }
    },
  }
}

const codeDemoPlugin = (md: MarkdownRenderer) => {
  md.use(mdContainer, 'demo', createDemoContainer(md))
}

export default codeDemoPlugin
