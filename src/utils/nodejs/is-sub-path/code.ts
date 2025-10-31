import path from 'node:path'

/**
 * 判断路径是否为另一个路径的子路径
 * @param parentPath 父路径
 * @param childPath 子路径
 * @param notSame 相同的路径时否返回 false
 */
function isSubPath(parentPath: string, childPath: string, notSame = true) {
  const relativePath = path.relative(parentPath, childPath)
  if (notSame && relativePath === '') return false
  return !relativePath.startsWith('..') && !path.isAbsolute(relativePath)
}

// 示例用法
const parentPath = '/path/to/another/parent'
const childPath1 = '/path/to/another/parent/child'
const childPath2 = '/path/to/another/test'

console.log(isSubPath(parentPath, childPath1)) // true
console.log(isSubPath(parentPath, childPath2)) // false
// 相同路径
console.log(isSubPath(parentPath, parentPath)) // false
console.log(isSubPath(parentPath, parentPath, false)) // true
