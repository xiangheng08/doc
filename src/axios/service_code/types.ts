import { AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios'

export interface RequestServiceConfig extends CreateAxiosDefaults {
  /**
   * 重试默认配置
   *
   * @description 这里的配置将作为重试的默认配置，如果某个请求的配置有重试配置，则该配置将覆盖默认配置
   *
   * `onRetry` 略有不同，当重试触发时，默认配置和某个请求的配置中的 `onRetry` 都会被执行
   *
   * 顺序是某个请求的配置 -> 默认配置
   */
  retry?: RetryConfig

  /**
   * 请求队列配置
   */
  queue?: RequestQueueConfig
}

export interface RequestConfig<D = any> extends AxiosRequestConfig<D> {
  /**
   * 重试配置，会覆盖默认配置
   *
   * `onRetry` 略有不同，当重试触发时，默认配置和某个请求的配置中的 `onRetry` 都会被执行
   *
   * 顺序是某个请求的配置 -> 默认配置
   */
  retry?: RetryConfig | boolean

  /**
   * 请求优先级 0-9，值越大，优先级越高
   *
   * @default 5
   */
  priority?: number
}

export interface RetryConfig {
  /**
   * 最大重试次数
   */
  maxCount?: number

  /**
   * 重试间隔时间
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
   */
  retryIf?: (error: any) => boolean

  /**
   * 重试事件
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
