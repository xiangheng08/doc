import axios, { AxiosError } from 'axios'
import { RequestQueue } from './queue'
import type { AxiosInstance } from 'axios'
import type {
  BaseResponse,
  RequestConfig,
  RequestServiceConfig,
  RetryConfig,
  ServiceInterceptors,
} from './types'
import { isFunction, isNumber, isObject, sleep } from './utils'
import { RequestCacher } from './cache'

export class RequestService {
  private readonly retryConfig?: RetryConfig
  private readonly axiosInstance: AxiosInstance
  private readonly queue: RequestQueue
  private readonly cacher: RequestCacher

  constructor(config?: RequestServiceConfig) {
    const {
      retry: retryConfig,
      queue: queueConfig,
      cache: cacheConfig,
      ...axiosConfig
    } = config || {}

    this.axiosInstance = axios.create(axiosConfig)
    this.queue = new RequestQueue(queueConfig)
    this.cacher = new RequestCacher(cacheConfig)

    if (retryConfig) {
      this.retryConfig = {
        maxCount: 2,
        delay: 500,
        timing: 'linear',
        ...retryConfig,
      }
    }
  }

  get interceptors() {
    return this.axiosInstance.interceptors as ServiceInterceptors
  }

  /**
   * 生成请求ID
   */
  private generateRequestID(config: RequestConfig) {
    const { method, url, params, data } = config
    const compose: string[] = []
    if (method) compose.push(method.toLocaleUpperCase())
    if (url) compose.push(url)
    if (params) compose.push(JSON.stringify(params))
    if (data) compose.push(JSON.stringify(data))
    return compose.join('_')
  }

  /**
   * 判断是否需要重试
   */
  private shouldRetry(error: unknown): boolean {
    if (error instanceof AxiosError) {
      const { code, config, response } = error

      const retryConfig = (config as RequestConfig)?.retry
      const retryCount = (config as RequestConfig)?.retryCount

      if (retryConfig === false) {
        // 明确不重试
        return false
      }

      if (
        isObject(retryConfig) &&
        isNumber(retryCount) &&
        retryCount >= (retryConfig.maxCount || 0)
      ) {
        // 超过最大重试次数
        return false
      }

      if (
        this.retryConfig?.retryIf &&
        !this.retryConfig.retryIf(error, retryCount!)
      ) {
        // 全局自定义重试条件不满足
        return false
      }

      if (
        isObject(retryConfig) &&
        isFunction(retryConfig.retryIf) &&
        this.retryConfig?.retryIf !== retryConfig.retryIf && // 避免重复判断全局条件
        !retryConfig.retryIf(error, retryCount!)
      ) {
        // 自定义重试条件不满足
        return false
      }

      if (code === 'ECONNABORTED') {
        // 超时
        // return false
      }

      // 网络错误
      if (code === 'NETWORK_ERROR') {
        // return false
      }

      // 请求被取消
      if (axios.isCancel(error)) {
        return false
      }

      if (response) {
        if (response.status >= 500 && response.status < 600) {
          // 服务器错误
          return false
        }

        if (response.status === 401) {
          // 未授权
          return false
        }

        if (response.status === 404) {
          // 未找到资源
          return false
        }
      }
    }

    if (!this.retryConfig) {
      // 没有配置重试，默认不重试
      return false
    }

    return true
  }

  /**
   * 请求重试
   */
  private async requestRetry<
    R extends BaseResponse = BaseResponse,
    D = any,
  >(config: RequestConfig, error: unknown) {
    if (config.retryCount === void 0) {
      config.retryCount = 1
    } else {
      config.retryCount++
    }

    const retryConfig = config.retry as RetryConfig

    let delay = retryConfig.delay!

    if (retryConfig.timing === 'exponential') {
      delay = delay * Math.pow(2, config.retryCount - 1)
    }

    if (retryConfig.onRetry) {
      retryConfig.onRetry(error, config.retryCount, delay)
      if (
        this.retryConfig &&
        this.retryConfig.onRetry &&
        retryConfig.onRetry !== this.retryConfig.onRetry
      ) {
        this.retryConfig.onRetry(error, config.retryCount, delay)
      }
    }

    await sleep(delay)

    return this.request<R, D>(config)
  }

  /**
   * 处理错误
   */
  private handleError(error: unknown, config: RequestConfig) {
    return error
  }

  /**
   * 取消请求
   */
  cancel(id: string, reason = 'canceled') {
    this.queue.remove(id, reason)
  }

  /**
   * 取消所有请求
   */
  cancelAll(reason = 'canceled') {
    this.queue.clear(reason)
  }

  /**
   * 发起请求
   */
  async request<R extends BaseResponse = BaseResponse, D = any>(
    config: RequestConfig<D>,
  ): Promise<R> {
    const mergedConfig: RequestConfig = {
      priority: RequestQueue.DEFAULT_PRIORITY,
      handleResponse: true,
      withToken: true,
      ...config,
    }

    if (mergedConfig.retry === void 0 && mergedConfig.retry === true) {
      mergedConfig.retry = this.retryConfig
    } else if (isObject(mergedConfig.retry)) {
      mergedConfig.retry = {
        ...this.retryConfig,
        ...mergedConfig.retry,
      }
    }

    const id = this.generateRequestID(mergedConfig)

    const cache = this.cacher.get(id)
    // 有缓存，直接返回
    if (cache) return cache

    const source = axios.CancelToken.source()
    mergedConfig.cancelToken = source.token

    const task = () => this.axiosInstance.request<any, R, D>(mergedConfig)

    try {
      const response = await this.queue.add(
        id,
        mergedConfig,
        task,
        source.cancel,
      )
      // 缓存
      this.cacher.cache(id, mergedConfig, response)
      return response
    } catch (error) {
      if (this.shouldRetry(error)) {
        return this.requestRetry(mergedConfig, error)
      }
      throw this.handleError(error, mergedConfig)
    }
  }

  /**
   * 发起 GET 请求
   */
  get<R extends BaseResponse = BaseResponse, D = any>(
    url: string,
    config?: RequestConfig<D>,
  ) {
    return this.request<R, D>({
      url,
      method: 'get',
      ...config,
    })
  }

  /**
   * 发起 POST 请求
   */
  post<R extends BaseResponse = BaseResponse, D = any>(
    url: string,
    data?: D,
    config?: RequestConfig<D>,
  ) {
    return this.request<R, D>({
      url,
      method: 'post',
      data,
      ...config,
    })
  }

  /**
   * 发起 PUT 请求
   */
  put<R extends BaseResponse = BaseResponse, D = any>(
    url: string,
    data?: D,
    config?: RequestConfig<D>,
  ) {
    return this.request<R, D>({
      url,
      method: 'put',
      data,
      ...config,
    })
  }

  /**
   * 发起 DELETE 请求
   */
  delete<R extends BaseResponse = BaseResponse, D = any>(
    url: string,
    config?: RequestConfig<D>,
  ) {
    return this.request<R, D>({
      url,
      method: 'delete',
      ...config,
    })
  }

  /**
   * 发起 PATCH 请求
   */
  patch<R extends BaseResponse = BaseResponse, D = any>(
    url: string,
    data?: D,
    config?: RequestConfig<D>,
  ) {
    return this.request<R, D>({
      url,
      method: 'patch',
      data,
      ...config,
    })
  }

  /**
   * 发起 HEAD 请求
   */
  head<R extends BaseResponse = BaseResponse, D = any>(
    url: string,
    config?: RequestConfig<D>,
  ) {
    return this.request<R, D>({
      url,
      method: 'head',
      ...config,
    })
  }

  /**
   * 发起 OPTIONS 请求
   */
  options<R extends BaseResponse = BaseResponse, D = any>(
    url: string,
    config?: RequestConfig<D>,
  ) {
    return this.request<R, D>({
      url,
      method: 'options',
      ...config,
    })
  }
}
