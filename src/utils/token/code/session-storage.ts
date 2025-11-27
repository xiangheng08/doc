const STORAGE_KEY = 'app_token'

/**
 * 获取 token
 */
export function getToken() {
  return sessionStorage.getItem(STORAGE_KEY)
}

/**
 * 存储 token
 */
export function setToken(token: string) {
  sessionStorage.setItem(STORAGE_KEY, token)
}

/**
 * 移除 token
 */
export function removeToken() {
  sessionStorage.removeItem(STORAGE_KEY)
}
