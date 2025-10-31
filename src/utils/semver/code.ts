/**
 * 检查版本号是否符合 SemVer 规范。
 * @param version 要检查的版本号
 */
export function isValidSemVer(version: string) {
  const semverRegex =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/gm
  return semverRegex.test(version)
}

/**
 * 版本号比较
 * @param currentVersion 当前版本号
 * @param compareVersion 要比较的版本号
 * @returns 比较结果，如下
 * - -1: `currentVersion` < `compareVersion`
 * - 1: `currentVersion` > `compareVersion`
 * - 0: `currentVersion` = `compareVersion`
 */
export function compareVersions(currentVersion: string, compareVersion: string) {
  // 去除元数据部分
  const [currentVersionWithoutMeta] = currentVersion.split('+')
  const [compareVersionWithoutMeta] = compareVersion.split('+')

  // 分离版本号和预发布版本号
  const [currentVersionNumber, currentPrerelease] =
    currentVersionWithoutMeta.split('-')
  const [compareVersionNumber, comparePrerelease] =
    compareVersionWithoutMeta.split('-')

  // 拆分版本号为数字数组
  const currentVersionArray = currentVersionNumber.split('.').map(Number)
  const compareVersionArray = compareVersionNumber.split('.').map(Number)

  // 比较主要版本号
  for (let i = 0; i < currentVersionArray.length; i++) {
    if (currentVersionArray[i] < compareVersionArray[i]) {
      return -1
    } else if (currentVersionArray[i] > compareVersionArray[i]) {
      return 1
    }
  }

  // 如果主要版本号相同，则比较预发布版本号
  if (currentPrerelease && !comparePrerelease) {
    return -1
  } else if (!currentPrerelease && comparePrerelease) {
    return 1
  } else if (currentPrerelease && comparePrerelease) {
    const currentPrereleaseArray = currentPrerelease.split('.').map(Number)
    const comparePrereleaseArray = comparePrerelease.split('.').map(Number)

    for (
      let i = 0;
      i <
      Math.max(
        currentPrereleaseArray.length,
        comparePrereleaseArray.length,
      );
      i++
    ) {
      const currentPart = currentPrereleaseArray[i] || 0
      const comparePart = comparePrereleaseArray[i] || 0

      if (currentPart < comparePart) {
        return -1
      } else if (currentPart > comparePart) {
        return 1
      }
    }
  }

  return 0
}
