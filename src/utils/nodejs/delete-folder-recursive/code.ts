import fs from 'node:fs'
import path from 'node:path'

/**
 * 删除指定目录下所有文件
 * @param folderPath 目录路径
 * @param deleteSelf 是否删除目录自身
 */
export function deleteFolderRecursive(
  folderPath: string,
  deleteSelf = false,
) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file)

      if (fs.lstatSync(curPath).isDirectory()) {
        // 递归删除子文件夹
        deleteFolderRecursive(curPath, true)
      } else {
        // 删除文件
        fs.unlinkSync(curPath)
      }
    })
    // 是否删除目录本身
    if (deleteSelf) {
      fs.rmdirSync(folderPath)
    }
  }
}
