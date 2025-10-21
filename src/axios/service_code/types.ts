import {
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios'

export interface RequestServiceConfig extends CreateAxiosDefaults {
  /**
   * 默认重试配置
   */
  retry?: RetryConfig

  /**
   * 默认请求缓存配置
   */
  cache?: RequestCacheConfig

  /**
   * 请求队列配置
   */
  queue?: RequestQueueConfig
}

export interface RequestConfig<D = any> extends AxiosRequestConfig<D> {
  /**
   * 请求优先级 0-9，值越大，优先级越高
   *
   * @default 5
   */
  priority?: number

  /**
   * 阻止重复请求策略
   *
   * 'cancel-new': 取消新的请求，继续使用旧的请求
   * 'cancel-old': 取消旧的请求，使用新的请求
   * 'link': 将新的请求链接到旧的请求，新的请求直接使用旧的请求的响应数据
   */
  preventDuplicate?: 'cancel-new' | 'cancel-old' | 'link'

  /**
   * 重试配置，会覆盖默认配置
   */
  retry?: RetryConfig | boolean

  /**
   * 请求缓存配置，会覆盖默认配置
   */
  cache?: RequestCacheConfig | boolean
}

export interface RetryConfig {
  /**
   * 最大重试次数
   *
   * @default 2
   */
  maxCount?: number

  /**
   * 重试间隔时间 (ms)
   *
   * @default 500
   */
  delay?: number

  /**
   * 时间曲线
   *
   * @default 'linear'
   */
  timing: 'linear' | 'exponential'

  /**
   * 是否重试
   *
   * 返回 true 时执行重试
   *
   * 执行顺序：
   * 1. `RequestServiceConfig.retry.retryIf` 这里用于控制所有请求是否重试
   * 2. `RequestConfig.retry.retryIf` 这里用于控制单个请求是否重试
   */
  retryIf?: (error: any, count: number) => boolean

  /**
   * 重试事件
   *
   * 执行顺序：
   * 1. `RequestServiceConfig.retry.onRetry`
   * 2. `RequestConfig.retry.onRetry`
   */
  onRetry?: (error: any, count: number) => void
}

export interface RequestQueueConfig {
  /**
   * 最大并发数
   *
   * @default 5
   */
  maxConcurrent?: number
}

export interface RequestCacheConfig {
  /**
   * 缓存存储位置
   *
   * @default 'memory'
   */
  storage?: 'memory' | 'session' | 'local'

  /**
   * 缓存过期时间
   *
   * @default 5 * 60 * 1000
   */
  expireTime?: number
}

export interface RequestError extends Error {
  code?: string
  config: RequestConfig
  response?: AxiosResponse
  isAxiosError: boolean
  retryCount?: number
}

export interface BaseResponse<T = any> {
  data: T
  code: number
  msg: string
}
