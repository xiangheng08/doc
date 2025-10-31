import path from 'node:path'

/**
 * 路径排序
 */
export function sortPaths(
  paths: string[],
  order: 'asc' | 'desc' = 'desc',
) {
  return paths.sort((a, b) => {
    const aParts = path.normalize(a).split(path.sep)
    const bParts = path.normalize(b).split(path.sep)

    for (let i = 0; i < Math.min(aParts.length, bParts.length); i++) {
      if (aParts[i] !== bParts[i]) {
        return aParts[i] < bParts[i] ? -1 : 1
      }
    }

    if (order === 'asc') {
      return aParts.length - bParts.length
    } else {
      return bParts.length - aParts.length
    }
  })
}

// 使用示例
const paths = [
  'C:\\Windows\\System32',
  'a/b',
  'a/b/c',
  'r/e',
  'a',
  'r',
  'C:\\Windows',
]

// 适合删除文件
console.log(sortPaths(paths))
/*
[
  'C:\\Windows\\System32',
  'C:\\Windows',
  'a/b/c',
  'a/b',
  'a',
  'r/e',
  'r'
]
*/

// 适合创建文件
console.log(sortPaths(paths, 'asc'))
/*
[
  'C:\\Windows',
  'C:\\Windows\\System32',
  'a',
  'a/b',
  'a/b/c',
  'r',
  'r/e'
]
*/
