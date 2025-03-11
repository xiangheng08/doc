import type { Plugin } from 'vitepress'

// 匹配占位符
const placeholderRegex = /%ep_([^|]+)\|([^%]+)%/g
// 匹配正则关键字
const keywordRegex = /[.*+?^${}()|[\]\\]/g
// 转义正则关键字
const escapeRegex = (str: string) => str.replace(keywordRegex, '\\$&')
// 创建 _createTextVNode("%ep_component|path%") 匹配正则
const createTextVNodeRegex = (placeholder: string) => {
  return new RegExp(
    `_createTextVNode\\("${escapeRegex(placeholder)}"\\)`,
    'g',
  )
}

const setupCreateVNodeTemplate = '_createVNode($setup["%"])'

// 匹配 const __returned__ = { ... } 结构
const returnedRegex = /const __returned__ = \{([^}]+)\}/

const addReturned = (code: string, component: string): string => {
  const match = code.match(returnedRegex)

  if (match) {
    // 获取匹配到的内容，并在其中添加新的组件
    const existingComponents = match[1].trim()
    const newComponents = existingComponents
      ? `${existingComponents}, ${component}`
      : component

    // 替换原代码中的 __returned__ 部分
    const updatedCode = code.replace(
      returnedRegex,
      `const __returned__ = { ${newComponents} }`,
    )
    return updatedCode
  } else {
    // 如果没有匹配到，可能是没有使用 setup 尝试转化成 setup 组件
    // 匹配 const _sfc_main = {name:"test/2.md"}
    const sfcMainRegex = /const _sfc_main = (\{[^\}]+\})/
    const [, sfcMain] = code.match(sfcMainRegex) || []
    if (sfcMain) {
      const insert = `const __default__ = ${sfcMain}
const _sfc_main = /*@__PURE__*/Object.assign(__default__, {
  setup(__props, { expose: __expose }) {
  __expose();


const __returned__ = { __pageData, ${component} }
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
return __returned__
}

})`
      code = code.replace(sfcMainRegex, insert)
    }
  }

  return code
}

const demoDynamicImport = (): Plugin => {
  return {
    name: 'vite-plugin-dynamic-import',
    transform(code, id) {
      if (!id.endsWith('.md')) return

      // 重置 placeholderRegex
      placeholderRegex.lastIndex = 0

      let importCount = 0
      let importStatements = '// demo container imports\n'
      let match
      let newCode = code

      // 收集所有需要导入的组件
      while ((match = placeholderRegex.exec(code)) !== null) {
        // 匹配所有占位符 %ep_component|path%
        const [full, componentName, path] = match

        // 生成导入语句
        importStatements += `import ${componentName} from '${path}'\n`

        // 替换原有的 _createTextVNode 为 _createVNode
        const textVNodeRegex = createTextVNodeRegex(full)
        newCode = newCode.replace(
          textVNodeRegex,
          setupCreateVNodeTemplate.replace('%', componentName),
        )

        // 将组件添加到 __returned__ 中
        newCode = addReturned(newCode, componentName)

        importCount++
      }

      if (importCount === 0) return

      // 将导入语句注入到 Vue SFC
      newCode = importStatements + '\n' + newCode

      // console.log(newCode);

      return newCode
    },
  }
}

export default demoDynamicImport
