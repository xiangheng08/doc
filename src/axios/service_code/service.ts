import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type {
  BaseResponse,
  RequestConfig,
  RequestServiceConfig,
} from './types'

export class RequestService {
  private readonly axiosInstance: AxiosInstance

  constructor(config: RequestServiceConfig) {
    const { retry, queue, ...axiosConfig } = config

    this.axiosInstance = axios.create(axiosConfig)
  }

  request<R extends BaseResponse = BaseResponse, D = any>(
    config: RequestConfig<D>,
  ): Promise<R> {
    return this.axiosInstance.request<any, R, D>(config)
  }
}
