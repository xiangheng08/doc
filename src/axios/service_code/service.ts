import axios from 'axios'
import { RequestQueue } from './queue'
import type { AxiosInstance } from 'axios'
import type {
  BaseResponse,
  RequestConfig,
  RequestServiceConfig,
} from './types'

export class RequestService {
  private readonly axiosInstance: AxiosInstance
  private readonly queue: RequestQueue

  constructor(config: RequestServiceConfig) {
    const {
      retry: retryConfig,
      queue: queueConfig,
      ...axiosConfig
    } = config

    this.axiosInstance = axios.create(axiosConfig)
    this.queue = new RequestQueue(queueConfig)
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
    return false
  }

  /**
   * 处理错误
   */
  private handleError(error: unknown, config: RequestConfig) {
    return error
  }

  /**
   * 发起请求
   */
  async request<R extends BaseResponse = BaseResponse, D = any>(
    config: RequestConfig<D>,
  ): Promise<R> {
    const id = this.generateRequestID(config)

    const source = axios.CancelToken.source()
    config.cancelToken = source.token

    const task = () => this.axiosInstance.request<any, R, D>(config)

    try {
      const response = await this.queue.add(
        id,
        config,
        task,
        source.cancel,
      )
      return response
    } catch (error) {
      if (this.shouldRetry(error)) {

      }
      throw this.handleError(error, config)
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
