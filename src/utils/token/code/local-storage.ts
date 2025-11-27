const STORAGE_KEY = 'app_token'

/**
 * 获取 token
 */
export function getToken() {
  return localStorage.getItem(STORAGE_KEY)
}

/**
 * 存储 token
 */
export function setToken(token: string) {
  localStorage.setItem(STORAGE_KEY, token)
}

/**
 * 移除 token
 */
export function removeToken() {
  localStorage.removeItem(STORAGE_KEY)
}
