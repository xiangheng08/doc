import path from 'node:path'

/**
 * 判断两个路径是否指向同一位置
 * @param path1 路径1
 * @param path2 路径2
 * @param p 是否在路径格式（相对路径、绝对路径）不一致返回 false
 * @param root 根路径
 */
export function pathsEqual(
  path1: string,
  path2: string,
  p = true,
  root?: string,
) {
  // 格式不一致时返回 false
  if (p && path.isAbsolute(path1) !== path.isAbsolute(path2)) {
    return false
  }

  const paths1 = [path1]
  const paths2 = [path2]

  if (root && !path.isAbsolute(path1)) {
    paths1.unshift(root)
  }
  if (root && !path.isAbsolute(path2)) {
    paths2.unshift(root)
  }

  const p1 = path.resolve(...paths1)
  const p2 = path.resolve(...paths2)

  return p1 === p2
}
