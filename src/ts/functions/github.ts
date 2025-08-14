/**
 * 判断一个字符串是否为 GitHub 仓库的 HTTPS URL
 * 仅支持 https 协议，格式如：
 * - https://github.com/owner/repo
 *
 * @param url 待判断的字符串
 * @returns 如果是仓库 HTTPS URL 返回 true，否则返回 false
 */
export const isGithubRepoURL = (url: string): boolean => {
  const regex = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+(\/)?$/
  return regex.test(url.trim())
}

/**
 * 从 GitHub 仓库 HTTPS URL 中提取 owner 和 repo
 * 仅支持格式如：https://github.com/owner/repo
 *
 * @param url 仓库的 HTTPS URL
 * @returns 包含 owner 和 repo 的对象，如果无法提取则返回 null
 * @throws 如果不是有效的 GitHub 仓库 HTTPS URL
 */
export const getGithubRepoInfo = (
  url: string,
): { owner: string; repo: string } | null => {
  if (!isGithubRepoURL(url)) {
    return null
  }
  const match = url
    .trim()
    .match(/^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)(\/)?$/)
  if (!match) {
    throw new Error('Unable to extract owner and repo from URL')
  }
  return { owner: match[1], repo: match[2] }
}

/**
 * 获取指定 GitHub 仓库的统计信息，包括 star 数、fork 数和 watcher 数。
 *
 * @param owner 仓库拥有者的用户名
 * @param repo 仓库名称
 * @returns 一个包含 stars、forks 和 watchers 数量的对象
 * @throws 当请求失败或无法获取数据时抛出错误
 */
export const getGithubRepoStatsAPI = async (
  owner: string,
  repo: string,
) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
    )
    if (!response.ok) {
      throw new Error('Failed to fetch repository data')
    }
    const data = await response.json()
    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      watchers: data.watchers_count,
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
