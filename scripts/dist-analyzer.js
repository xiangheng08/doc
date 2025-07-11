import fastGlob from 'fast-glob'
import fs from 'fs'
import path from 'path'

const distDir = path.resolve(import.meta.dirname, '../.vitepress/dist')
const tempFile = path.resolve(process.cwd(), 'dist-analyzer.temp')

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + units[i] + 'B'
}

const files = fastGlob.sync('**', {
  absolute: false,
  onlyFiles: true,
  dot: true, // 包含隐藏文件
  stats: false,
  cwd: distDir,
})

const fileList = files.map((filePath) => {
  const fullPath = path.resolve(distDir, filePath)
  const stats = fs.statSync(fullPath)
  return {
    size: stats.size, // 文件大小（字节）
    path: filePath, // 相对路径
  }
})

fileList.sort((a, b) => b.size - a.size)

const totalSize = fileList.reduce((acc, cur) => acc + cur.size, 0)

let content = `Total: ${formatBytes(totalSize, 2)} ${fileList.length} Files\n\n`

content += fileList.map(
  (file) => `${formatBytes(file.size, 2).padEnd(9, ' ')} ${file.path}`,
).join('\n')

content += `\n\nTotal: ${formatBytes(totalSize, 2)} ${fileList.length} Files\n`

console.log(content)

fs.writeFileSync(tempFile, content, 'utf-8')

console.log(`File list saved to ${tempFile}`);

