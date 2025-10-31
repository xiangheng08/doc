import fs from 'node:fs'

/**
 * 创建目录（如果不存在）
 * @param dir
 */
export function mkdirIfNotExists(dir: string, recursive = true) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive })
  }
}
