/**
 * 微信网页授权配置选项
 */
export interface WeChatWebAuthOptions {
  /**
   * 授权范围
   * - snsapi_base：静默授权（只能获取openid）
   * - snsapi_userinfo：用户信息授权（首次需要用户授权，授权后可通过openid获取用户其他信息）
   * @default 'snsapi_base'
   */
  scope?: 'snsapi_base' | 'snsapi_userinfo'

  /**
   * 状态参数，可在回调页面获取
   */
  state?: string

  /**
   * 是否强制弹出授权页面
   */
  forcePopup?: boolean
}

/**
 * 创建微信网页授权 URL
 * @param appId 服务号的唯一标识
 * @param redirectURI 重定向 URI
 * @param options 配置选项
 *
 * @see https://developers.weixin.qq.com/doc/oplatform/developers/dev/auth/h5.html 微信网页授权说明文档
 */
export function createWeChatWebAuthURL(
  appId: string,
  redirectURI: string,
  options?: WeChatWebAuthOptions,
): string {
  const { scope = 'snsapi_base', state, forcePopup } = options || {}

  // 参数校验
  if (!appId) {
    throw new Error('appId is required')
  }
  if (!redirectURI) {
    throw new Error('redirectURI is required')
  }
  if (scope !== 'snsapi_base' && scope !== 'snsapi_userinfo') {
    throw new Error('scope must be "snsapi_base" or "snsapi_userinfo"')
  }

  const encodedRedirectURI = encodeURIComponent(redirectURI)

  // 构建基础URL和参数
  let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodedRedirectURI}&response_type=code&scope=${scope}`

  // 添加可选参数
  if (state) url += '&state=' + encodeURIComponent(state)
  if (forcePopup) url += '&forcePopup=1'

  // 添加锚点
  url += '#wechat_redirect'

  return url
}
