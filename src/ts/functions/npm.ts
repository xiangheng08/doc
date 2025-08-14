/**
 * 获取指定 npm 包的下载量。
 * @param packageName 包名
 * @returns 下载量（number）
 */
export const getNpmDownloadCountAPI = async (
  packageName: string,
  range: 'last-week' | 'last-month' | 'last-year' = 'last-month',
): Promise<number> => {
  const url = `https://api.npmjs.org/downloads/point/${range}/${encodeURIComponent(
    packageName,
  )}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch download count for package: ${packageName}`,
    )
  }
  const data = await response.json()
  return data.downloads ?? 0
}
